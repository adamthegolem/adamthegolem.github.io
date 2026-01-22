<script setup lang="ts">
const props = defineProps<{
  value: number,
  max?: number,
}>()
const {max = 5} = props;
const value = computed(() => Math.round(props.value * 2) / 2);
function star(index: number) {
  if (index - props.value == 0.5) return "i-ion-star-half"
  if (index > props.value) {
    return "i-ion-star-outline"
  }
  return "i-ion-star"
}
// const variant = computed(() => {
//   if (props.variant == "ghost") return "outline"
// })
</script>
<template>
  <div class="flex gap-1">
    <UIcon v-for="index in max" :name="star(index)"/>
  </div>
  <!-- <UBadge size="xl" :variant="variant">
    <template #default>
      <div class="flex gap-1">
        <UIcon v-for="index in max" :name="star(index)"/>
      </div>
    </template>
  </UBadge> -->
</template>