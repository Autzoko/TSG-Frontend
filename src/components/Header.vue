<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex; background-color: lightslategrey;">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: white; font-size: 25px">ImageCaptioning</div>
    <div style="flex: 1"></div>
    <div style="width: 100px; height: 80px; padding-top: 15px; font-size: 18px;">
      <el-dropdown>
        <span class="el-dropdown--large" style="padding: 3px">
          Menu
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>User Info</el-dropdown-item>
            <el-dropdown-item>Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>