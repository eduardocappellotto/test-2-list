<template>
  <div
    :class="$style['todo-item']"
    class="cursor-pointer"
    @mouseover="hoveringTodo = true"
    @mouseleave="hoveringTodo = false"
  >
    <div :class="$style['left-info']">
      <CheckSVG v-if="exactMatch" :class="$style['icon-exact-match']" />
      <div>
        <span :class="$style['text-value']">{{ todo.text }}</span
        ><br />
        <span v-if="exactMatch" :class="$style['text-exact-match']"> Exact Match, &nbsp;</span>
        <span :class="$style['text-id']">#{{ todo.id }}</span>
      </div>
    </div>
    <div :class="$style['right-info']">
      <span :class="$style['item-addedAt']">{{ formatTime(todo.addedAt) }}</span>

      <button
        v-if="hoveringTodo"
        :class="$style['remove-button']"
        class="round red"
        @click="removeTodo"
      >
        <TrashSVG
          @mouseover="hoveringRemoveTodo = true"
          @mouseleave="hoveringRemoveTodo = false"
          :class="hoveringRemoveTodo ? 'red' : 'none'"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useTodoStore } from '@/store'

import TrashSVG from '@/components/icons/TrashSVG.vue'
import CheckSVG from '@/components/icons/CheckSVG.vue'

const store = useTodoStore()

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  exactMatch: {
    type: Boolean,
    required: true
  }
})

let timer = ref(null)
let hoveringTodo = ref(false)
let hoveringRemoveTodo = ref(false)

let formatTime = (date: number | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
let removeTodo = () => {
  store.deleteTodo(props.todo.id)
}

let isExactMatch = computed(() => {
  let filteredList = store.filteredTodos

  return filteredList[0].text === store.filterValue
})

let currentTime = computed(() => {
  return Date.now()
})

onMounted(() => {
  timer.value = setInterval(() => {
    // Force Vue to re-render the component
    currentTime.value = Date.now()
  }, 60000) // Update every minute
})

onUnmounted((): void => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" module>
@use '@/sass/color.scss';
@import '@/sass/utils.scss';

@keyframes slide-in-right {
  0% {
    transform: translateX(30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: pxToRem(800px);
  height: pxToRem(70px);

  &:hover {
    background-color: white;
  }

  & .left-info {
    display: flex;
    margin: pxToRem(20px) pxToRem(20px);

    .icon-exact-match {
      color: color.$green;
      margin: 0px pxToRem(23px);
    }
    & .text {
      &-value {
        font-size: pxToRem(14px);
        line-height: pxToRem(17px);
        color: color.$text;
      }
      &-id {
        font-size: pxToRem(12px);
        color: color.$text-light;
      }
      &-exact-match {
        font-size: pxToRem(12px);
        color: color.$green;
      }
    }
  }

  & .right-info {
    margin: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .item-addedAt {
      margin: pxToRem(20px) 1.175rem;
      font-size: pxToRem(13px);
      vertical-align: super;

      transition: transform 0.5s ease;
    }

    & .remove-button {
      margin-right: pxToRem(10px);
      border-radius: 50%;
      border: none;
      background-color: transparent;
      animation: slide-in-right 0.5s forwards;

      &:hover {
        cursor: pointer;
        background-color: color.$red;
      }
    }
  }
}
</style>
