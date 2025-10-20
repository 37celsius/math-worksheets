<script setup>
  import { storeToRefs } from 'pinia'
  import { useWorksheetStore } from '@/stores/workSheetStore'

  // Initialize the store
  const store = useWorksheetStore()
  const { worksheetTitle, problems } = storeToRefs(store)

  const print = () => {
    window.print();
  }
</script>

<template>
  <section class="printable-worksheet">
    <header>
      <h2>{{ worksheetTitle }}</h2>
      <button @click="print" class="print-button">Print</button>
    </header>
    <ul>
      <li v-for="(problem, index) in problems" :key="index">
        {{ problem.num1 }}
        {{ problem.operator }}
        {{ problem.num2 }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
</style>
