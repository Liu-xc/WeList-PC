const Router = require('koa-router')
const { Todo } = require('../database/schema.js')
const { Op } = require('sequelize')
const router = new Router()

router.get('/todoList', async (ctx, next)=>{
  /**
   * 获取任务清单
   * 需要传入参数uid或username
   * 在数据库表Todo中查找
   * 将所有数据返回（后期内容多的话可以考虑做分页，但意义不大）
   * 是否需要检查用户的登录状态（session？）
  */
  const uname = ctx.request.query.uname
  await Todo.findAll({
    where: {
      'userUname': {
        [Op.eq]: uname
      }
    }
  }).then((res)=>{
    if (res) {
      ctx.status = 200
      ctx.body = res
    }
  })
  await next()
})

router.post('/changeTodoStatus', async (ctx, next)=>{
  const data = ctx.request.body.data
  const movedList = data.movedList
  const action = data.action
  const len = movedList.length
  const uname = data.uname

  for (let i = 0; i < len; i++) {
    const res = await Todo.findOne({
      where: {
        'todoid': {
          [Op.eq]: movedList[i].todoid
        }
      }
    })
    if (res) {
        console.log(res)
        res.done = action
        await res.save()
      } else {
        console.log('?')
      }
  }
  console.log(len)
  // 返回最新的todoList
  const newTodoList = await Todo.findAll({
    where: {
      'userUname': {
        [Op.eq]: uname
      }
    }
  })

  // console.log(newTodoList)

  ctx.body = newTodoList
  ctx.status = 200
  await next()
})

module.exports = router