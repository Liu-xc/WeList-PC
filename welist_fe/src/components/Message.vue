<template>
  <div>
    <el-button :plain="true" @click="open">打开消息提示</el-button>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: ''
  },
  methods: {
    open () {
      this.$message(this.msg)
    }
  }
}
</script>