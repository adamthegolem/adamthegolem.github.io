<script setup lang="ts">
const props = defineProps<{
  label?: string,
  calculation: () => number,
}>()
const value = defineModel<number>({
  required: true
})
const calculate = defineModel<boolean>("calculate", {
  required: true
})
const { t } = useLanguageStore()
watch(() => props.calculation(), calc)
watch(calculate, calc)
function calc() {
  if (calculate.value) {
    value.value = Math.max(props.calculation(), 1)
  }
}
</script>
<template>
  <UFormField
    :label="label"
  >
    <UFieldGroup>
      <UInputNumber
        orientation="vertical"
        :min="1"
        v-model="value"
        :disabled="calculate"
      ></UInputNumber>
      <UTooltip
        :text="t(calculate ? 'Deactivate automatic calculation||Deaktiver automatisk udregning' : 'Activate automatic calculation||Aktiver automatisk udregning')"
      >
        <UButton
          icon="lucide:calculator"
          :variant="calculate ? 'subtle' : 'outline'"
          :color="calculate ? 'primary' : 'neutral'"
          @click="calculate = !calculate"
        >
        </UButton>
      </UTooltip>
    </UFieldGroup>
  </UFormField>
</template>