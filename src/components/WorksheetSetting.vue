<script setup>
import { storeToRefs } from 'pinia'
import { useWorksheetStore } from '@/stores/workSheetStore'

// Initialize the store
const store = useWorksheetStore()

const { selectedOperation, defaultNumberOfProblems, maxNumber } = storeToRefs(store)
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
    <div class="form-group">
      <label for="operation">Operation:</label>
      <select id="operation" v-model="selectedOperation" @change="store.onOperationChange">
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

    <div>
      Max number: {{ maxNumber }}
      <button @click="store.incrementMaxNumber">up</button>
      <button @click="store.decrementMaxNumber">down</button>
    </div>

    <div>
      <button @click="store.generateProblems">generate</button>
    </div>
  </div>
</template>

<style scoped></style>
