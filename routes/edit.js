const Router = require('koa-router')
const router = new Router()

/**
 * 添加新的todoitem
 * 检查登录状态
 * 参数：uid、todo信息
 * 向数据库Todo添加项
 * 并返回成功消息
*/
router.post('/edit/todoitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 修改已存在的todoitem
 * 检查登录状态
 * 参数：uid、todo信息
 * 查询数据库
 * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
 * 并返回修改成功消息
 * 如果不存在则返回错误消息
*/
router.patch('/edit/todoitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 添加新的logitem
 * 检查登录状态
 * 参数：uid、log信息
 * 向数据库Dailylog添加项
 * 并返回成功消息
*/
router.post('/edit/logitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 修改已存在的logitem
 * 检查登录状态
 * 参数：uid、log信息
 * 查询数据库
 * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
 * 并返回修改成功消息
 * 如果不存在则返回错误消息
*/
router.patch('/edit/logitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 添加新的shareitem
 * 检查登录状态
 * 参数：uid、share信息
 * 向数据库Share添加项
 * 并返回成功消息
*/
router.post('/edit/shareitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 修改已存在的shareitem
 * 检查登录状态
 * 参数：uid、share信息
 * 查询数据库
 * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
 * 并返回修改成功消息
 * 如果不存在则返回错误消息
*/
router.patch('/edit/shareitem', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

module.exports = router