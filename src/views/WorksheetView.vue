<script setup>
  import AppHeader from '@/components/AppHeader.vue'
  import WorksheetSetting from '@/components/WorksheetSetting.vue'
  import AppFooter from '@/components/AppFooter.vue'
  import ListOfProblems from '@/components/ListOfProblems.vue'
  import { storeToRefs } from 'pinia'
  import { useWorksheetStore } from '@/stores/workSheetStore'

  // Initialize the store
  const store = useWorksheetStore()
  const { problems } = storeToRefs(store)

</script>

<template>
  <div class="wrapper-window">
    <AppHeader title="Math worksheet"/>
    <main class="wrapper-main">
      <WorksheetSetting />
      <ListOfProblems v-if="problems.length > 0" />
    </main>
    <AppFooter />
  </div>
</template>
