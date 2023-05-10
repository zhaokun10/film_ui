<template>
  <div class="body">
    <el-card class="box-card">
      <h1>登 录</h1>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login" type="primary" @click="onSubmit">登录</el-button>
          <router-link to="/register">
            <div  class="toRegister">
              <a>前往注册</a>
            </div>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "LoginView",
  data(){
    return{
      form:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    onSubmit() {
      this.$axios.post("/login",this.$data.form).then(ref=>{
        this.$axios.post("/role/find/"+ref.data.userId).then(ref=>{
          window.localStorage.setItem("roleId", ref.data)
          if(ref.data==2){
            this.$router.push({path:'/',query:{
                username
              }})
          }else {
            this.$router.push("/main")
          }
        })
        this.$notify({
          type:'success',
          message: '登录成功'
        });
        const username = ref.data.username
        window.localStorage.setItem("username", username)
        window.localStorage.setItem("userId", ref.data.userId)
        this.$store.state.userId = ref.data.userId
        this.$router.push({path:'/index',query:{
         username
          }})
      })
      console.log('submit!');
    }

  }

}
</script>

<style scoped>
a{
  color: #2ac9ff;
  text-decoration: none;
}
.body{
  width: 100%;
  height: 100%;
  text-align: center;
  position:fixed;
  top: 0;
  left: 0;
  background: url("@/assets/login_bk.png") fixed;
}
.box-card {
  width: 480px;
  height: 350px;
  padding: 0;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login{
  width: 100%;
}
.toRegister{
  text-align: right;
}

</style>
