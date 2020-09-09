<template>
  <div class="log-view">
    <el-timeline>
      <el-timeline-item
        :timestamp="item.createTime | transTimeStamp"
        placement="top"
        v-for="(item, index) of logList"
        :key="index"
      >
        <el-card>
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
          <handle-or-like
            @toggleStar="handleToggleStar"
            :author="true"
            @edit="handleEdit(item.logid)"
            @delete="handleDelete(item.logid)"
          ></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <log-list-item></log-list-item>
  </div>
</template>

<script>
import LogListItem from './LogListItem'
import HandleOrLike from './HandleOrLike'
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { transTimeStamp } from '../utils/handleTime.js'

export default {
  name: 'LogList',
  computed: {
    ...mapGetters([
      'logList'
    ])
  },
  components: {
    LogListItem,
    HandleOrLike
  },
  methods: {
    ...mapMutations([
      'setLogList'
    ]),
    handleToggleStar () {
      console.log('star')
    },
    handleEdit (logid) {
      this.$emit('editLog', logid)
    },
    handleDelete (logid) {
      // 删除对应的log
      axios.delete('/deleteDailyLog', {
        data: {
          logid
        }
      }).then((res) => {
        this.setLogList(res.data)
      })
    }
  },
  filters: {
    transTimeStamp
  }
}
</script>

<style lang="stylus" scoped>
.log-view
  height 80vh
  overflow-y scroll
</style>
