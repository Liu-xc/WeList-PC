const Router = require('koa-router')
const { Op } = require('sequelize')
const { User } = require('../database/schema')
const router = new Router()

router.get('/userinfo', async (ctx, next)=>{
  /**
   * 获取用户信息
   * 需要传入用户uid或username用作查询条件
   * 需要检查用户的登录状态
   * 然后在表User中查找数据并返回
  */
  console.log(ctx.url)
  await next()
})

router.patch('/userinfo', async (ctx, next)=>{
  /**
   * 修改用户数据
   * 检查登录状态
   * 解析表数据
   * 传入参数uid或username进行查找更新
  */
  const data = ctx.request.body.data
  const uname = data.uname
  const motto = data.motto
  const email = data.email
  const birthday = data.birthday
  const sex = data.sex

  await User.findOne({
    where: {
      'uname': {
        [Op.eq]: uname
      }
    }
  }).then((res)=>{
    // console.log(res)
    if (res) {
      return res.update({
        'motto': motto,
        'email': email,
        'birthday': birthday,
        'sex': sex
      })
    }
  }).then((res)=>{
    ctx.status = 200
    ctx.body = res
  })

  await next()
})

module.exports = router