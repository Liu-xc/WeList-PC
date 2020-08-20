const Router = require('koa-router')
const { Op } = require('sequelize')
const { Todo, Dailylog, Share } = require('../database/schema')
const router = new Router()


router.post('/edit/todoitem', async (ctx, next)=>{
  /**
   * 添加新的todoitem
   * 检查登录状态
   * 参数：uid、todo信息
   * 向数据库Todo添加项
   * 并返回成功消息
  */
  const data = ctx.request.body.data
  const uname = data.uname
  const title = data.title
  const desc = data.desc
  const stime = data.stime
  const ddl = data.ddl
  const importance = data.importance

  await Todo.create({'userUname': uname, 'title': title, 'desc': desc, 'stime': stime, 'ddl': ddl, 'importance': importance}).then(()=>{
    Todo.findAll({
      where: {
        'userUname': uname
      }
    })
  }).then(()=>{
    ctx.status = 200
  })
  await next()
})

router.patch('/edit/todoitem', async (ctx, next)=>{
  /**
   * 修改已存在的todoitem
   * 检查登录状态
   * 参数：uid、todo信息
   * 查询数据库
   * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
   * 并返回修改成功消息
   * 如果不存在则返回错误消息
  */
  console.log(ctx.url)
  await next()
})

router.post('/edit/logitem', async (ctx, next)=>{
  /**
   * 添加新的logitem
   * 检查登录状态
   * 参数：uid、log信息
   * 向数据库Dailylog添加项
   * 并返回成功消息
  */
  const data = ctx.request.body.data
  const uname = data.uname
  const title = data.title
  const content = data.content

  await Dailylog.create({'userUname': uname, 'title': title, 'content': content}).then(()=>{
    ctx.status = 200
  })

  await next()
})

router.patch('/edit/logitem', async (ctx, next)=>{
  /**
   * 修改已存在的logitem
   * 检查登录状态
   * 参数：uid、log信息
   * 查询数据库
   * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
   * 并返回修改成功消息
   * 如果不存在则返回错误消息
  */
  console.log(ctx.url)
  await next()
})

router.post('/edit/shareitem', async (ctx, next)=>{
  /**
   * 添加新的shareitem
   * 检查登录状态
   * 参数：uid、share信息
   * 向数据库Share添加项
   * 并返回成功消息
  */
  const data = ctx.request.body.data
  const uname = data.uname
  const title = data.title
  const content = data.content

  await Share.create({'userUname': uname, 'title': title, 'content': content}).then(()=>{
    ctx.status = 200
  })

  await next()
})

router.patch('/edit/shareitem', async (ctx, next)=>{
  /**
   * 修改已存在的shareitem
   * 检查登录状态
   * 参数：uid、share信息
   * 查询数据库
   * 如果存在则采用（覆盖或者修改字段覆盖）更新数据库
   * 并返回修改成功消息
   * 如果不存在则返回错误消息
  */
  console.log(ctx.url)
  await next()
})

module.exports = router