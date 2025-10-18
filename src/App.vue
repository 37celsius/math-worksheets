<script setup>
import { storeToRefs } from 'pinia'
import { useWorksheetStore } from '@/stores/workSheetStore'

// Initialize the store
const store = useWorksheetStore()

const { worksheetTitle, selectedOperation, defaultNumberOfProblems } = storeToRefs(store)
/*
** NOTE
Using v-model in select set the default.
create a two-way data binding between the dropdown and a variable
v-model handles both updating your data when the user makes a
selection and setting the dropdown's initial state from your data, all in one step.
*/
</script>

<template>
  <div>
    <h1>You did it!</h1>
    <div class="form-group">
      <label for="operation">Operation:</label>
      <select id="operation" v-model="selectedOperation">
        <option
          v-for="(operationName, key) in store.PROBLEM_TYPE"
          :key="key"
          :value="operationName"
        >
          {{ operationName.toLowerCase() }}
        </option>
      </select>
    </div>

    <div>
      {{ defaultNumberOfProblems }}
      <button @click="store.incrementNumberOfProblems">up</button>
      <button @click="store.decrementNumberOfProblems">down</button>
    </div>
  </div>
  {{ worksheetTitle }}
</template>

<style scoped></style>
