<script setup>
import { storeToRefs } from 'pinia'
import { useWorksheetStore } from '@/stores/workSheetStore'

// Initialize the store
const store = useWorksheetStore()

const { worksheetTitle, problems } = storeToRefs(store)
</script>

<template>
  <h2>{{ worksheetTitle }}</h2>
  <ul>
    <li v-for="(problem, index) in problems" :key="index">
      {{ problem.num1 }}
      {{ problem.operator }}
      {{ problem.num2 }}
    </li>
  </ul>
</template>
