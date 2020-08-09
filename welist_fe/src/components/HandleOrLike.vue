<template>
  <div class="hdl-or-like">
    <el-button
      :type="like ? 'warning' : 'info'"
      icon="el-icon-star-off"
      size="small"
      circle
      v-if="!author"
      @click="handleStarClick"
    ></el-button>
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="small"
      circle
      v-if="author"
      @click="handleEditClick"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="small"
      circle
      v-if="author"
      @click="handleDeleteClick"
    ></el-button>
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
  },
  methods: {
    // 触发父组件事件，传递分享ID
    handleStarClick (event) {
      this.$emit('toggleStar')
    },
    handleEditClick (event) {
      this.$emit('edit')
    },
    handleDeleteClick (event) {
      this.$emit('delete')
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
