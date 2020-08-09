<template>
  <div>
    <el-timeline>
      <el-timeline-item :timestamp="formattedDate" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <handle-or-like :author="true"></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import HandleOrLike from './HandleOrLike'
import transTimeStamp from '../utils/transTimeStamp'
export default {
  name: 'ShareList',
  components: {
    HandleOrLike
  },
  data () {
    return {
      date: Date.now()
    }
  },
  computed: {
    formattedDate () {
      return transTimeStamp(this.date)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
