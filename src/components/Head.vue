<template>
  <div class="header-psi">
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
                  <p style="font-weight: bolder; font-size: large; font-style: oblique;">SHT</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"/>
        <h3>影评管理系统</h3>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"/>
        <div class="block">
          <el-avatar shape="square" size="medium" :src="avatar"/>
        </div>
        <div class="userInfo">

          <el-dropdown size="large"  trigger="click" class="dropdown">
            <p>
              {{ username }}
            </p>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/userInfo"><el-dropdown-item >修改密码</el-dropdown-item></router-link>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      username: localStorage.getItem("username")
    }
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.header-psi {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
}

.grid-content {
  flex: 1;
  display: flex;
  text-align: right;
  align-items: center;
  justify-content: center;
  float: left;
}

.block {
  margin-left: 360px;
  float: left;
  margin-top: 10px;
}

.userInfo {
  margin-left: 20px;
  float: left;
}
.userInfo p{
  font-size: large;
  color: #1a1a1a;
}
.dropdown:hover{
  cursor:pointer
}
</style>
