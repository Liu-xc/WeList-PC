<template>
  <div>
    <div style="text-align: center">
      <el-transfer
        class="transfer"
        v-model="value"
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
        :data="data"
      >
        <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
      </el-transfer>
    </div>
    <todo-list-item></todo-list-item>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem'
export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  data () {
    return {
      data: [{
        key: 0,
        label: '洗碗'
      },
      {
        key: 1,
        label: '扫地'
      },
      {
        key: 2,
        label: '洗衣服'
      }],
      value: [],
      renderFunc (h, option) {
        return <span class="">{option.label}</span>
      }
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
