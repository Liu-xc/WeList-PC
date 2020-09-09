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
        <el-button type="primary" @click="onSubmit">{{this.shareItemToEdit ? '修改': '分享'}}</el-button>
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
      'userInfo',
      'shareItemToEdit'
    ])
  },
  mounted () {

  },
  watch: {
    shareItemToEdit: function () {
      if (this.shareItemToEdit) {
        this.form = {
          title: this.shareItemToEdit.title,
          content: this.shareItemToEdit.content
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'setShareList',
      'clearShareItemToEdit'
    ]),
    // 点击取消按钮
    onCancel () {
      // 如果是在修改状态下，就删除修改内容
      if (this.shareItemToEdit) {
        this.clearShareItemToEdit()
      }

      this.form = {
        title: '',
        content: ''
      }
    },
    onSubmit () {
      // 判断shareItemToEdit是不是Null
      // 如果不是Null就是修改接口patch
      // 否则为新增接口post
      const Method = this.shareItemToEdit ? 'PATCH' : 'POST'
      const Text = this.shareItemToEdit ? '修改' : '添加'
      // 添加不需要传id
      // 修改需要传id
      const data = {
        title: this.form.title,
        content: this.form.content,
        uname: this.userInfo.uname
      }
      if (this.shareItemToEdit) {
        Object.assign(data, {
          shareid: this.shareItemToEdit.shareid
        })
      }
      // 发起请求
      axios({
        method: Method,
        url: '/edit/shareitem',
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
          this.setShareList(res.data)
          if (this.shareItemToEdit) {
            this.clearShareItemToEdit()
          }
        }
      }).catch(() => {
        this.msg.content = `${Text}失败！`
        this.mes.type = 'warning'
        this.$refs.message.open()
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
