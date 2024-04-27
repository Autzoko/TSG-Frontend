<template>
  <el-form ref="registerForm" :model="registerForm" label-width="80px">
    <el-form-item label="User Name" prop="user_name" required>
      <el-input v-model="registerForm.user_name"/>
    </el-form-item>
    <el-form-item label="Password" prop="user_pwd" required>
      <el-input v-model="registerForm.user_pwd"/>
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="registerForm.phone"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegister">Sign In</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  emits: ['registered', 'register-failed'],
  data() {
    return {
      registerForm: {
        user_name: '',
        user_pwd: '',
        phone: ''
      },
    };
  },

  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('api/user/register', this.registerForm);
        if(response.status === 200) {
          this.$emit('registered', this.registerForm);
        }
      } catch(error) {
        this.$emit('register-failed', this.registerForm);
      }
    }
  }
}
</script>

<style scoped>

</style>