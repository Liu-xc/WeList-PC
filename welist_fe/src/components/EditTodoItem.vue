<template>
  <div>
    <message :msg="msg" ref="message"></message>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          align="left"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="重要等级">
        <el-select v-model="form.imptLevel" placeholder="请选择任务重要等级">
          <el-option label="!!!" value="3" class="impt-3"></el-option>
          <el-option label="!!" value="2" class="impt-2"></el-option>
          <el-option label="!" value="1" class="impt-1"></el-option>
          <el-option label="无" value="0" class="impt-0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Message from './Message'
export default {
  name: 'EditTodoItem',
  components: {
    Message
  },
  data () {
    return {
      form: {
        title: '',
        desc: '',
        imptLevel: '',
        date: ''
      },
      msg: {
        content: '',
        type: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    onSubmit () {
      const uname = this.userInfo.uname
      const title = this.form.title
      const desc = this.form.desc
      const stime = this.form.date[0].getTime()
      const ddl = this.form.date[1].getTime()
      const importance = this.form.imptLevel
      axios.post('/edit/todoitem', {
        data: {
          uname,
          title,
          desc,
          stime,
          ddl,
          importance
        }
      }).then(res => {
        if (res.status === 200) {
          this.form = {
            title: '',
            desc: '',
            imptLevel: '',
            date: ''
          }
          // 显示提示信息
          this.msg.content = '添加成功!'
          this.msg.type = 'success'
          this.$refs.message.open()
        }
      }).catch(() => {
        this.msg.content = '添加失败!'
        this.mes.type = 'warning'
        this.$refs.message.open()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.line
  text-align center
</style>
