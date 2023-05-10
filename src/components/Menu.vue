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
      <el-menu-item index="user" v-if="roleId==1">
        <el-icon><UserFilled /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="goods">
        <el-icon><Management /></el-icon>
        <span>影片管理</span>
      </el-menu-item>
      <el-menu-item index="comment">
        <el-icon><Management /></el-icon>
        <span>评论管理</span>
      </el-menu-item>
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
