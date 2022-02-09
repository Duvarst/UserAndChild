<template>
  <div class="main-block">
    <div class="user-block main">
      <p>Персональные данные</p>
      <div v-if="!userDataStore.first_name">
        <span>Добавьте данные на странице "Форма"</span>
      </div>
      <div v-else>
        <span class="data-text">{{ userDataStore.last_name }}, </span>
        <span class="data-text">{{ userDataStore.first_name }}, </span>
        <span class="data-text">{{ userDataStore.patronymic }}, </span>
        <span class="data-text data-age" v-show="userDataStore.first_name"
          >{{ userDataStore.age }} лет
        </span>
      </div>
    </div>
    <div class="user-block main">
      <p>Дети</p>
      <div class="child" v-for="it in userChildStore" :key="it.id">
        <span class="data-text">{{ it.name }}, </span>
        <span class="data-text data-age" v-show="it.name"
          >{{ it.age }} лет</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    msg: String,
  },
  methods: {},
  computed: {
    ...mapGetters("mainstore", { userDataStore: "userDataStore" }),
    ...mapGetters("mainstore", { userChildStore: "userChildStore" }),
  },
};
</script>
<style scoped>
.data-text {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.2rem;
}
.data-age {
  text-transform: none;
}
.child {
  width: 50%;
  display: block;
  margin: 10px 0px;
  padding: 5px 0px;
  background: grey;
  color: #fff;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 0 auto;
}
p {
  font-size: 1.5rem;
}
</style>
