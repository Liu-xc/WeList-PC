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
          <handle-or-like :author="true"></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import HandleOrLike from './HandleOrLike'
import { mapGetters } from 'vuex'
import { transTimeStamp } from '../utils/handleTime'
export default {
  name: 'ShareList',
  components: {
    HandleOrLike
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'shareList'
    ])
  },
  filters: {
    transTimeStamp
  }
}
</script>

<style lang="stylus" scoped></style>
