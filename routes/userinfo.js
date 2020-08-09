const Router = require('koa-router')
const router = new Router()

router.get('/userinfo', async (ctx, next)=>{
  console.log(ctx.url)
  await next()
})

module.exports = router