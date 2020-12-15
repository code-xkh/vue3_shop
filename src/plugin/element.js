import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElHeader, ElAside, ElMain, ElContainer, ElCard, ElRadioGroup, ElRadioButton, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem } from 'element-plus'

function appUse (app) {
  app.use(ElButton).use(ElForm).use(ElFormItem).use(ElInput).use(ElMessage).use(ElHeader).use(ElAside).use(ElMain).use(ElContainer).use(ElCard).use(ElRadioGroup).use(ElRadioButton).use(ElMenu).use(ElSubmenu).use(ElMenuItemGroup).use(ElMenuItem)
  app.config.globalProperties.$msg = ElMessage
}

export default appUse
