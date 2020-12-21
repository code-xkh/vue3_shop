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
const getRoleList = async (state) => {
  const { data: res } = await $http.get('roles')
  if (res.meta.status !== 200) return $msg.error('获取角色列表失败！')
  state.roleList = res.data
  // console.log('res.data :>> ', res.data)
}

// 添加角色请求
const addRoleReq = async (params) => {
  const { data: res } = await $http.post('roles', params)
  if (res.meta.status !== 201) return $msg.error('添加角色列表失败！')
  $msg.success('添加角色成功！')
}

// 根据id查询角色
const queryRole = async (editRoleForm, id) => {
  const { data: res } = await $http.get(`roles/${id}`)
  if (res.meta.status !== 200) return $msg.error('获取角色信息失败！')
  // editRoleForm = res.data
  editRoleForm.roleId = res.data.roleId
  editRoleForm.roleName = res.data.roleName
  editRoleForm.roleDesc = res.data.roleDesc
}

// 编辑提交角色
const editRoleReq = async (params) => {
  const { data: res } = await $http.put(`roles/${params.roleId}`, {
    roleName: params.roleName, roleDesc: params.roleDesc
  })
  if (res.meta.status !== 200) return $msg.error('修改角色信息失败！')
  $msg.success('修改角色信息成功！')
}

// 删除角色
const deleteRoleReq = async (id) => {
  const { data: res } = await $http.delete(`roles/${id}`)
  if (res.meta.status !== 200) return $msg.error('删除角色失败！')
  $msg.success('删除角色成功！')
}

// 获取权限列表（树形tree/列表list）
const getRightsList = async (state) => {
  const { data: res } = await $http.get(`rights/${state.type}`)
  if (res.meta.status !== 200) return $msg.error('获取权限列表失败！')
  state.rightsList = res.data
}

// 角色授权
const allotRightsReq = async (state, params) => {
  const { data: res } = await $http.post(`roles/${state.roleId}/rights`, { rids: params })
  if (res.meta.status !== 200) return $msg.error('授权失败！')
  $msg.success('授权成功！')
}

// 删除角色指定权限
const removeRoleRight = async (roleId, rightId) => {
  const { data: res } = await $http.delete(`roles/${roleId}/rights/${rightId}`)
  if (res.meta.status !== 200) return $msg.error('删除权限失败！')
  $msg.success('删除权限成功！')
}

export { getMenulist, getUserList, addUserReq, changeUserState, queryUserDetail, editUserReq, deleteUserReq, assignRoleReq, getRoleList, addRoleReq, queryRole, editRoleReq, deleteRoleReq, getRightsList, allotRightsReq, removeRoleRight }
