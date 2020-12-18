<template>
  <div class="user-container">
    <!-- 面包屑导航 -->
    <Breadcrumb :navArr="navArr" />

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="queryInfo.query" placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search" @click="getUserList(userState, queryInfo)"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="userState.userlist" border style="width: 100%;margin: 20px auto;">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_userState" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row.id, scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip content="修改" placement="top" :enterable="false">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">
              </el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting" @click="showAssignRoleDialog(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="userState.total">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框区域 -->
    <el-dialog title="添加用户" v-model="addUserDialogVisible" width="50%" @close="addUserFormRef.resetFields()">
      <!-- 添加用户表单 -->
      <el-form ref="addUserFormRef" :rules="userRules" :model="addUserForm" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input class="w-90" v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="w-90" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input class="w-90" v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input class="w-90" v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser(addUserFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改用户对话框区域 -->
    <el-dialog title="修改用户" v-model="editUserDialogVisible" width="50%" @close="editUserDialogClosed">
      <!-- 修改用户表单 -->
      <el-form :ref="setRef" :rules="userRules" :model="editUserForm" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input class="w-90" v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input class="w-90" v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input class="w-90" v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" v-model="assignRoleDialogVisible" width="50%" @close="roleState.selectedRoleId = ''">
      <p>当前用户：{{roleState.selectedUser.username}}</p>
      <p class="assignRolP">当前用户角色：{{roleState.selectedUser.role_name}}</p>
      <el-select v-model="roleState.selectedRoleId" placeholder="请选择要分配的角色">
        <el-option v-for="item in roleState.roleList" :key="item.id" :label="item.roleName" :value="item.id">
        </el-option>
      </el-select>
      <!-- 底部区域 -->
      <template #footer>
        <span>
          <el-button @click="assignRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="assignRole">确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { getUserList, addUserReq, changeUserState, queryUserDetail, editUserReq, deleteUserReq, assignRoleReq, getRoleList } from '@/config/http.js'
import userRules from '@/util/rules.js'

export default {
  name: 'User',
  components: {
    Breadcrumb
  },
  setup () {
    /**
     *
     *  定义变量（非函数）区域
     *
     */

    const { $msg, $confirm } = getCurrentInstance().ctx
    // 面包屑导航参数
    const navArr = ['用户管理', '用户列表']
    // 添加用户表单ref
    const addUserFormRef = ref(null)
    // 修改用户表单ref
    let editUserFormRef = ''
    const setRef = el => {
      editUserFormRef = el
    }

    // 请求用户列表的参数对象
    const queryInfo = reactive({
      query: '',
      // 当前的页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 5
    })

    // 用户列表详情
    const userState = reactive({
      // 用户列表数据
      userlist: [],
      // 用户总数
      total: 0
    })

    // 添加用户的表单
    const addUserForm = reactive({
      // 用户名
      username: '',
      // 密码
      password: '',
      // 邮箱
      email: '',
      // 手机号
      mobile: ''
    })

    // 查询到的用户信息
    const editUserForm = reactive({
      id: 0,
      username: '',
      email: '',
      mobile: ''
    })

    // 角色分配信息
    const roleState = reactive({
      // 角色列表
      roleList: [],
      // 被选中的用户信息
      selectedUser: {},
      // 被选中的角色id
      selectedRoleId: ''
    })

    // 控制添加用户对话框的显示和隐藏
    const addUserDialogVisible = ref(false)
    // 控制修改用户对话框的显示和隐藏
    const editUserDialogVisible = ref(false)
    // 控制分配角色对话框的显示和隐藏
    const assignRoleDialogVisible = ref(false)

    /**
     *
     *  定义（或执行）函数区域
     *
     */

    // 获取用户列表数据
    getUserList(userState, queryInfo)

    // 当每页显示的条数改变触发函数
    const handleSizeChange = (newSize) => {
      queryInfo.pagesize = newSize
      getUserList(userState, queryInfo)
    }
    // 当当前页码改变触发函数
    const handleCurrentChange = (newPage) => {
      queryInfo.pagenum = newPage
      getUserList(userState, queryInfo)
    }

    // 添加用户函数
    const addUser = (addUserFormRef) => {
      // 表单验证
      addUserFormRef.validate(async (vaild) => {
        if (!vaild) return $msg.error('表单格式不正确！')
        // 发送添加用户请求
        addUserReq(addUserForm)
        addUserDialogVisible.value = false
        // 重新获取用户列表数据
        getUserList(userState, queryInfo)
      })
    }

    // 显示修改用户对话框函数
    const showEditDialog = (id) => {
      queryUserDetail(editUserForm, id)
      editUserDialogVisible.value = true
    }

    // 关闭修改用户对话框触发函数
    const editUserDialogClosed = () => {
      editUserFormRef.resetFields()
    }

    // 修改用户信息函数
    const editUser = () => {
      // 表单验证
      editUserFormRef.validate(async (vaild) => {
        if (!vaild) return $msg.error('表单格式不正确！')
        // 发送修改用户请求
        editUserReq(editUserForm)
        editUserDialogVisible.value = false
        // 重新获取用户列表数据
        getUserList(userState, queryInfo)
      })
    }

    // 删除用户函数
    const deleteUser = (id) => {
      $confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 发送删除用户请求
        deleteUserReq(id)
        // 重新获取用户列表数据
        getUserList(userState, queryInfo)
      }).catch(() => {
        $msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    // 显示分配角色对话框函数
    const showAssignRoleDialog = (selectedUser) => {
      roleState.selectedUser = selectedUser
      getRoleList(roleState)
      assignRoleDialogVisible.value = true
    }

    // 分配角色函数
    const assignRole = () => {
      // 发送分配角色请求
      assignRoleReq(roleState.selectedUser.id, roleState.selectedRoleId)
      // 重新获取用户列表数据
      getUserList(userState, queryInfo)
      assignRoleDialogVisible.value = false
    }

    return { userState, navArr, queryInfo, getUserList, handleSizeChange, handleCurrentChange, addUserForm, addUserDialogVisible, userRules, addUserFormRef, addUser, editUserForm, changeUserState, editUserDialogVisible, showEditDialog, setRef, editUser, deleteUser, roleState, assignRoleDialogVisible, showAssignRoleDialog, assignRole, editUserDialogClosed }
  }
}
</script>

<style lang="scss">
.assignRolP {
  margin: 20px 0;
}
</style>
