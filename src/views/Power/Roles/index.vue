<template>
  <div class="roles-container">
    <!-- 面包屑导航区域 -->
    <Breadcrumb :navArr="navArr"></Breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
      <!-- 角色表格展示区域 -->
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <el-row :class="['bdBottom',i1===0? 'bdTop':'','vcenter']" v-for="(item1, i1) in scope.row.children"
              :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="6">
                <el-tag closable @close="removeRightById(scope.row.id, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="18">
                <el-row :class="[i2===0? '':'bdTop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <!-- 渲染二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success" @close="removeRightById(scope.row.id, item2.id)" closable>{{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag @close="removeRightById(scope.row.id, item3.id)" type="warning"
                      v-for="item3 in item2.children" :key="item3.id" closable>{{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditRole(scope.row.id)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除</el-button>
            <!-- 分配权限按钮 -->
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="showAssignRights(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" v-model="addRoleDialogVisible" width="50%" @close="addRoleFormRef.resetFields()">
      <!-- 添加角色表单 -->
      <el-form ref="addRoleFormRef" :rules="rules" :model="addRoleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input class="w-90" v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input class="w-90" v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole(addRoleFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog title="添加角色" v-model="editRoleDialogVisible" width="50%">
      <!-- 修改角色表单 -->
      <el-form ref="editRoleFormRef" :rules="rules" :model="editRoleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input class="w-90" v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input class="w-90" v-model="editRoleForm.roleDesc">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRole">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" v-model="assignRightsDialogVisible">
      <!-- 树形控件 -->
      <el-tree :ref="setRef" :data="rightsList" show-checkbox node-key="id" :default-checked-keys="defKeys"
        :props="treeProps" default-expand-all>
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignRightsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import Breadcrumb from '@/components/Breadcrumb'
import rules from '@/util/rules'
import { getRoleList, addRoleReq, queryRole, editRoleReq, deleteRoleReq, getRightsList, allotRightsReq, removeRoleRight } from '@/config/http.js'

export default {
  components: {
    Breadcrumb
  },
  setup () {
    const { $msg, $confirm } = getCurrentInstance().ctx
    // 面包屑导航数据
    const navArr = ref(['权限管理', '角色列表'])

    const state = reactive({
      // 角色列表数据
      roleList: [],
      // 控制添加角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 添加角色表单
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色表单ref
      addRoleFormRef: null,
      // 根据id查询到的角色信息
      editRoleForm: {},
      // 控制修改角色对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 控制分配权限对话框的显示与隐藏
      assignRightsDialogVisible: false,
      // 权限列表
      rightsList: [],
      // 权限列表类型
      type: 'tree',
      // 树形控件中默认选中的节点
      defKeys: [],
      // 树形控件配置
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 树形控件ref
      treeRef: null,
      // 当前被分配权限的角色id
      roleId: ''
    })
    // 获取初始化数据
    getRoleList(state)

    // 添加角色
    const addRole = (formName) => {
      formName.validate((vaild) => {
        if (!vaild) return $msg.error('表单格式不正确！')
        // 发送添加角色请求
        addRoleReq(state.addRoleForm)
        // 关闭添加角色对话框
        state.addRoleDialogVisible = false
        // 重新获取角色列表数据
        getRoleList(state)
      })
    }

    // 显示编辑角色对话框
    const showEditRole = (id) => {
      queryRole(state.editRoleForm, id)
      state.editRoleDialogVisible = true
    }

    // 编辑角色
    const editRole = () => {
      // 发送编辑角色请求
      editRoleReq(state.editRoleForm)
      // 重新获取角色列表数据
      getRoleList(state)
      // 关闭编辑角色对话框
      state.editRoleDialogVisible = false
    }

    // 删除角色
    const deleteRole = (id) => {
      $confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除角色请求
        deleteRoleReq(id)
        // 重新获取角色列表数据
        getRoleList(state)
      }).catch(() => {
        this.$$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    const getLeafKeys = (node, arr) => {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => getLeafKeys(item, arr)
      )
    }

    // 显示分配权限对话框
    const showAssignRights = (role) => {
      // console.log(role)
      state.roleId = role.id
      getRightsList(state)
      getLeafKeys(role, state.defKeys)
      state.assignRightsDialogVisible = true
    }

    // 获取树形控件的ref
    const setRef = el => {
      state.treeRef = el
    }
    // 角色授权
    const allotRights = () => {
      const keys = [
        ...state.treeRef.getCheckedKeys(),
        ...state.treeRef.getHalfCheckedKeys()
      ]

      const idStr = keys.join(',')
      // 发送授权请求
      allotRightsReq(state, idStr)
      // 重新获取角色列表数据
      getRoleList(state)
      // 关闭编辑角色对话框
      state.assignRightsDialogVisible = false
    }

    // 删除角色指定权限
    const removeRightById = (roleId, rightId) => {
      $confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除权限请求
        removeRoleRight(roleId, rightId)
        // 重新获取角色列表数据
        getRoleList(state)
      }).catch(() => {
        this.$$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    return { ...toRefs(state), navArr, rules, addRole, showEditRole, editRole, deleteRole, showAssignRights, allotRights, setRef, removeRightById }
  }
}
</script>

<style lang="scss">
.roles-container{
  .el-table {
    margin: 20px 0;
    .el-tag {
      margin: 7px;
    }
  }
}

.bdTop {
  border-top: 1px solid #eee;
}
.bdBottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}

.el-dialog__body {
  height: 350px;
  overflow: scroll;
}
</style>
