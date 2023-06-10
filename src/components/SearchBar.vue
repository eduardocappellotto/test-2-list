<template>
  <div :class="$style['search-bar']" @keydown.esc="clearQuery" @keydown.enter="addItem">
    <input
      v-model="searchQuery"
      type="text"
      :class="$style['search-input']"
      placeholder="Search or Add..."
    />
    <div v-show="!isEmptyQuery" :class="$style['search-buttons']">
      <button class="round red" @click="clearQuery">
        <CancelIcon></CancelIcon>
      </button>
      <button class="round green" :disabled="hasMatch" @click="addItem">
        <AddIcon></AddIcon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/store/index'
import CancelIcon from '@/components/icons/CancelSVG.vue'
import AddIcon from '@/components/icons/AddSVG.vue'
const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    hasMatch: {
      type: Boolean,
      default: false
    }
  }),
  todosStore = useTodoStore()
const emit = defineEmits(['update:modelValue'])
const searchQuery = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  }),
  isEmptyQuery = computed(() => {
    return searchQuery.value === ''
  })
const clearQuery = () => {
  searchQuery.value = ''
}
const addItem = () => {
  if (isEmptyQuery.value || props.hasMatch) {
    return
  }
  todosStore.addTodo(searchQuery.value)
  clearQuery()
}
</script>

<style lang="scss" module>
@use '@/sass/color.scss';
@import '@/sass/utils.scss';
.search {
  &-bar {
    min-width: 30%;
    display: flex;
    width: 100%;
    max-width: pxToRem(800px);
    background-color: color.$search-bg;
    border-radius: pxToRem(6px);
  }
  &-input {
    width: 100%;
    color: color.$text;
    background-color: color.$search-bg;

    border: none;
    border-radius: pxToRem(6px);
    padding: pxToRem(22px) pxToRem(20px);

    &:focus:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: color.$search-placeholder-text;
    }
  }

  &-buttons {
    display: flex;
    margin: pxToRem(6px) pxToRem(10px);
  }
}
</style>
