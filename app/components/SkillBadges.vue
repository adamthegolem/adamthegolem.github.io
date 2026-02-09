<script setup lang="ts">
const info = useInfoStore()
const { t } = useLanguageStore()
const props = defineProps<{
  skills: string[],
  excludeSeeMore?: boolean,
}>()
</script>
<template>
  <div class="flex items-start gap-2 flex-wrap">
    <UPopover
      v-for="skill in info.idsToSkills(skills)"
      mode="click"
      :content="{
        align: 'start'
      }"
      arrow
    >
      <UBadge
        :icon="skill?.icon"
        :label="t(skill?.name)"
        color="neutral"
        variant="outline"
        class=" cursor-help"
      >
      </UBadge>
      <template #content>
        <!-- <div v-if="skill?.description" class="flex p-2 max-w-80 text-toned text-sm">
          <p>{{ t(skill?.description) }}</p>
        </div> -->
        <PopoverContainer :text="skill.description"></PopoverContainer>
      </template>
    </UPopover>
    <UButton v-if="excludeSeeMore" :label="t('See more||Se mere')" size="xs" variant="link" to="/about#tools" trailing-icon="i-lucide-arrow-right">
    </UButton>
  </div>
</template>