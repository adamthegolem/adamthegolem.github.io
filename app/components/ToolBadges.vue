<script setup lang="ts">
const info = useInfoStore()
const { t } = useLanguageStore()
const props = defineProps<{
  tools: string[],
  excludeSeeMore?: boolean,
}>()
</script>
<template>
  <BadgeList :items="info.idsToTools(tools)" see-more-to="/about#tools"></BadgeList>
</template>