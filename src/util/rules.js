const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '邮箱格式不正确', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  roleName: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ]
}

export default rules
