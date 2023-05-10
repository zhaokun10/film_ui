<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: #646cff">
        <Head></Head>
      </el-header>
      <el-container>
        <el-aside class="side" width="200px" style="background-color: aquamarine">
          <Menu></Menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Menu from "../components/Menu.vue";
import Head from "../components/Head.vue";


export default {
  name: "Index",
  components: {Head, Menu}
}
</script>

<style scoped>
.common-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eef0f3;
}
.side{
  position: absolute;
  left: 0;
  height: 92%;
}

</style>
