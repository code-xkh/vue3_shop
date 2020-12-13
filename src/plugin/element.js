import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'

function appUse (app) {
  app.use(ElButton).use(ElForm).use(ElFormItem).use(ElInput).use(ElMessage)

  app.config.globalProperties.$msg = ElMessage
}

export default appUse
