<template>
  <div style="height: 700px">
    <h1 style="padding-top: 70px">Start A New Caption! Captain!</h1>
    <div style="padding-top: 300px">
      <el-button style="background-color: dodgerblue" @click="startSession"><div style="color: white">Start</div></el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRouter } from "vue-router";

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const startSession = () => {
      router.push({name: 'LoginView'});
    };
    return {
      startSession
    }
  }
}
</script>
