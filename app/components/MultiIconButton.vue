<script setup lang="ts">
const props = defineProps<{
  label: string,
  icons: {
    icon: string,
    to?: string,
    exclude?: boolean
  }[],
  to?: string,
  size?: "xl" | "xs" | "sm" | "md" | "lg" | undefined,
  color?: "neutral" | "primary" | "secondary" | "success" | "info" | "warning" | "error" | undefined,
}>();
const {color = "neutral"} = props;
const icons = computed(() => props.icons.filter(({exclude}) => !exclude));
</script>
<template>
  <UFieldGroup>
    <UButton
      :size="size"
      :label="label"
      variant="subtle"
      target="_blank"
      :to="to || icons[0]?.to"
      :color="color"
    ></UButton>
    <template v-for="icon in icons">
      <UButton
        :size="size"
        :icon="icon.icon"
        variant="outline"
        target="_blank"
        :to="icon.to"
        color="neutral"
      >
      </UButton>
    </template>
  </UFieldGroup>
</template>