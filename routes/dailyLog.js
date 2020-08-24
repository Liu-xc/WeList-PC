const Router = require('koa-router')
const { Op } = require('sequelize')
const { Dailylog } = require('../database/schema')
const router = new Router()

router.get('/dailyLog', async (ctx, next)=>{
  /**
   * 获取日志列表
   * 检查登录状态
   * 参数：uid，page，limit
   * 查询Daliylog表中该用户的所有日志
   * 分页返回数据
  */
  const uname = ctx.request.query.uname
  await Dailylog.findAll({
    where: {
      'userUname': {
        [Op.eq]: uname
      }
    }
  }).then((data)=>{
    ctx.body = data
    ctx.status = 200
  })
  await next()
})

module.exports = router