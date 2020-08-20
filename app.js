const Koa = require('koa2')
const BodyParser = require('koa-bodyparser')
const Static = require('koa-static')
const Views = require('koa-views')
const path = require('path')
const cors = require('@koa/cors')
const router = require('./routes/index')
const Schemas = require('./database/schema')

const app = new Koa()

app.use(cors())

;(async ()=>{
  await Schemas.User.sync()
  await Schemas.Todo.sync()
  await Schemas.Dailylog.sync()
  await Schemas.Share.sync()
  await Schemas.UserPass.sync()
  await Schemas.LikeShare.sync()
})()

app.use(BodyParser())
app.use(Static(path.join(__dirname, './welist_fe/dist')))
app.use(Views(path.join(__dirname, './welist_fe/dist'), {extension: 'html'}))

app.use(router)

app.listen(3000)
