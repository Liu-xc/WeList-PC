const Router = require('koa-router')
const Compose = require('koa-compose')
const dailyLogRoutes = require('./dailyLog')
const userinfoRoutes = require('./userinfo')
const shareRoutes = require('./share')
const editRoutes = require('./edit')
const todoRoutes = require('./todoList')
const router = new Router()

router.get('/', async (ctx, next)=>{
  console.log(ctx.request.query)
  await ctx.render('index')
  await next()
})

router.get('/login', async (ctx, next)=>{
  console.log(ctx.request.query)
  await next()
})

router.get('/register', async (ctx, next)=>{
  console.log(ctx.request.query)
  await next()
})

module.exports = Compose([
  router.routes(),
  dailyLogRoutes.routes(),
  userinfoRoutes.routes(),
  shareRoutes.routes(),
  editRoutes.routes(),
  todoRoutes.routes()
])
