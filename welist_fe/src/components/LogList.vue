<template>
  <div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <handle-or-like @toggleStar="handleToggleStar"></handle-or-like>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <handle-or-like @edit="handleEdit" @delete="handleDelete" :author="true"></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <log-list-item></log-list-item>
  </div>
</template>

<script>
import LogListItem from './LogListItem'
import HandleOrLike from './HandleOrLike'
import TransTimeStamp from '../utils/transTimeStamp.js'

export default {
  name: 'LogList',
  components: {
    LogListItem,
    HandleOrLike
  },
  mounted () {
    TransTimeStamp(Date.now())
  },
  methods: {
    handleToggleStar () {
      console.log('star')
    },
    handleEdit () {
      console.log('edit')
    },
    handleDelete () {
      console.log('delete')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
