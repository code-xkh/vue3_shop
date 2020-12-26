import { app } from '@/main.js'
const { $http, $msg } = app.config.globalProperties

// 获取菜单列表数据的请求
const getMenulist = async (state) => {
  const { data: res } = await $http.get('menus')
  if (res.meta.status !== 200) return $msg.error('获取菜单列表失败！')
  state.menulist = res.data
}

// 获取用户数据列表
const getUserList = async (userState, queryInfo) => {
  const { data: res } = await $http.get('users', { params: queryInfo })
  if (res.meta.status !== 200) return $msg.error('获取用户数据列表失败！')
  userState.userlist = res.data.users
  userState.total = res.data.total
}

// 添加用户
const addUserReq = async (addUserForm) => {
  const { data: res } = await $http.post('users', addUserForm)
  console.log(res)
  if (res.meta.status !== 201) return $msg.error('添加用户失败！')
  $msg.success('添加用户成功！')
}

// 修改用户状态
const changeUserState = async (id, userState) => {
  const { data: res } = await $http.put(`users/${id}/state/${userState}`)
  if (res.meta.status !== 200) return $msg.error('修改用户状态失败！')
  $msg.success('修改用户状态成功！')
}

// 根据id查询用户信息
const queryUserDetail = async (editUserForm, id) => {
  const { data: res } = await $http.get(`users/${id}`)
  if (res.meta.status !== 200) return $msg.error('查询用户信息失败！')
  editUserForm.id = res.data.id
  editUserForm.username = res.data.username
  editUserForm.email = res.data.email
  editUserForm.mobile = res.data.mobile
}
// 编辑用户提交
const editUserReq = async (editUserForm) => {
  const { data: res } = await $http.put(`users/${editUserForm.id}`, {
    email: editUserForm.email,
    mobile: editUserForm.mobile
  })
  if (res.meta.status !== 200) return $msg.error('修改用户信息失败！')
  $msg.success('修改用户信息成功！')
}

// 删除单个用户
const deleteUserReq = async (id) => {
  const { data: res } = await $http.delete(`users/${id}`)
  console.log(res)
  if (res.meta.status !== 200) return $msg.error('删除用户失败！')
  $msg.success('删除用户成功！')
}

// 分配用户角色
const assignRoleReq = async (id, rid) => {
  const { data: res } = await $http.put(`users/${id}/role`, { rid })
  if (res.meta.status !== 200) return $msg.error('分配角色失败！')
  $msg.success('分配角色成功！')
}

// 获取角色列表
const getRoleList = async (roleState) => {
  const { data: res } = await $http.get('roles')
  if (res.meta.status !== 200) return $msg.error('获取角色列表失败！')
  roleState.roleList = res.data
}

// 获取商品列表数据
const getGoodsList = async (state) => {
  const { data: res } = await $http.get('goods', { params: state.queryInfo })
  // console.log(res)
  if (res.meta.status !== 200) return $msg.error('获取商品列表数据失败！')
  state.goodsList = res.data.goods
  state.total = res.data.total
}

// 删除商品
const deleteGoodsReq = async (id) => {
  const { data: res } = await $http.delete(`goods/${id}`)
  if (res.meta.status !== 200) return $msg.error('删除商品失败！')
  $msg.success('删除商品成功！')
}

export { getMenulist, getUserList, addUserReq, changeUserState, queryUserDetail, editUserReq, deleteUserReq, assignRoleReq, getRoleList, getGoodsList, deleteGoodsReq }
