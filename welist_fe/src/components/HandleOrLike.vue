<template>
  <div class="hdl-or-like">
    <el-button type="info" icon="el-icon-star-off" size="small" circle></el-button>
    <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
  </div>
</template>

<script>
export default {
  name: 'HandleOrLike'
}
</script>

<style lang="stylus" scoped>
.hdl-or-like
  display inline-block
  float right
  margin-top -30px
</style>
