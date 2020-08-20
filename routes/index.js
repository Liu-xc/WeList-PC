const Router = require('koa-router')
const Compose = require('koa-compose')
const dailyLogRoutes = require('./dailyLog')
const userinfoRoutes = require('./userinfo')
const shareRoutes = require('./share')
const editRoutes = require('./edit')
const todoRoutes = require('./todoList')
const { UserPass, User } = require('../database/schema')
const { Op } = require("sequelize")

const router = new Router()

// 渲染主页
router.get('/', async (ctx, next)=>{
  console.log(ctx.request.query)
  await ctx.render('index')
  await next()
})

router.post('/login', async (ctx, next)=>{
  const data = ctx.request.body.data
  const uname = data.uname
  const pass = data.password
  /**
   * 到时候密码需要加密
   * 加密后的密码验证需要先查有没有对应的uid
   * 如果有对应的uid就找出pass
   * 然后将用户传入的pass使用同样的规则进行加密对比
   * 通过则登录成功
   * 否则失败
  */
  await UserPass.findOne({
    where: {
      [Op.and]: [
        {
          'userUname': {
            [Op.eq]: uname
          }
        },
        {
          'pass': {
            [Op.eq]: pass
          }
        }
      ]
    }
  }).then((data)=>{
    console.log(data)
    ctx.body = data
  })
  await next()
})


/**
 * 用户注册接口
 * 首先检查用户名是否重复，如果重复返回错误
 * 如果不重复则将数据添加到数据库表User和UserPass中
 * 需要获取数据库中使用的uid，或者使用用户名作为外键
 * 将对应的密码存入UserPass
 * 最后返回创建成功
*/
router.post('/register', async (ctx, next)=>{
  const data = ctx.request.body.data
  const uname = data.uname
  const pass = data.password

  await User.findOne({
    where: {
      'uname': {
        [Op.eq]: uname
      }
    }
  }).then((data)=>{
    if (!data) {
      return User.create({'uname': uname})
    }
  }).then(()=>{
    UserPass.create({'userUname': uname, 'pass': pass})
  }).then(()=>{
    ctx.status = 200
  })

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
