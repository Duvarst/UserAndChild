<template>
  <div id="nav">
    <router-link to="/">Форма</router-link> |
    <router-link to="/preview">Превью</router-link>
  </div>
  <router-view />
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      info: "",
    };
  },
  methods: {
    getData() {
      this.getAll()
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    async getAll() {
      try {
        let response = await axios.get("http://localhost:5000/api/post", {
          method: "GET",
          headers: {
            "Content-Type": "text/plain:charset=UTF-8",
          },
          mode: "no-cors",
        });

        this.info = response.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  border-bottom: 2px solid #000;
}

#nav a {
  font-weight: bold;
  color: #000;
}

#nav a.router-link-exact-active {
  color: blue;
}
</style>
