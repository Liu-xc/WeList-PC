<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'EditLogItem',
  data () {
    return {
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
      axios.post('/edit/logitem', {
        data: {
          title: this.form.title,
          content: this.form.content,
          uname: this.userInfo.uname
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
