<template>
  <div class="wrap">
    <div v-if="display">
      <UserDataComp @addData="overwriteUserData($event)" />
      <div class="user-child main">
        <div class="header-user-child">
          <p>Дети(макс. 5)</p>
          <button id="btn_add" :style="styleForBtn" @click="addChild">
            + Добавить ребенка
          </button>
        </div>
        <div v-if="!showChildList">
          <p>Вы пока не добавили ни одного ребенка</p>
        </div>
        <div v-else class="wrap-child-comp">
          <div class="child-comp-block" v-for="it in userChild" :key="it.id">
            <UserChildComp
              @clickDel="delChild(it.id)"
              @adChildAge="addAgeChild(it.id, $event)"
              @addChildName="addNameChild(it.id, $event)"
            />
          </div>
        </div>
      </div>
      <div class="block-btn main">
        <button id="btn_save" :style="styleBtnSave" @click="addUserData">
          Сохранить
        </button>
      </div>
    </div>
    <div v-else>
      <p>Данные сохранены</p>
      <p>Перейдите на страницу Превью для просмотра</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserChildComp from "@/components/UserComponents/SecondaryComponent/userChildComp.vue";
import UserDataComp from "@/components/UserComponents/SecondaryComponent/userDataComp.vue";

export default {
  components: {
    UserChildComp,
    UserDataComp,
  },
  data: function () {
    return {
      user: {},
      userChild: [],
      display: true,
    };
  },
  methods: {
    ...mapActions("mainstore", { setUserData: "setUserData" }),
    ...mapActions("mainstore", { setUserChild: "setUserChild" }),
    ...mapActions("mainstore", { delUserChild: "delUserChild" }),
    ...mapActions("mainstore", { writeAgeChild: "writeAgeChild" }),
    ...mapActions("mainstore", { writeNameChild: "writeNameChild" }),
    addChild() {
      let length = this.userChild.length;
      let obj = {};
      (obj.name = ""), (obj.age = 1);
      if (length !== 0 && length < 5) {
        obj.id = this.userChild[length - 1].id + 1;
      } else if (length == 0) {
        obj.id = 0;
      }
      this.userChild.push(obj);
    },
    delChild(id) {
      let elem = this.userChild.findIndex((e) => e.id === id);
      this.userChild.splice(elem, 1);
    },
    addUserData() {
      this.setUserData(this.user);
      this.setUserChild(this.userChild);
      alert("Data saved");
      this.display = false;
    },
    addAgeChild(id, age) {
      let elem = this.userChild.find((e) => e.id === id);
      elem.age = age;
    },
    addNameChild(id, name) {
      let elem = this.userChild.find((e) => e.id === id);
      elem.name = name;
    },

    overwriteUserData(data) {
      for (let key in data) {
        this.user[key] = data[key];
      }
    },
  },
  computed: {
    ...mapGetters("mainstore", { userChildStore: "userChildStore" }),
    ...mapGetters("mainstore", { userDataStore: "userDataStore" }),

    styleForBtn() {
      if (this.userChildStore.length > 0) {
        return this.userChildStore.length === 5
          ? { pointerEvents: "none", opacity: "0.4" }
          : { pointerEvents: "auto", opacity: "1" };
      } else {
        return this.userChild.length === 5
          ? { pointerEvents: "none", opacity: "0.4" }
          : { pointerEvents: "auto", opacity: "1" };
      }
    },
    styleBtnSave() {
      let arr = Object.values(this.user);
      return arr.length > 0 && arr.every((e) => e !== "")
        ? { pointerEvents: "auto", opacity: "1" }
        : { pointerEvents: "none", opacity: "0.4" };
    },
    showChildList() {
      return this.userChild.length > 0;
    },
  },
};
</script>
<style scoped>
.child-comp-block {
  margin: 15px 0px;
}
.wrap-child-comp {
  width: 100%;
}
.child {
  width: 100%;
  display: flex;
}
#btn_save {
  background: blue;
  cursor: pointer;
  display: block;
  padding: 10px 30px;
  height: 100%;
  border-radius: 1.5rem;
  border: 3px solid blue;
  color: white;
  font-size: 1.2rem;
}
#btn_del {
  color: blue;
}
#btn_add {
  background: #fff;
  cursor: pointer;
  display: block;
  padding: 10px 10px;
  height: 100%;
  border-radius: 1.5rem;
  border: 3px solid blue;
  color: blue;
}
#btn_add.dis {
  opacity: 0.7;
  pointer-events: none;
}
.header-user-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
}
.main {
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
}
.wrap {
  margin-top: 0.5rem;
}
label {
  margin-top: 10px;
}
input[type="number"] {
  width: 100%;
  padding: 5px;
}
input[type="text"] {
  width: 100%;
  padding: 5px;
}
p {
  font-size: 1.5rem;
}
</style>
