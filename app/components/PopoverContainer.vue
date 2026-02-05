<script lang="ts" setup>
const props = defineProps<{
  text?: string
}>()
const { t } = useLanguageStore()
</script>
<template>
  <div class="flex p-2 max-w-80 text-toned text-sm">
    <p v-if="text && !$slots.default">{{ t(text) }}</p>
    <slot></slot>
  </div>
</template>