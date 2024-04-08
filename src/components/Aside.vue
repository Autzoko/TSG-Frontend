<script>
export default {
  name: "Aside"
}
</script>

<template>
  <div>
    <el-menu style="width: 200px; height: 100%"
             default-active="2">
      <el-menu-item index="1">
        <el-icon><icon-menu/></el-icon>
        <span><div style="color: dodgerblue">Session1</div></span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu/></el-icon>
        <span><div style="color: dodgerblue">Session2</div></span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><icon-menu/></el-icon>
        <span><div style="color: dodgerblue">Session3</div></span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><icon-menu/></el-icon>
        <span><div style="color: dodgerblue">Session4</div></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

</style>