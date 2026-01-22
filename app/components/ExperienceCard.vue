<script setup lang="ts">
const langStore = useLanguageStore()
const {t} = langStore
const props = defineProps<{
  title?: string,
  description?: string,
  icon?: string,
  timeSpan?: string,
  location?: string,
  locationIcon?: string,
  readMore?: string,
}>()
const {locationIcon = "i-lucide-map-pin"} = props;
</script>
<template>
  <UPageCard
    :title="t(title)"
    class=" flex-1"
    :description="t(description)"
    :ui="{
      footer: 'w-full flex flex-col gap-3'
    }"
  >
    <template #header>
      <div class=" flex gap-3">
        <UIcon :name="icon" class=" size-6 text-primary"></UIcon>
        <UBadge v-if="timeSpan" icon="i-lucide-calendar" variant="soft" color="neutral">{{ t(timeSpan) }}</UBadge>
      </div>
    </template>
    <template #description>
      <p>{{ t(description) }}</p>
      <slot name="ps"></slot>
    </template>
    <template #footer>
      <UBadge v-if="location" :icon="locationIcon" variant="subtle" class="self-start">{{ t(location) }}</UBadge>
      <template v-if="readMore">
        <USeparator></USeparator>
        <UButton
          trailing-icon="i-lucide-arrow-down"
          :label="t('Read more||Læs mere')"
          class=" self-center"
          :to="readMore"
          variant="link"
          color="neutral"
        >
        </UButton>
      </template>
    </template>
    <!-- <img :src="item.image" class=" rounded"> -->
  </UPageCard>
</template>