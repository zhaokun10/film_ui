<!--<template xmlns="http://www.w3.org/1999/html">-->
<!--  <div class="user-table">-->
<!--    <el-card class="box-card">-->
<!--      <el-form :model="form" label-width="120px">-->
<!--        <el-input-->
<!--            size="large"-->
<!--            ref="password"-->
<!--            v-model="registerForm.password"-->
<!--            :type="passwordType"-->
<!--            placeholder="密码"-->
<!--            name="password"-->
<!--            maxlength="50"-->
<!--            style="margin-top: 5%"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <el-icon>-->
<!--              <Lock/>-->
<!--            </el-icon>-->
<!--          </template>-->
<!--          <template #append>-->
<!--            <el-icon>-->
<!--              <View/>-->
<!--            </el-icon>-->
<!--          </template>-->
<!--        </el-input>-->
<!--        <el-input-->
<!--            size="large"-->
<!--            ref="password"-->
<!--            v-model="registerForm.rePassword"-->
<!--            :type="passwordType"-->
<!--            placeholder="确认密码"-->
<!--            name="password"-->
<!--            maxlength="50"-->
<!--            style="margin-top: 5%"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <el-icon>-->
<!--              <Lock/>-->
<!--            </el-icon>-->
<!--          </template>-->
<!--          <template #append>-->
<!--            <el-icon>-->
<!--              <View/>-->
<!--            </el-icon>-->
<!--          </template>-->
<!--        </el-input>-->
<!--        <el-button type="primary" @click="modifyPassword" style="width: 100%; margin-top: 10px" size="medium">提交</el-button>-->
<!--      </el-form>-->
<!--    </el-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "../axios.js";-->
<!--import {ElMessage} from "element-plus";-->

<!--export default {-->

<!--  name: "UserInfo",-->
<!--  data() {-->
<!--    return {-->
<!--      registerForm: {-->
<!--        id:localStorage.getItem("userId"),-->
<!--        username:localStorage.getItem("username"),-->
<!--        password: '',-->
<!--        rePassword: ''-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    modifyPassword(){-->
<!--      if(this.$data.registerForm.password!==this.$data.registerForm.rePassword){-->
<!--        ElMessage({-->
<!--          message: '密码不一致',-->
<!--          type: 'warning',-->
<!--        })-->
<!--      }-->
<!--      else {-->
<!--        this.$axios.post("http://localhost:7999/user/update", this.$data.registerForm).then(ref=>{-->
<!--          if(ref){-->
<!--            axios.get('http://localhost:7999/user/find/role/'+ref.data.id).then(res=>{-->
<!--              localStorage.setItem("roleId", res.data)-->
<!--            })-->
<!--            localStorage.setItem('userId', ref.data.id)-->
<!--            localStorage.setItem('username', ref.data.username)-->
<!--            ElMessage({-->
<!--              message: '登录成功',-->
<!--              type: 'success',-->
<!--            })-->
<!--            this.$router.push("/")-->
<!--          }else {-->
<!--            ElMessage({-->
<!--              message: '登录失败',-->
<!--              type: 'error',-->
<!--            })-->
<!--          }-->
<!--        })-->

<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.user-table {-->
<!--  margin-left: 200px;-->
<!--}-->

<!--.box-card {-->
<!--  width: 500px;-->
<!--  height: 200px;-->
<!--  margin: auto;-->
<!--  margin-top:12%-->
<!--}-->

<!--</style>-->
