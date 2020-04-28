const user_code = []
const email_code = []
const code = {
  addCode (param) {
    let code = parseInt(Math.random() * 100000).toString().padStart(6, '0')
    console.log('code is ', code)
    if (param.type === 'email') {
      email_code.push({
        'user_email': param.user_email,
        code: code
      })
      this.timeoutDeleteCode({
        type: 'email',
        'user_email': param.user_email
      })
    }
    return code
  },
  timeoutDeleteCode (param) {
    if (param.type === 'email') {
      setTimeout(function () {
        for (let i = 0; i < email_code.length; i++) {
          if (param.user_email === email_code[i].user_email) {
            email_code.splice(i, 1)
            break
          }
        }
      }, 1000*60*30)
    }

  },
  deleteCode (param) {
    if (param.type === 'email') {
      for (let i = 0; i < email_code.length; i++) {
        if (param.user_email === email_code[i].user_email) {
          email_code.splice(i, 1)
          break
        }
      }
    }

  },
  checkCode (param) {
    console.log(param)
    console.log(email_code)
    let flag = false
    if (param.type === 'email') {
      for (let i = 0; i < email_code.length; i++) {
        if (param.user_email === email_code[i].user_email && param.code === email_code[i].code) {
          flag = true
        }
      }
    }
    return flag
  },

}
module.exports = code