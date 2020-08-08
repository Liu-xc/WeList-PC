<template>
  <div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <handle-or-like></handle-or-like>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
          <handle-or-like></handle-or-like>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
          <handle-or-like></handle-or-like>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import HandleOrLike from './HandleOrLike'
export default {
  name: 'ShareList',
  components: {
    HandleOrLike
  }
}
</script>

<style lang="stylus" scoped></style>
