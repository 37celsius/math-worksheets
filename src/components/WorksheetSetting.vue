<script setup>
import { storeToRefs } from 'pinia'
import { useWorksheetStore } from '@/stores/workSheetStore'
import SettingsButton from '@/components/SettingsButton.vue'

// Initialize the store
const store = useWorksheetStore()

const { selectedOperation, defaultNumberOfProblems, maxNumber, problems } = storeToRefs(store)
/*
** NOTE
Using v-model in select set the default.
create a two-way data binding between the dropdown and a variable
v-model handles both updating your data when the user makes a
selection and setting the dropdown's initial state from your data, all in one step.
*/
</script>

<template>
  <div class="wrapper-content worksheet-setting-style" :class="{'worksheet-setting-style--has-problems': problems.length > 0 }">
    <div class="wrapper-setting-form">
      <div class="wrapper-form-group wrapper-setting-content">
        <label for="operation" class="text-info setting-label">Operation type</label>
        <div class="wrapper-select">
          <select class="setting-select" id="operation" v-model="selectedOperation" @change="store.onOperationChange">
            <option
              v-for="(operationName, key) in store.PROBLEM_TYPE"
              :key="key"
              :value="operationName"
            >
              {{ operationName.toLowerCase() }}
            </option>
          </select>
        </div>
      </div>

      <div class="wrapper-tablet-desktop">
        <div class="wrapper-setting-content">
          <div class="wrapper-setting-text">
            <span class="text-info">Number of problems</span> <div class="input-text">{{ defaultNumberOfProblems }}</div>
          </div>

          <div class="wrapper-buttons">
            <SettingsButton label="Add one" icon="plus" @handle-click="store.incrementNumberOfProblems" />
            <SettingsButton label="Minus one" icon="minus" @handle-click="store.decrementNumberOfProblems" />
          </div>
        </div>

        <div class="wrapper-setting-content">
          <div class="wrapper-setting-text">
            <span class="text-info">Highest number</span> <div class="input-text">{{ maxNumber }}</div>
          </div>

          <div class="wrapper-buttons">
            <SettingsButton label="Add one" icon="plus" @handle-click="store.incrementMaxNumber" />
            <SettingsButton label="Minus one" icon="minus" @handle-click="store.decrementMaxNumber" />
          </div>
        </div>

        <div class="wrapper-generate-button">
          <button class="button setting-button-generate" @click="store.generateProblems">Generate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .worksheet-setting-style {
    border-bottom: 4px solid var(--black);
    border-left: 4px solid var(--black);
    border-right: 4px solid var(--black);
    border-bottom-left-radius: var(--border-radius-regular);
    border-bottom-right-radius: var(--border-radius-regular);
    display: flex;
    flex-direction: column;
  }

  .worksheet-setting-style.worksheet-setting-style--has-problems {
    border-bottom-width: 2px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .wrapper-setting-form {
    display: flex;
    flex-direction: column;
  }

  .text-info {
    font-size: 1.8rem;
  }

  .wrapper-setting-content {
    padding-bottom: 0.8rem;
    padding-top: 0.8rem;
    border-bottom: 1px dotted var(--grey-550);
    margin-bottom: 0.8rem;
  }

  .wrapper-buttons,
  .wrapper-select {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .wrapper-setting-text {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
  }

  .input-text {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 4.2rem;
    width: 8rem;
    border: 1px solid var(--grey-600);
    margin-left: auto;
    background-color: var(--pigeon-post-100);
    border-radius: var(--border-radius-small);
    font-weight: 700;
    font-size: 1.8rem;
  }

  .setting-select {
    width: 100%;
    height: 4.2rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    text-transform: capitalize;
    font-size: 1.8rem;
    font-weight: 700;
    border: 2px solid var(--grey-600);
    border-radius: var(--border-radius-small);
    display: flex;
    align-items: center;
  }

  .setting-label {
    display: block;
    margin-bottom: 0.8rem;
  }

  .setting-button-generate {
    background-color: var(--emerald-400);
    color: var(--emerald-950);
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    .setting-button-generate:hover {
      background-color: var(--emerald-950);
      color: var(--emerald-400);
    }
  }

  @media only screen and (min-width: 1142px) {
    .wrapper-form-group {
      flex: 1;
    }

    .wrapper-tablet-desktop {
      align-items: center;
      display: flex;
    }

    .worksheet-setting-style {
      flex-direction: row;
    }

    .wrapper-setting-form {
      flex-direction: row;
      width: 100%;
    }

    .wrapper-setting-content {
      padding-bottom: 0.8rem;
      padding-right: 2rem;
      padding-top: 0.8rem;
      border: 0rem;
      margin-bottom: 0rem;
      display: flex;
    }

    .wrapper-setting-content:last-child {
      padding-right: 0rem;
    }

    .wrapper-setting-text {
      margin-bottom: 0rem;
      margin-right: 0.8rem;
    }

    .wrapper-buttons {
      justify-content: flex-start;
      width: auto;
    }

    .wrapper-select {
      flex: 1;
    }

    .text-info {
      margin-right: 0.8rem;
    }

    .setting-label {
      margin-bottom: 0rem;
      display: flex;
      align-items: center;
    }

    .input-text {
      width: 5.6rem;
    }
  }
</style>
