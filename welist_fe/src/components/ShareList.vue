<template>
  <div>
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(item, index) of shareList"
        :timestamp="item.createTime | transTimeStamp"
        :key="index"
      >
        <el-card>
          <h4>{{item.title}}</h4>
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
  mounted () {
    /**
     * 获取用户喜欢的分享列表
    */
    axios.get('/getLikeList', {
      params: {
        uname: this.userInfo.uname
      }
    }).then((res) => {
      console.log(res.data)
      if (res.status === 200) {
        this.likeList = res.data
        this.likeList = res.data
        const shareLen = this.shareList.length
        const likeLen = this.likeList.length

        for (let i = 0; i < shareLen; i++) {
          for (let j = 0; j < likeLen; j++) {
            if (this.shareList[i].shareid === this.likeList[j].shareid) {
              // 如果在喜欢列表中出现则说明不是作者，同时喜欢了分享
              this.shareList[i].like = true
              this.shareList[i].author = false
            } else if (this.shareList[i].uname === this.userInfo.uname) {
              // 如果没有在喜欢列表中出现但分享所属用户与当前用户对应，则说明是作者
              this.shareList[i].like = false
              this.shareList[i].author = true
            } else {
              // 如果上述两种情况都不满足则说明既不是用户也不是喜欢的
              this.shareList[i].like = false
              this.shareList[i].author = false
            }
          }
        }
        this.setShareList(this.shareList)
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
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
