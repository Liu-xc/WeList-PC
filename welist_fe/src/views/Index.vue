<template>
  <div class="container">
    <el-tabs class="tabs" v-model="activeName" tab-position="left" @tab-click="handleTabClick">
      <el-tab-pane name="todo" label="任务">
        <todo-list></todo-list>
      </el-tab-pane>
      <el-tab-pane name="log" label="日志">
        <log-list @editLog="handleEditLog"></log-list>
      </el-tab-pane>
      <el-tab-pane name="share" label="分享">
        <share-list @editShare="handleEditShare"></share-list>
      </el-tab-pane>
      <el-tab-pane name="edit" label="编辑">
        <edit :activename="editTabActiveName"></edit>
      </el-tab-pane>
      <el-tab-pane name="mine" label="我的">
        <user-info-form></user-info-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
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
      editTabActiveName: '',
      activeName: 'todo',
      lastClick: {
        todo: null,
        log: null,
        share: null,
        edit: null,
        mine: null
      },
      refreshIndent: 0.05
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
  mounted () {
    this.handleClickTodo()
  },
  methods: {
    ...mapMutations([
      'setLogList',
      'setTodoList',
      'setShareList',
      'setShareItemToEdit',
      'setLogItemToEdit'
    ]),
    handleClickTodo () {
      /**
       * 点击这些tab时
       * 判断距离上一次有没有到预定的时间
       * 如果到了就要默认刷新
       * 否则不做动作
       * 在组件内部也应该允许用户主动刷新
      */
      const st = this.lastClick.todo
      const et = Date.now()
      if (st) {
        const ot = overtime(st, et, this.refreshIndent)
        if (ot) {
          // 获取新的数据并保存到本地存储
          this._getTodoList()
        }
      } else {
        this._getTodoList()
      }
    },
    handleClickLog () {
      const st = this.lastClick.log
      const et = Date.now()
      if (st) {
        const ot = overtime(st, et, this.refreshIndent)
        if (ot) {
          // 获取新的数据并保存到本地存储
          this._getLogList()
        }
      } else {
        this._getLogList()
      }
    },
    handleClickShare () {
      this._getShareList()

      // const st = this.lastClick.share
      // const et = Date.now()
      // if (st) {
      //   const ot = overtime(st, et, this.refreshIndent)
      //   if (ot) {
      //     // 获取新的数据并保存到本地存储
      //     this._getShareList()
      //   }
      // } else {
      //   this._getShareList()
      // }
    },
    handleClickEdit () {
    },
    handleClickMine () {
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
          // this.handleClickShare()
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
    handleEditShare (shareid) {
      this.setShareItemToEdit(shareid)
      this.editTabActiveName = 'share'
      this.activeName = 'edit'
    },
    handleEditLog (logid) {
      this.setLogItemToEdit(logid)
      this.editTabActiveName = 'log'
      this.activeName = 'edit'
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
          this.setTodoList(data)
        }
      })
    },
    _getLogList () {
      axios.get('/dailyLog', {
        params: {
          uname: this.userInfo.uname
        }
      }).then((res) => {
        if (res === 200 || res.data) {
          const data = res.data
          this._setUpdateTime('log')
          this.setLogList(data)
        }
      })
    },
    _getShareList () {
      axios.get('/share').then((res) => {
        if (res === 200 || res.data) {
          const data = res.data
          this._setUpdateTime('share')
          this.setShareList(data)
          // console.log(data, 'index')
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
