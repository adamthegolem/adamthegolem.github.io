<script setup lang="ts">
const info = useInfoStore()
const { t } = useLanguageStore()
const props = defineProps<{
  items: {
    id?: string,
    name?: string,
    icon?: string,
    description?: string,
  }[],
  excludeSeeMore?: boolean,
  seeMoreTo?: string,
}>()
</script>
<template>
  <div class="flex items-start gap-2 flex-wrap">
    <UPopover
      v-for="item in items"
      mode="click"
      :content="{
        align: 'start'
      }"
      arrow
    >
      <UBadge
        :icon="item?.icon"
        :label="t(item?.name)"
        color="neutral"
        variant="outline"
        class=" cursor-help"
      >
      </UBadge>
      <template #content>
        <!-- <div v-if="skill?.description" class="flex p-2 max-w-80 text-toned text-sm">
          <p>{{ t(skill?.description) }}</p>
        </div> -->
        <PopoverContainer :text="item.description"></PopoverContainer>
      </template>
    </UPopover>
    <UButton v-if="!excludeSeeMore" :label="t('See more||Se mere')" size="xs" variant="link" :to="seeMoreTo" trailing-icon="i-lucide-arrow-right">
    </UButton>
  </div>
</template>