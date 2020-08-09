<template>
  <div class="hdl-or-like">
    <el-button
      :type="like ? 'warning' : 'info'"
      icon="el-icon-star-off"
      size="small"
      circle
      v-if="!author"
    ></el-button>
    <el-button type="primary" icon="el-icon-edit" size="small" circle v-if="author"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="small" circle v-if="author"></el-button>
  </div>
</template>

<script>
export default {
  name: 'HandleOrLike',
  props: {
    author: {
      type: Boolean,
      default: false
    },
    like: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.hdl-or-like
  display inline-block
  float right
  margin-top -30px
</style>
