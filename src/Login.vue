<template>
  <div class="login">
    <el-form class="form" :model="loginForm" :rules="rules" ref="loginRef">
      <h1>Log In</h1>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="please input username">
          <template #prefix>
            <i class="iconfont icon-username"/>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="please input password">
          <template #prefix>
            <i class="iconfont icon-password"/>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div style="display: inline-flex; justify-content: space-between; width: 100%;">
          <el-input type="text" v-model="loginForm.code" style="width: 170px;" placeholder="please input captcha">
            <template #prefix>
              <i class="iconfont icon-captcha"/>
            </template>
          </el-input>
          <img :src="state.image" @click="getCode">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" :loading="isLoading" @click="submitLogin(loginRef)">Log in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import './assets/css/login.css';
import {useStore} from "@/store";
import routers from "@/router/routers";
import {login, getVerifyCode} from "@/api/login/login";
import {errorMsg} from "@/utils/message";
import {ref, reactive, onMounted} from "vue";

const store = useStore()
const loginRef = ref(null)
const isLoading = ref(false)
const state = reactive({
  image: ''
})
const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  uuid: ''
})
const rules = reactive({
  username: [{
    required: true,
    message: 'username is empty',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: 'password is empty',
    trigger: 'blur'
  }],
  code: [{
    required: true,
    message: 'captcha is empty',
    trigger: 'blur'
  }]
})

onMounted(() => {
  getCode()
})

const getCode = () => {
  getVerifyCode().then(res => {
    state.image = res.img
    loginForm.uuid = res.uuid
  })
}

const submitLogin = (loginRef) => {
  loginRef.validate((valid) => {
    if(valid) {
      isLoading.value = true
      login(loginForm).then(res => {
        if(res.success) {
          store.token = res.data.token
          store.refreshToken = res.data.token
          store.userInfo = res.data.userDto
          routers.push({path: '/Layout'})
        } else {
          errorMsg(res.msg)
        }
        isLoading.value = false
      })
    }
  })
}
</script>

<style scoped>

</style>