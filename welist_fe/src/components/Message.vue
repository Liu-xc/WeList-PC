<template>
  <div v-show="false">
    <el-button :plain="true" @click="open">打开消息提示</el-button>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: {
      type: Object
    }
  },
  methods: {
    open () {
      this.$message({
        message: this.msg.content,
        type: this.msg.type
      })
    }
  }
}
</script>
