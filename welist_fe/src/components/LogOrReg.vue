<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">登录 / 注册</el-button>

    <el-drawer :title="log ? '登录' : '注册'" :visible.sync="drawer" :direction="direction">
      <el-form
        status-icon
        ref="LoRForm"
        :model="form"
        label-width="100px"
        :rules="rules"
        class="form-container demo-ruleForm"
      >
        <el-form-item label="用户名" prop="uid">
          <el-input v-model="form.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" v-show="!log">
          <el-input type="password" autocomplete="off" v-model="form.checkPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">{{log ? '登录' : '注册'}}</el-button>
          <el-button @click="resetForm('LoRForm')">重置</el-button>
          <el-button type="text" @click="formToggle">{{log ? '去注册' : '去登录'}}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { checkUsername, checkPass, recheckPass } from '../utils/validators.js'
export default {
  name: 'LogOrReg',
  data () {
    return {
      drawer: false,
      direction: 'btt',
      log: true,
      form: {
        uid: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        uid: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: recheckPass(this), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    formToggle () {
      this.log = !this.log
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  padding 0 30%
</style>
