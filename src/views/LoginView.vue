<template>
  <div class="container" style="height: 700px">
    <div class="login-container" :style="{ background: gradientColor}">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "loginView",
  data() {
    return {
      colors: ['#ff9999', '#99ff99', '#9999ff'],
      colorIndex: 0,
      loginForm: {
        user_name: '',
        user_pwd: '',
      },
      showRegisterDialog: false,
    };
  },

  computed: {
    gradientColor() {
      const nextIndex = (this.colorIndex + 1) % this.colorIndex.length;
      return `linear-gradient(to right, ${this.colors[this.colorIndex]}, ${this.colors[nextIndex]}`;
    },
  },

  mounted() {
    setInterval(this.toggleColor, 2000);
  },

  methods: {
    toggleColor() {
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    },

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
          this.$router.push('/caption');
        }
      } catch (error) {
        this.$message.error(error.response.data.info);
      }
    }
  }

}
</script>

<style scoped>

.container {
  padding: 20px;
}

.login-container {
  padding: 20px;
  border-radius: 5px;
  color: white;
  transition: background-color 0.5s ease;
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

</style>