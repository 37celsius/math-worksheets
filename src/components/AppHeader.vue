<script setup>
  defineProps({
    title: {
      type: String,
      default: 'My Application'
    }
  });
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped></style>
