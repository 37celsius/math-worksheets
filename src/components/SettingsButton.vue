<script setup>
  import { RiAddLine } from '@remixicon/vue'
  import { RiSubtractLine } from '@remixicon/vue'
  defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "plus",
    }
  });

  defineEmits(['handleClick']);
</script>

<template>
  <button class="button setting-button" @click="$emit('handleClick')">
    <span class="wrapper-button-icon">
      <template v-if="icon === 'plus'">
        <RiAddLine className="icon" size="18px" />
      </template>
      <template v-else>
        <RiSubtractLine className="icon" size="18px" />
      </template>
    </span>
    <span class="wrapper-button-text">{{ label }}</span>
  </button>
</template>

<style scoped>
  .wrapper-button-icon {
    background-color: var(--bluemine-900);
    border-radius: var(--border-radius-small);
    display: flex;
    padding: 0.2rem;
    margin-right: 0.8rem;

    .icon {
      fill: var(--white);
    }
  }

  .setting-button {
    border: 1px solid var(--bluemine-900);
    color: var(--bluemine-900);
    background: transparent;
    padding-left: 0.8rem;
    width: 49%;
  }

  .setting-button:last-child {
    margin-right: 0rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .setting-button:hover {
      background-color: var(--white);

      .wrapper-button-icon {
        .icon {
          fill: var(--black);
        }
      }
    }
  }

  @media only screen and (min-width: 1142px ) {
    .setting-button {
      width: 4.2rem;
      padding-right: 0.8rem;
      margin-right: 0.4rem;
      justify-content: center;
      background-color: var(--bluemine-900);
      border-color: var(--black);
    }

    .wrapper-button-icon {
      background-color: transparent;
      margin-right: 0rem;
    }

    .setting-button:last-child {
      margin-right: 0rem;
    }

    .wrapper-button-text {
      display: none;
    }
  }
</style>
