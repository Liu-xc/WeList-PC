const Koa = require('koa2')
const BodyParser = require('koa-bodyparser')
const Static = require('koa-static')
const Views = require('koa-views')
const path = require('path')
const router = require('./routes/index')

const app = new Koa()

app.use(BodyParser())
app.use(Static(path.join(__dirname, './welist_fe/dist')))
app.use(Views(path.join(__dirname, './welist_fe/dist'), {extension: 'html'}))

// app.use(async (ctx, next)=>{
//   await ctx.render('index')
//   await next()
// })

app.use(router)

app.listen(3000)
