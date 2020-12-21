<template>
  <div class="rights-container">
    <!-- 面包屑导航 -->
    <Breadcrumb :navArr="navArr"></Breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="rightsList" style="width: 100%" border>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column label="权限等级">
          <template #default="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { getRightsList } from '@/config/http.js'

export default {
  components: { Breadcrumb },
  setup () {
    const navArr = ['权限管理', '权限列表']
    const state = reactive({
      // 权限列表
      rightsList: [],
      // 权限列表类型
      type: 'list'
    })
    // 获取权限列表数据
    getRightsList(state, state.type)

    return { ...toRefs(state), navArr }
  }
}
</script>

<style>

</style>
