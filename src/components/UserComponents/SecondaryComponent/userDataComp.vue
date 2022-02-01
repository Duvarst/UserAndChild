<template>
  <div class="user-block main">
    <p>Персональные данные</p>
    <label for="input_last_name">Фамилия</label>
    <input
      type="text"
      id="input_last_name"
      v-model="user.last_name"
      @change="validLastName($event)"
    />
    <label for="input_first_name">Имя </label>
    <input
      type="text"
      id="input_first_name"
      :value="user.first_name"
      @change="validFirstName($event)"
    />
    <label for="input_patronymic" :value="user.patronymic">Отчество</label>
    <input
      type="text"
      id="input_patronymic"
      @change="validPatronymic($event)"
    />
    <label for="input_age">Возраст</label>
    <input
      type="number"
      id="input_age"
      v-model="user.age"
      @change="validAge($event)"
    />
  </div>
</template>
<script>
import { req } from "@/api/validation";

export default {
  data: function () {
    return {
      user: {
        last_name: "",
        first_name: "",
        patronymic: "",
        age: 15,
      },
    };
  },
  methods: {
    dataEmit() {
      this.$emit("addData", this.user);
    },
    validLastName(event) {
      let val = event.target.value;
      if (!req.reqTest(val, req.valNumber)) {
        this.user.last_name = val;
        this.dataEmit();
      } else {
        this.user.last_name = "";
        alert("The value cannot contain numbers");
        event.target.focus();
      }
    },
    validFirstName(event) {
      let val = event.target.value;
      if (!req.reqTest(val, req.valNumber)) {
        this.user.first_name = val;
        this.dataEmit();
      } else {
        this.user.first_name = "";
        alert("The value cannot contain numbers");
        event.target.focus();
      }
    },
    validPatronymic(event) {
      let val = event.target.value;
      if (!req.reqTest(val, req.valNumber)) {
        this.user.patronymic = val;
        this.dataEmit();
      } else {
        this.user.patronymic = "";
        alert("The value cannot contain numbers");
        event.target.focus();
      }
    },
    validAge(event) {
      if (event.target.value) {
        let val = Number.parseInt(event.target.value);
        val = Math.max(val, 15);
        this.user.age = Math.min(val, 110);
        this.dataEmit();
      } else {
        this.user.age = 15;
      }
    },
  },
  computeds: {},
};
</script>
<style scoped>
.main {
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
}
label {
  margin-top: 10px;
}
input[type="number"] {
  width: 100%;
  padding: 10px;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
}
p {
  font-size: 1.5rem;
}
</style>
