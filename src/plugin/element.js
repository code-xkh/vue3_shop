import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElHeader, ElAside, ElMain, ElContainer, ElCard, ElRadioGroup, ElRadioButton, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem, ElBreadcrumb, ElBreadcrumbItem, ElRow, ElCol, ElTable, ElTableColumn, ElPagination, ElSwitch, ElDialog, ElTooltip, ElMessageBox, ElSelect, ElOption } from 'element-plus'

function appUse (app) {
  app.use(ElButton).use(ElForm).use(ElFormItem).use(ElInput).use(ElMessage).use(ElHeader).use(ElAside).use(ElMain).use(ElContainer).use(ElCard).use(ElRadioGroup).use(ElRadioButton).use(ElMenu).use(ElSubmenu).use(ElMenuItemGroup).use(ElMenuItem).use(ElBreadcrumb).use(ElBreadcrumbItem).use(ElRow).use(ElCol).use(ElTable).use(ElTableColumn).use(ElPagination).use(ElSwitch).use(ElDialog).use(ElTooltip).use(ElMessageBox).use(ElSelect).use(ElOption)

  // 将elmessage挂载到全局
  app.config.globalProperties.$msg = ElMessage
}

export default appUse
