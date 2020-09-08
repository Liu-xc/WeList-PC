<template>
  <div>
    <message :msg="msg" ref="message"></message>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">分享</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Message from './Message'
export default {
  name: 'EditShareItem',
  components: {
    Message
  },
  data () {
    return {
      msg: {
        content: '',
        type: ''
      },
      form: {
        title: '',
        content: ''
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
      axios.post('/edit/shareitem', {
        data: {
          title: this.form.title,
          content: this.form.content,
          uname: this.userInfo.uname
        }
      }).then(res => {
        if (res.status === 200) {
          this.form = {
            title: '',
            content: ''
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

<style lang="stylus" scoped></style>
