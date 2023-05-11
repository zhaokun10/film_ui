<template>
  <div style="height: 100%;">

    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="/main"
        text-color="#fff"
        router
    >
      <el-menu-item index="user">
        <el-icon><UserFilled /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="goods">
        <el-icon><Management /></el-icon>
        <span>电影管理</span>
      </el-menu-item>
      <el-menu-item index="comment">
        <el-icon><Management /></el-icon>
        <span>评论管理</span>
      </el-menu-item>
      <el-menu-item index="actor">
        <el-icon><Management /></el-icon>
        <span>演员管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>其他管理</span>
        </template>
          <el-menu-item index="filmType">影片类型</el-menu-item>
          <el-menu-item index="duties">职业</el-menu-item>
          <el-menu-item index="country">制片地区</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: "Menu",
  data(){
    return{
      roleId:localStorage.getItem('roleId')
    }
  }

}
</script>

<style scoped>
p {
  background-color: aquamarine;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
