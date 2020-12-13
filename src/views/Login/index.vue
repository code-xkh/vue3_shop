<template>
  <div class="login-container">
    <div class="login-wrap">
      <h2 class="text-center">登录</h2>
      <!-- 登录表单 -->
      <el-form class="w-90 mar-center" ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input class="w-90 mar-center" type="text" v-model="loginForm.username" autocomplete="off"
            prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="w-90 mar-center" type="password" v-model="loginForm.password" autocomplete="off"
            prefix-icon="el-icon-lock" placeholder="密码" @keydown.enter="login(loginFormRef)"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="w-90 mar-center" type="primary" @click="login(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from 'vue'
import { rules } from '../../util/rules'
export default {
  name: 'Login',
  setup () {
    const { $msg, $http, $router } = getCurrentInstance().ctx
    // 表单对象
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const loginFormRef = ref(null)
    // 登录
    const login = (formName) => {
      // 表单验证
      formName.validate(async (vaild) => {
        if (!vaild) return $msg.error('表单格式不正确！')
        const { data: res } = await $http.post('login', loginForm)
        if (res.meta.status !== 200) return $msg.error('登录失败！')
        $msg.success('登陆成功！')
        // 登录成功后存储token
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到首页
        $router.push('/home')
      })
    }
    return { loginForm, rules, login, loginFormRef }
  }
}
</script>

<style lang="scss">
@import "./index.scss"
</style>
