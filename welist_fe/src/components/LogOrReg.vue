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
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="form.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" v-show="!log">
          <el-input type="password" autocomplete="off" v-model="form.checkPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" v-show="log">登录</el-button>
          <el-button type="primary" @click="handleRegister" v-show="!log">注册</el-button>
          <el-button @click="resetForm('LoRForm')">重置</el-button>
          <el-button type="text" @click="formToggle">{{log ? '去注册' : '去登录'}}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkUsername, checkPass, recheckPass } from '../utils/validators.js'
import axios from 'axios'

export default {
  name: 'LogOrReg',
  data () {
    return {
      drawer: false,
      direction: 'btt',
      log: true,
      form: {
        uname: '',
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
    ...mapMutations([
      'changeLogStatus',
      'changeUserInfo'
    ]),
    formToggle () {
      this.log = !this.log
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleLogin () {
      axios.post('/login', {
        data: {
          uname: this.form.uname,
          password: this.form.password
        }
      }).then((res) => {
        if (res.status === 200) {
          this._logSuccess(res.data)
        }
      })
    },
    handleRegister () {
      axios.post('/register', {
        data: {
          uname: this.form.uname,
          password: this.form.password
        }
      }).then((res) => {
        if (res.status === 200) {
          this._logSuccess(res.data)
        }
      })
    },
    _logSuccess (data) {
      if (data) {
        this.changeLogStatus(true)
        this.changeUserInfo({
          uname: data.uname,
          motto: data.motto,
          email: data.email,
          birthday: data.birthday,
          sex: data.sex
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  padding 0 30%
</style>
