<script setup>
  defineProps({
    title: {
      type: String,
      default: 'My Application'
    }
  });
</script>

<template>
  <header class="wrapper-content header-style">
    <h1 class="heading-one">{{ title }}</h1>
  </header>
</template>

<style scoped>
  .header-style {
    border-bottom: 2px solid var(--black);
    border-left: 4px solid var(--black);
    border-right: 4px solid var(--black);
    border-top: 4px solid var(--black);
    border-top-left-radius: var(--border-radius-regular);
    border-top-right-radius: var(--border-radius-regular);
  }

  .heading-one {
    font-size: 3.6rem;
  }

  @media only screen and (min-width: 1142px ) {
    .heading-one {
      font-size: 4.2rem;
    }
  }
</style>
