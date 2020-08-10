const Router = require('koa-router')
const router = new Router()

router.get('/dailyLog', async (ctx, next)=>{
  /**
   * 获取日志列表
   * 检查登录状态
   * 参数：uid，page，limit
   * 查询Daliylog表中该用户的所有日志
   * 分页返回数据
  */
  console.log(ctx.url)
  await next()
})

module.exports = router