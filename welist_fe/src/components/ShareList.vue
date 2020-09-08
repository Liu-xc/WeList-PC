<template>
  <div class="share-view">
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(item, index) of shareList"
        :timestamp="item.createTime | transTimeStamp"
        :key="index"
      >
        <el-card>
          <h4>{{item.userUname}} : {{item.title}}</h4>
          <p>{{item.content}}</p>
          <handle-or-like
            :author="item.author"
            :like="item.like"
            @toggleStar="handleStar(item.shareid)"
          ></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import axios from 'axios'
import HandleOrLike from './HandleOrLike'
import { mapGetters, mapMutations } from 'vuex'
import { transTimeStamp } from '../utils/handleTime'
export default {
  name: 'ShareList',
  components: {
    HandleOrLike
  },
  data () {
    return {
      likeList: []
    }
  },
  computed: {
    ...mapGetters([
      'shareList',
      'userInfo'
    ])
  },
  filters: {
    transTimeStamp
  },
  async mounted () {
    /**
     * 获取用户喜欢的分享列表
    */
    await this._getShareList()

    axios.get('/getLikeList', {
      params: {
        uname: this.userInfo.uname
      }
    }).then((res) => {
      // console.log(res.data)
      if (res.status === 200) {
        this.handleLikeList(res.data)
      }
    }
    )
  },
  methods: {
    ...mapMutations([
      'setShareList'
    ]),
    handleStar (shareid) {
      axios.get('/likeShare', {
        params: {
          uname: this.userInfo.uname,
          shareid: shareid
        }
      }).then(res => {
        // 将喜欢列表更新，并重新渲染like按钮
        this.handleLikeList(res.data)
      })
    },
    // 处理获取到的喜欢列表
    handleLikeList (likeList) {
      this.likeList = likeList
      const shareLen = this.shareList.length
      const likeLen = this.likeList.length

      // 对获取到的分享列表进行处理
      // 对用户身份进行分辨，对应渲染图标以及能够执行的操作
      for (let i = 0; i < shareLen; i++) {
        for (let j = 0; j < likeLen; j++) {
          if (this.shareList[i].shareid === this.likeList[j].shareid) {
            // 如果在喜欢列表中出现则说明不是作者，同时喜欢了分享
            this.shareList[i] = Object.assign(this.shareList[i], { like: true })
            this.shareList[i] = Object.assign(this.shareList[i], { author: false })
            // 如果有满足条件的直接退出本次子循环，避免被覆盖
            break
          } else if (this.shareList[i].userUname === this.userInfo.uname) {
            // 如果没有在喜欢列表中出现但分享所属用户与当前用户对应，则说明是作者
            this.shareList[i] = Object.assign(this.shareList[i], { like: false })
            this.shareList[i] = Object.assign(this.shareList[i], { author: true })
            // 如果有满足条件的直接退出本次子循环，避免被覆盖
            break
          } else {
            // 如果上述两种情况都不满足则说明既不是用户也不是喜欢的
            this.shareList[i] = Object.assign(this.shareList[i], { like: false })
            this.shareList[i] = Object.assign(this.shareList[i], { author: false })
            // 在这里不退出子循环，因为下一次循环可能满足上面两种情况
          }
        }
      }
      this.setShareList(this.shareList)
    },
    _getShareList () {
      axios.get('/share').then((res) => {
        if (res === 200 || res.data) {
          const data = res.data
          this.likeList = res.data
          this.setShareList(data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.share-view
  height 80vh
  overflow-y scroll
</style>
