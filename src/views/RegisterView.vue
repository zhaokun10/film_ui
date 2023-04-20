<template>
  <div class="body">
    <el-card class="box-card">
      <h1>登 录</h1>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login" type="primary" @click="onSubmit">登录</el-button>
          <router-link to="/">
            <div  class="toLogin">
              <a>返回登录</a>
            </div>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data(){
    return{
      form:{
        username:'',
        password:'',
        rePassword:''
      }
    }
  },
  methods:{
    onSubmit() {
      if(this.$data.form.password!==this.$data.form.rePassword){
        this.$notify({
         type:'warning',
          message: '密码不匹配请确认'
        });
        return;
      }
      const user = {
        'username': this.$data.form.username,
        'password': this.$data.form.password
      }
      this.$axios.post("/register",user).then(ref=>{
        if(ref.data===1){
          this.$notify({
            type:'success',
            message: '登录成功'
          });
          this.$router.push("/")
        }else {
          this.$notify({
            type:'error',
            message: '用户名已存在'
          });
          setTimeout(function (){
            window.location.reload();
          }, 3000)
        }
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
  height: 380px;
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
.toLogin{
  text-align: right;
}

</style>
