<template>
  <div>
    <div style="text-align: center">
      <el-transfer
        class="transfer"
        v-model="doneList"
        filterable
        style="text-align: left; display: inline-block"
        :render-content="renderFunc"
        :titles="['未完成', '已完成']"
        :button-texts="['撤销', '完成']"
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
        @change="handleChange"
        @left-check-change="handleLeftCheck"
        @right-check-change="handleRightChek"
        :data="list"
      >
        <el-button
          class="transfer-footer"
          type="danger"
          slot="left-footer"
          size="small"
          plain
          @click="leftDelete"
        >删除</el-button>
        <el-button
          class="transfer-footer"
          type="danger"
          slot="right-footer"
          size="small"
          plain
          @click="rightDelete"
        >删除</el-button>
      </el-transfer>
    </div>
    <todo-list-item></todo-list-item>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import TodoListItem from './TodoListItem'
export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  data () {
    return {
      list: [],
      doneList: [],
      renderFunc (h, option) {
        return <span class="">{option.label}</span>
      },
      leftChecked: [],
      rightChecked: []
    }
  },
  computed: {
    ...mapGetters([
      'todoList',
      'userInfo'
    ])
  },
  watch: {
    todoList: function () {
      const len = this.todoList.length
      const undoneList = []
      const doneList = []

      for (let i = 0; i < len; i++) {
        if (this.todoList[i].done) {
          doneList.push(i)
        }
        undoneList.push({
          key: i,
          label: this.todoList[i].title
        })
      }

      this.list = undoneList
      this.doneList = doneList
    }
  },
  methods: {
    handleLeftCheck (value) {
      const len = value.length
      this.leftChecked = []
      for (let i = 0; i < len; i++) {
        this.leftChecked.push(this.todoList[value[i]])
      }
    },
    handleRightChek (value) {
      const len = value.length
      this.rightChecked = []
      for (let i = 0; i < len; i++) {
        this.rightChecked.push(this.todoList[value[i]])
      }
    },
    leftDelete () {
      // 将leftchecked中的项删除
      console.log(this.leftChecked)
    },
    rightDelete () {
      // 将rightchecked中的项删除
      console.log(this.rightChecked)
    },
    handleChange (value, direction, movedKeys) {
      // 判断移动方向（left是取消完成，right是完成）
      // 获取movedKeys
      // 获取移动的项，并在数据库中修改其状态
      const movedList = this._getMovedItems(movedKeys)
      const len = movedList.length
      const action = direction === 'right' ? 1 : 0

      if (direction === 'right') {
        // 完成
        for (let i = 0; i < len; i++) {
          movedList[i].done = 1
        }
      } else if (direction === 'left') {
        // 取消完成
        for (let i = 0; i < len; i++) {
          movedList[i].done = 0
        }
      }

      axios.post('/changeTodoStatus', {
        data: {
          movedList,
          action,
          uname: this.userInfo.uname
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 获取包含被修改的项的列表
    _getMovedItems (movedKeys) {
      const movedList = []
      const len = movedKeys.length
      for (let i = 0; i < len; i++) {
        const index = movedKeys[i]
        movedList.push(this.todoList[index])
      }
      return movedList
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-container
  margin-left 2rem
</style>
