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
        <el-button type="primary" @click="onSubmit">{{this.logItemToEdit ? '修改': '发布'}}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import Message from './Message'
export default {
  name: 'EditLogItem',
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
      'userInfo',
      'logItemToEdit'
    ])
  },
  watch: {
    logItemToEdit: function () {
      if (this.logItemToEdit) {
        this.form = {
          title: this.logItemToEdit.title,
          content: this.logItemToEdit.content
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'setLogList',
      'clearLogItemToEdit'
    ]),
    // 点击取消按钮
    onCancel () {
      // 如果是在修改状态下，就删除修改内容
      if (this.logItemToEdit) {
        this.clearLogItemToEdit()
      }

      this.form = {
        title: '',
        content: ''
      }
    },
    onSubmit () {
      // 判断logItemToEdit是不是Null
      // 如果不是Null就是修改接口patch
      // 否则为新增接口post
      const Method = this.logItemToEdit ? 'PATCH' : 'POST'
      const Text = this.logItemToEdit ? '修改' : '添加'
      // 添加不需要传id
      // 修改需要传id
      const data = {
        title: this.form.title,
        content: this.form.content,
        uname: this.userInfo.uname
      }
      if (this.logItemToEdit) {
        Object.assign(data, {
          logid: this.logItemToEdit.logid
        })
      }
      axios({
        method: Method,
        url: '/edit/logitem',
        data
      }).then(res => {
        if (res.status === 200) {
          this.form = {
            title: '',
            content: ''
          }
          // 显示提示信息
          this.msg.content = `${Text}成功！`
          this.msg.type = 'success'
          this.$refs.message.open()
          this.setLogList(res.data)
          if (this.logItemToEdit) {
            this.clearLogItemToEdit()
          }
        } else {
          this.msg.content = `${Text}失败！`
          this.msg.type = 'warning'
          this.$refs.message.open()
        }
      }).catch((err) => {
        console.log(err)
        this.clearLogItemToEdit()
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
