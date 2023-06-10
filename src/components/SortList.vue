<template>
  <div :class="$style['sorting-btns']">
    <button
      :class="[$style['sort-selected'], { [$style['sort-selected']]: sortOption === 'VALUE' }]"
      @click="setSortOption('VALUE')"
    >
      <div :class="$style['sort-text']">
        <span>Sort by <span :class="$style['value-sort']"> Value</span></span>
        <span :class="$style['value']" v-if="sortOption === 'VALUE'">•</span>
      </div>
    </button>
    <button
      :class="[$style['sort-selected'], { [$style['sort-selected']]: sortOption === 'DATE' }]"
      @click="setSortOption('DATE')"
    >
      <div :class="$style['sort-text']">
        <span>Sort by <span :class="$style['value-sort']"> Date</span></span>
        <span :class="$style['value']" v-if="sortOption === 'DATE'">•</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTodoStore } from '@/store/index'
import type { SortingType } from '@/store/types'

const store = useTodoStore()

const sortOption = ref<SortingType>(store.sortingType)

function setSortOption(option: SortingType) {
  sortOption.value = option
  store.updateSortingType(option)
}
</script>

<style lang="scss" module>
@use '@/sass/color.scss';
@import '@/sass/utils.scss';
.sort-selected {
  background-color: #ddd;
}

.sorting-btns {
  display: flex;
  margin-left: 62px;
  flex-direction: column;

  & button {
    width: pxToRem(200px);
    height: pxToRem(40px);
    border: none;
    background-color: white;
    border-radius: pxToRem(6px);
    &:hover {
      cursor: pointer;
    }

    &:nth-child(1) {
      margin-bottom: pxToRem(20px);
    }

    & span {
      color: color.$text-light;
    }

    & span.value-sort {
      color: color.$text;
    }

    & .sort-text {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      margin: pxToRem(10px) pxToRem(15px);
      & .value {
        font-size: pxToRem(20px);
        color: color.$green;
      }
    }
  }
}
</style>
