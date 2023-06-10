import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Todo, SortingType } from './types'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>(getLocalStorageItem('todos') || [])
  const sortingType = ref<SortingType>(
    (getLocalStorageItem('sortingType') as SortingType) || 'VALUE'
  )

  const getNextId = (): number => {
    const ids = todos.value.map((todo) => todo.id)
    const maxId = Math.max(...ids)
    return maxId + 1
  }

  const addTodo = (text: string) => {
    todos.value.push({
      id: getNextId(),
      text,
      addedAt: new Date()
    })
  }

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const filteredTodos = computed(() => {
    let sortedTodos = [...todos.value]
    const sortOptions = {
      VALUE: (a: Todo, b: Todo) => a.text.localeCompare(b.text),
      DATE: (a: Todo, b: Todo) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    }
    sortedTodos.sort(sortOptions[sortingType.value])
    return sortedTodos
  })

  const updateSortingType = (newSortingType: SortingType) => {
    sortingType.value = newSortingType
  }

  watch(
    [todos, sortingType],
    ([newTodos, newSortingType]) => {
      setLocalStorageItem('todos', newTodos)
      setLocalStorageItem('sortingType', newSortingType)
    },
    { deep: true }
  )

  return { todos, addTodo, deleteTodo, filteredTodos, sortingType, updateSortingType }
})
