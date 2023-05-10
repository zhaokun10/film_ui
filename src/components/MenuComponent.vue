<template>
  <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
           text-color="#FFFFFF" active-text-color="#FFFFFF">
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/hot">热门</el-menu-item>
    <el-menu-item index="/recommended">推荐</el-menu-item>
    <el-menu-item index="/all">全部电影</el-menu-item>
    <el-menu-item index="/allComments">全部影评</el-menu-item>
    <el-input
        placeholder="请输入电影名称"
        suffix-icon="el-icon-search"
        v-model="searchInfo" style="position: absolute; width: 300px; margin: auto; top:9px; left: 600px">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <div v-if="name!=null" style="position: absolute; width: 300px; margin: auto; top:9px; right: 0; text-align: center" >
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <el-dropdown>
  <span class="el-dropdown-link"
        style="color: aliceblue; position: absolute; margin: auto; top: -30px; width: 50px; left: 20px">
  {{name}}
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item ><router-link to="/index/myProfile"><p style="color: #159eff">个人中心</p></router-link></el-dropdown-item>
          <el-dropdown-item @click.native="logout"><p style="color: #159eff">退出</p></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="name===null" style="position: absolute; width: 300px; margin: auto; top:14px; right: 0; text-align: center">
      <router-link to="/"><a href="#" style="margin-right: 10px">登录</a></router-link>
      <span style="color: aliceblue">/</span>
      <router-link to="/register"><a href="#" style="margin-left: 10px">注册</a></router-link>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "MenuComponent",
  props: {
    username: String,
    required: true
  },
  data() {
    return {
      activeIndex: '1',
      searchInfo: '',
      name:window.localStorage.getItem('username')
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "/searchResult", query: {
          searchInfo: this.$data.searchInfo
        }
      })
      this.$data.searchInfo=''
    },
    logout(){
      localStorage.clear()
      this.$router.push("/login")
    }
  },

}
</script>

<style scoped>
a{
  color: aliceblue;
  text-decoration: none;
}
</style>
