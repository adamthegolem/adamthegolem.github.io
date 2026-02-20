<script setup lang="ts">
const props = defineProps<{
  icon: string,
  label: string,
  value: number,
  changeValues?: [number, number],
}>()
const { changeValues = [0.5, 0.7] } = props
const { t } = useLanguageStore()
const weight = defineModel<number>("weight", {required: false})
const color = computed(() => {
  if (weight.value == 0 || Number.isNaN(props.value)) return 'neutral' as const
  if (props.value >= changeValues[1]) return 'success' as const
  if (props.value >= changeValues[0]) return 'warning' as const
  return 'error' as const
})
const label = computed(() => !Number.isNaN(props.value) ? `${Math.max(Math.round(props.value * 100), 0)}%` : undefined)
</script>
<template>
  <UPopover
    v-if="weight != undefined"
    arrow
  >
    <UButton
      :label="weight > 0 ? label : undefined"
      variant="subtle"
      :icon="icon"
      :color="color"
      class="justify-center data-[relevant=true]:grow transition-all font-mono"
      size="sm"
      :data-relevant="weight > 0"
    >
    </UButton>
    <template #content>
      <PopoverContainer>
        <div class="flex flex-col gap-2 select-none">
          <span class="font-bold">
            {{ t(props.label) }}
          </span>
          <UFormField
            :label="t('Weight||Vægt')"
            orientation="vertical"
          >
            <USlider
              orientation="horizontal"
              color="neutral"
              :step="0.1"
              :min="0"
              :max="1"
              v-model="weight"
              :tooltip="{
                text: `${weight * 100}%`
              }"
              class="py-1 w-50"
              :ui="{
                thumb: 'rounded-sm',
              }"
            ></USlider>
          </UFormField>
        </div>
      </PopoverContainer>
    </template>
  </UPopover>
  <UTooltip
    :text="props.label"
    v-else
    arrow
  >
    <UBadge
      :label="label"
      variant="outline"
      :icon="icon"
      :color="color"
      class="justify-center grow transition-all font-mono"
    ></UBadge>
  </UTooltip>
</template>