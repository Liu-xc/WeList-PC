<template>
  <div>
    <el-col :span="12" :offset="1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="座右铭">
          <el-col>
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col>
            <el-input type="email" v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="生日">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
export default {
  name: 'UserInfoForm',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
