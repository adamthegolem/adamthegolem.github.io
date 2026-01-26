<script setup lang="ts">
const props = defineProps<{
  text?: string
}>()
</script>
<template>
  <UPopover
    mode="hover"
    arrow
    :content="{
      align: 'center'
    }"
    :ui="{
                  content: ' bg-default/0 '
                }"
  >
    <slot></slot>
    <template #content>
      <span class=" text-xs px-2.5 py-1">{{ text }}</span>
    </template>
  </UPopover>
</template>