<template>
  <div v-if="todos.length" :key="refreshToken" :class="$style['todo']">
    <div v-for="(todo, index) in todos" :key="index" :class="$style['-item']">
      <Todo :key="todo.id" :todo="todo" :exact-match="isExactMatch(todo)" />
    </div>
  </div>
  <SortList v-if="todos.length" />
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/store/index'
import Todo from '@/components/Todo.vue'
import { ref, computed, onMounted } from 'vue'
import SortList from '@/components/SortList.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true
  }
})
const store = useTodoStore()
const todos = computed(() => {
    return store.filteredTodos.filter((todo) => {
      if (!props.searchQuery || props.searchQuery.trim() === '') {
        return true // If searchQuery is empty, don't filter out any todos
      }
      // If searchQuery is not empty, only include todos where the todo text includes the searchQuery
      return todo.text.toLowerCase().includes(props.searchQuery.toLowerCase())
    })
  }),
  refreshToken = ref('')

const isExactMatch = (todo: { text: string }) => {
  if (!props.searchQuery || props.searchQuery.trim() === '') {
    return false
  }
  return todo.text.toLocaleLowerCase() === props.searchQuery.toLocaleLowerCase()
}

let refresher = 0

const refresh = () => {
  refresher = (refresher + 1) % 1000
  refreshToken.value = 'key' + refresher
  setTimeout(refresh, 5000)
}

onMounted(() => {
  refresh()
})
</script>

<style module lang="scss">
@use '@/sass/color.scss';
@import '@/sass/utils.scss';

.todo {
  max-width: pxToRem(800px);
  width: 100%;
  &-item {
    border-bottom: pxToRem(1px) solid #e9ecef;
    width: 100%;
  }
}
</style>
