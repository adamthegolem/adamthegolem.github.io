<script setup lang="ts">
const props = defineProps<{
  text: string,
}>()
</script>
<template>
  <p class="[&_.iconify]:align-middle [&_.iconify]:size-5 *:text-highlighted ">
    <template v-for="part in text.split(' ')">
      {{ part }}
    </template>
  </p>
</template>