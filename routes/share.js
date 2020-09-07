const Router = require('koa-router')
const { Op } = require('sequelize')
const { LikeShare, User, Share } = require('../database/schema')
const router = new Router()

router.get('/share', async (ctx, next)=>{
  /**
   * 获取分享列表
   * 检查用户登录状态
   * 查询Share表并作分页
   * 需要检查用户是否like了其中的分享
   * 遍历将要返回的分享列表检查LikeShare表
   * 将用户喜欢的分享id与分享列表片段一起作为返回值返回
  */
  await Share.findAll().then((data)=>{
    ctx.body = data
    ctx.status = 200
  })

  await next()
})

router.get('/likeshare', async (ctx, next)=>{
  /**
   * 点击喜欢分享
   * 参数为uid和shareid
   * 检查用户登录状态
   * 查询表LikeShare
   * 如果有对应项则删除，返回不喜欢
   * 否则添加，返回喜欢
  */
  const params = ctx.request.query
  const uname = params.uname
  const shareid = params.shareid

  // 查询数据库中是否有对应项
  // 如果有就删除
  // 否则新建

  await LikeShare.findOne({
    where: {
      [Op.and]: [
        {
          'uname': uname
        },
        {
          'shareid': shareid
        }
      ]
    }
  }).then(async res=>{
    if (res) {
      // 存在，需要删除
      await res.destroy()
    } else {
      await LikeShare.create({
        'uname': uname,
        'shareid': shareid
      })
    }
  }).then(async ()=>{
    const likeList = await LikeShare.findAll({
      where: {
        'uname': uname
      }
    })
    // console.log(likeList)
    ctx.body = likeList
    ctx.status = 200
  })

  await next()
})

router.get('/getLikeList', async (ctx, next)=>{
  const uname = ctx.request.query.uname
  await LikeShare.findAll({
    where: {
      'uname': {
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