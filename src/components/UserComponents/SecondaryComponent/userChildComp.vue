<template>
  <div>
    <div class="child">
      <input
        type="text"
        id="input_patronymic"
        placeholder="Имя"
        :value="name"
        @change="validName($event)"
      />

      <input
        type="number"
        id="input_age"
        placeholder="Возраст"
        :value="age"
        @change="validAge($event)"
      />
      <div id="btn_del" @click="del">Удалить</div>
    </div>
  </div>
</template>
<script>
import { req } from "@/api/validation";
export default {
  data: function () {
    return {
      name: "",
      age: 1,
    };
  },
  methods: {
    validAge(event) {
      if (event.target.value) {
        let val = Number.parseInt(event.target.value);
        val = Math.max(val, 1);
        this.age = Math.min(val, 100);
        this.addAge();
      } else {
        this.age = 1;
      }
      this.$forceUpdate();
    },
    validName(event) {
      let val = event.target.value;
      if (!req.reqTest(val, req.valNumber)) {
        this.name = val;
        this.addName();
      } else {
        this.name = "";
        alert("The value cannot contain numbers");
        event.target.focus();
      }
      this.$forceUpdate();
    },
    del() {
      this.$emit("clickDel");
    },
    addAge() {
      this.$emit("adChildAge", this.age);
    },
    addName() {
      this.$emit("addChildName", this.name);
    },
  },
};
</script>
<style scoped>
.child {
  width: 100%;
  display: flex;
}
#btn_del {
  color: blue;
  padding: 10px 0px;
  cursor: pointer;
}
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin: 0px 10px;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
}
p {
  font-size: 1.5rem;
}
</style>
