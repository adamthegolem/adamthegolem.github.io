<script setup lang="ts">
definePageMeta({
  layout: "print",
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("prints").path(route.path).first()
})
console.log(page.value)
</script>
<template>
  <UContainer>
    <UPage>
      <ContentRenderer v-if="page" :value="page"></ContentRenderer>
    </UPage>
  </UContainer>
</template>