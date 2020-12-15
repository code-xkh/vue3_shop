<template>
  <div class="home-container">
    <el-container>
      <!-- 头部 -->
      <el-header class="flex-space-center">
        <div class="flex-space-center">
          <img src="@/assets/logo.png" width="50" height="50">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="exit">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="menuState.isCollapse? '64px':'200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu :default-active="menuState.activePath" :uniqueOpened="true" :collapse="menuState.isCollapse"
            :collapse-transition="false" router>
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menuState.menulist" :key="item.id">
              <!-- 一级菜单模板区域 -->
              <template #title>
                <!-- 图标 -->
                <i :class="icons[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :class="123" :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
                {{subItem.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { getMenulist } from '@/config/http.js'
import router from '@/router/index.js'

export default {
  name: 'Home',
  setup () {
    // 获取菜单详情
    const { menuState, icons } = getMenuDetail()
    // 控制左侧菜单伸缩
    const toggleCollapse = () => {
      menuState.isCollapse = !menuState.isCollapse
    }
    // 退出管理系统
    const exit = () => {
      router.push('/login')
    }

    return { menuState, icons, toggleCollapse, exit }
  }
}
// 获取菜单详情
function getMenuDetail () {
  // 左侧菜单
  const menuState = reactive({
    // 左侧栏菜单是否折叠
    isCollapse: false,
    // 左侧菜单数据
    menulist: [{ id: 1, authName: '用户管理' }],
    // 左侧菜单活跃项
    activePath: ''
  })
  // 菜单图标
  const icons = {
    125: 'el-icon-user',
    103: 'el-icon-lock',
    101: 'el-icon-goods',
    102: 'el-icon-s-order',
    145: 'el-icon-s-data'
  }
  // 获取菜单数据
  getMenulist(menuState)
  return { menuState, icons }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
