const Router = require('koa-router')
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

router.post('/userinfo', async (ctx, next)=>{
  /**
   * 修改用户数据
   * 检查登录状态
   * 解析表数据
   * 传入参数uid或username进行查找更新
  */
  console.log(ctx.url)
  await next()
})

module.exports = router