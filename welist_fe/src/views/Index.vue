<template>
  <div class="container">
    <el-tabs class="tabs" v-model="activeName" tab-position="left" @tab-click="handleTabClick">
      <el-tab-pane name="todo" label="任务">
        <todo-list></todo-list>
      </el-tab-pane>
      <el-tab-pane name="log" label="日志">
        <log-list></log-list>
      </el-tab-pane>
      <el-tab-pane name="share" label="分享">
        <share-list></share-list>
      </el-tab-pane>
      <el-tab-pane name="edit" label="编辑">
        <edit></edit>
      </el-tab-pane>
      <el-tab-pane name="mine" label="我的">
        <user-info-form></user-info-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import TodoList from '../components/TodoList'
import LogList from '../components/LogList'
import ShareList from '../components/ShareList'
import UserInfoForm from '../components/UserInfoForm'
import Edit from '../components/Edit'
import { overtime } from '../utils/handleTime'

export default {
  name: 'Index',
  data () {
    return {
      activeName: 'todo',
      lastClick: {
        todo: null,
        log: null,
        share: null,
        edit: null,
        mine: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    TodoList,
    LogList,
    ShareList,
    UserInfoForm,
    Edit
  },
  methods: {
    handleClickTodo () {
      /**
       * 点击这些tab时
       * 判断距离上一次有没有到预定的时间
       * 如果到了就要默认刷新
       * 否则不做动作
       * 在组件内部也应该允许用户主动刷新
      */
      console.log('todo')
      const st = this.lastClick.todo
      const et = Date.now()
      if (st) {
        const ot = overtime(st, et, 0.05)
        // localStorage.setItem()
        if (ot) {
          // 获取新的数据并保存到本地存储
          this._getTodoList()
        }
      } else {
        this._getTodoList()
      }
    },
    handleClickLog () {
      console.log('log')
    },
    handleClickShare () {
      console.log('share')
    },
    handleClickEdit () {
      console.log('edit')
    },
    handleClickMine () {
      console.log('mine')
    },
    handleTabClick () {
      switch (this.activeName) {
        case 'todo': {
          this.handleClickTodo()
          break
        }
        case 'log': {
          this.handleClickLog()
          break
        }
        case 'share': {
          this.handleClickShare()
          break
        }
        case 'edit': {
          this.handleClickEdit()
          break
        }
        case 'mine': {
          this.handleClickMine()
          break
        }
      }
    },
    _setUpdateTime (item) {
      this.lastClick[item] = Date.now()
    },
    _getTodoList () {
      axios.get('/todoList', {
        params: {
          uname: this.userInfo.uname
        }
      }).then((res) => {
        if (res === 200 || res.data) {
          const data = res.data
          this._setUpdateTime('todo')
          localStorage.setItem('todoList', data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  margin-top 1.5rem
</style>
