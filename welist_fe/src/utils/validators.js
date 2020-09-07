function checkUsername (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入用户名'))
  }
  if (value.length < 5 || value.length > 10) {
    callback(new Error('用户名至少5位，至多10位'))
  }
  if (value.search(/[^a-zA-Z0-9_]/ig) !== -1) {
    callback(new Error('用户名只能包含数字、字母、下划线'))
  }
  callback()
}

function checkPass (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入密码'))
  }
  if (value.length < 6 || value.length > 12) {
    callback(new Error('密码至少6位，至多12位'))
  }
  if (!_passRule(value)) {
    callback(new Error('密码必须包含数字、小写字母、大写字母，且只能包含数字、字母、下划线'))
  }
  callback()
}

function recheckPass (component) {
  const _that = component
  // 函数柯里化
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error('请再次输入密码'))
    }
    if (value !== _that.form.password) {
      console.log(_that.form.password)
      callback(new Error('两次密码不一致'))
    }
    callback()
  }
}

/**
 * @param {*} pass
 * 检查密码强度，密码必须包含数字以及大小写字母
 * 且不包含数字字母下划线以外的字符
 */
function _passRule (pass) {
  return pass.match(/[a-z]/) && pass.match(/[0-9]/) && pass.match(/[A-Z]/) && !pass.match(/[^0-9a-zA-Z_]/g)
}

function checkEmail (rule, value, callback) {
  const email = value
  const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (reg.test(email) || value === '') {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱地址'))
  }
}

export { checkUsername, checkPass, recheckPass, checkEmail }
