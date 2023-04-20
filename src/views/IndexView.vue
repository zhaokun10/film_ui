<template>
  <div>
    <menu-component :username="username"/>
    <router-view/>
  </div>

</template>

<script>
import MenuComponent from "@/components/MenuComponent.vue";

export default {
  name: "IndexView",
  components: {MenuComponent},

  data() {
    return {
      username: this.$route.query.username,
    };
  },
  created() {
    console.log(window.localStorage.getItem('username'))
  }
}
</script>

<style scoped>

</style>
