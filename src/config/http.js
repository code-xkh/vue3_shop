import { app } from '@/main.js'
const { $http, $msg } = app.config.globalProperties

// 获取菜单列表数据的请求
const getMenulist = async (state) => {
  const { data: res } = await $http.get('menus')
  if (res.meta.status !== 200) return $msg.error('获取菜单列表失败！')
  state.menulist = res.data
}

export { getMenulist }
