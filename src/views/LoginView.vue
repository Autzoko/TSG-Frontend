<template>
  <div class="container" :style="{ animation: 'colorFlow 16s infinite' }">
    <div class="login-container">
      <div class="login-title">Login for Image Captioning</div>
      <el-form class="login-form" ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item label="user" prop="user_name">
          <el-input v-model="loginForm.user_name"/>
        </el-form-item>
        <el-form-item label="password" prop="user_pwd">
          <el-input v-model="loginForm.user_pwd" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="handleLogin">login</el-button>
          <el-button class="login-button" @click="showRegisterDialog = true">sign in</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="Sign In" v-model="showRegisterDialog">
        <RegisterDialog @registered="registerSuccess" @register-failed="registerFailed"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RegisterDialog from "@/components/RegisterDialog.vue";
import {mapMutations} from "vuex";

export default {
  name: "loginView",
  components: {RegisterDialog},
  data() {
    return {
      loginForm: {
        user_name: '',
        user_pwd: '',
      },
      showRegisterDialog: false,
    };
  },

  methods: {
    ...mapMutations(['login']),
    async handleLogin() {
      if(this.loginForm.user_name === '') {
        this.$message.warning("please fill user name");
        return;
      }
      if(this.loginForm.user_pwd === '') {
        this.$message.warning("please fill password");
      }
      try {
        const response = await axios.post('api/user/login', this.loginForm);
        if(response.status === 200) {
          console.log("response");
          console.log(response.data);
          this.login();
          this.$router.push('/caption');
        }
      } catch (error) {
        this.$message.error(error.response.data.info);
      }
    },

    registerSuccess() {
      this.showRegisterDialog = false;
      this.$message.success("sign in success");
    },

    registerFailed() {
      this.showRegisterDialog = false;
      this.$message.error("sign in failed");
    }
  }

}
</script>

<style>

.container {
  padding: 20px;
}

.login-container {
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  align-items: center;
}

.login-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

.login-form {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 50%;
}

.login-button[type="primary"] {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.login-button[type="primary"]:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.login-button {
  margin-left: 10px;
}

@keyframes colorFlow {
  0% {background-color: #ff9999;}
  33% {background-color: #99ff99;}
  66% {background-color: #9999ff;}
  100% {background-color: #ff9999;}
}

</style>