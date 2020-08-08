<template>
  <div class="container">
    <el-tabs class="tabs" tab-position="left">
      <el-tab-pane label="任务">
        <todo-list></todo-list>
      </el-tab-pane>
      <el-tab-pane label="日志">
        <log-list></log-list>
      </el-tab-pane>
      <el-tab-pane label="分享">
        <share-list></share-list>
      </el-tab-pane>
      <el-tab-pane label="编辑">
        <edit></edit>
      </el-tab-pane>
      <el-tab-pane label="我的">
        <user-info-form></user-info-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TodoList from '../components/TodoList'
import LogList from '../components/LogList'
import ShareList from '../components/ShareList'
import UserInfoForm from '../components/UserInfoForm'
import Edit from '../components/Edit'

export default {
  name: 'Index',
  components: {
    TodoList,
    LogList,
    ShareList,
    UserInfoForm,
    Edit
  }
}
</script>

<style lang="stylus" scoped>
.container
  margin-top 1.5rem
</style>
