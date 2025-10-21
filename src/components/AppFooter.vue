<script setup>
 const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="wrapper-content footer">&copy; {{ currentYear }} &mdash; Made with <a class="footer-link" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a></footer>
</template>

<style scoped>
  .footer {
    text-align: center;
    font-size: 1.4rem;
  }

  .footer-link {
    color: var(--picton-blue-400);
    font-weight: 700;
  }

  @media (hover: hover) and (pointer: fine) {


    .footer-link:hover {
      color: var(--black);
    }
  }
</style>
