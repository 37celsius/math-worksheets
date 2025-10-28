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
  <section class="wrapper-content printable-worksheet list-of-problems-style">
    <header class="wrapper-header">
      <h2 class="heading-two ">{{ worksheetTitle }}</h2>
      <button @click="print" class="print-button button">Print</button>
    </header>
    <ul class="problems-list">
      <li class="problems-content" v-for="(problem, index) in problems" :key="index">
        <div class="content-number">{{ problem.num1 }}</div>
        <div class="content-operator">
          <template v-if="problem.operator === '-'">
            <div class="content-operator--minus"></div>
          </template>
          <template v-else>
            {{ problem.operator }}
          </template>
        </div>
        <div class="content-number">{{ problem.num2 }}</div>
        <div class="content-operator">=</div>
        <div class="content-number">&nbsp;</div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
  .list-of-problems-style {
    border: 4px solid var(--black);
    border-top: 0rem;
    border-bottom-left-radius: var(--border-radius-regular);
    border-bottom-right-radius: var(--border-radius-regular);
  }

  .heading-two {
    font-size: 2.4rem;
    margin-bottom: 0.2rem;
    margin-right: 1.6rem;
  }

  .wrapper-header {
    align-items: center;
    display: flex;
    margin-bottom: 2.4rem;
    justify-content: space-between;
    width: 100%;
  }

  .problems-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 2.8rem;
    column-gap: 4.2rem;
    list-style: none;
    padding: 0rem;
    margin-bottom: 2.4rem;
  }

  .problems-content {
    display: flex;
    align-items: center;
  }

  .content-number {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 5.4rem;
    width: 6rem;
    border: 1px solid var(--grey-600);
    border-radius: var(--border-radius-small);
    font-weight: 700;
    font-size: 1.8rem;
  }

  .content-number:last-child {
    flex: 1;
  }

  .content-operator {
    font-size: 3.2rem;
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    width: 1.8rem;
    display: flex;
    justify-content: center;
  }

  .content-operator--minus {
    width: 80%;
    height: 0.3rem;
    background-color: var(--black);
    border-radius: 4px;
  }

  @media only screen and (min-width: 768px) {
    .problems-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (min-width: 1142px) {
    .problems-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
