<template>
  <div>
    <div style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="value"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['未完成', '已完成']"
        :button-texts="['到左边', '到右边']"
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
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc (h, option) {
        return <span>{option.key} - {option.label}</span>
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
