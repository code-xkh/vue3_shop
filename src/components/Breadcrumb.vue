<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in navArr" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    navArr: Array
  }
}
</script>

<style lang="scss">
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
