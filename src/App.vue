<template>
  <div :class="$style['search-section']">
    <SearchBar v-model="searchQuery" :has-match="hasExactMatch" />
  </div>
  <div :class="$style['list-section']">
    <ListTodos :search-query="searchQuery" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ListTodos from '@/components/ListTodos.vue'
import { useTodoStore } from '@/store/index'

const store = useTodoStore()
const todos = computed(() => store.filteredTodos)
const searchQuery = ref('') // Define searchQuery

const hasExactMatch = computed(() => {
  return todos.value
    .map((i) => i.text.toLocaleLowerCase())
    .includes(searchQuery.value.toLocaleLowerCase())
})
</script>

<style lang="scss" module>
@use '@/sass/color.scss';
@import '@/sass/utils.scss';

.search-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: pxToRem(65px);
  margin-bottom: pxToRem(18px);

  height: pxToRem(60px);
}

.list-section {
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: pxToRem(262px);
}
</style>
