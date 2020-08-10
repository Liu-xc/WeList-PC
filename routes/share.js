const Router = require('koa-router')
const router = new Router()

/**
 * 获取分享列表
 * 检查用户登录状态
 * 查询Share表并作分页
 * 需要检查用户是否like了其中的分享
 * 遍历将要返回的分享列表检查LikeShare表
 * 将用户喜欢的分享id与分享列表片段一起作为返回值返回
*/
router.get('/share', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

/**
 * 点击喜欢分享
 * 参数为uid和shareid
 * 检查用户登录状态
 * 查询表LikeShare
 * 如果有对应项则删除，返回不喜欢
 * 否则添加，返回喜欢
*/
router.get('/likeshare', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

module.exports = router