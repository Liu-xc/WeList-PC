<template>
  <div>
    <el-col :span="12" :offset="1">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="座右铭" prop="motto">
          <el-col>
            <el-input type="text" v-model="form.motto"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-col>
            <el-input type="email" v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="生日">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { checkEmail } from '../utils/validators.js'

export default {
  name: 'UserInfoForm',
  data () {
    return {
      form: {
        motto: '',
        email: '',
        birthday: '',
        sex: ''
      },
      rules: {
        motto: [
          { max: 15, message: '最多15个字', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'changeUserInfo'
    ]),
    onSubmit () {
      axios.patch('/userinfo', {
        data: {
          uname: this.userInfo.uname,
          motto: this.form.motto,
          email: this.form.email,
          birthday: this.form.birthday.getTime(),
          sex: this.form.sex
        }
      }).then((res) => {
        if (res.status === 200) {
          const data = res.data
          this.changeUserInfo({
            uname: data.uname,
            motto: data.motto,
            email: data.email,
            birthday: data.birthday,
            sex: data.sex
          })
          this._setForm()
        }
      })
    },
    _setForm () {
      if (this.userInfo.birthday) {
        const ts = parseInt(this.userInfo.birthday.toString())
        this.form = Object.assign({}, this.userInfo)
        this.form.birthday = new Date(ts).toUTCString()
      } else {
        this.form = Object.assign({}, this.userInfo)
      }
    }
  },
  mounted () {
    this._setForm()
  }
}
</script>

<style lang="stylus" scoped></style>
