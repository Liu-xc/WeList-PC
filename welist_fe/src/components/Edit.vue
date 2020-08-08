<template>
  <div class="edit-container">
    <el-tabs type="card">
      <el-tab-pane label="任务">
        <edit-todo-item></edit-todo-item>
      </el-tab-pane>
      <el-tab-pane label="日志">
        <edit-log-item></edit-log-item>
      </el-tab-pane>
      <el-tab-pane label="分享">
        <edit-share-item></edit-share-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EditTodoItem from './EditTodoItem'
import EditLogItem from './EditLogItem'
import EditShareItem from './EditShareItem'

export default {
  name: 'Edit',
  components: {
    EditTodoItem,
    EditLogItem,
    EditShareItem
  }
}
</script>

<style lang="stylus" scoped>
.edit-container
  margin-left 2rem
</style>
