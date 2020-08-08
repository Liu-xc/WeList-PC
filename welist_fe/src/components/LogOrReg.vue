<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">登录 / 注册</el-button>

    <el-drawer :title="log ? '登录' : '注册'" :visible.sync="drawer" :direction="direction">
      <el-form status-icon ref="ruleForm" label-width="100px" class="form-container demo-ruleForm">
        <el-form-item label="用户名" prop="age">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-show="!log">
          <el-input type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">{{log ? '登录' : '注册'}}</el-button>
          <el-button>重置</el-button>
          <el-button type="text" @click="formToggle">{{log ? '去注册' : '去登录'}}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'LogOrReg',
  data () {
    return {
      drawer: false,
      direction: 'btt',
      log: true
    }
  },
  methods: {
    formToggle () {
      this.log = !this.log
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  padding 0 30%
</style>
