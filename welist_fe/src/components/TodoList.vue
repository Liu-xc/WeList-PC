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
        :data="list"
      >
        <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
      </el-transfer>
    </div>
    <todo-list-item></todo-list-item>
  </div>
</template>

<script>
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'todoList'
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
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-container
  margin-left 2rem
</style>
