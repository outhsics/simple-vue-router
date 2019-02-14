<template>
  <div id="app">hello
    <router-link tag="a" to="/home">home</router-link>
    <router-link tag="a" to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    console.log(this.$router);
    console.log(this.$route);
  },
  components: {}
};
</script>

<style>
</style>
