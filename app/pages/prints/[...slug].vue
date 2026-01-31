<script setup lang="ts">
// definePageMeta({
//   layout: "print",
// })
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("prints").path(route.path).first()
})
console.log(route.path)
useHead({
  title: computed(() => page.value?.title)
})
</script>
<template>
  <UContainer>
    <UPage class=" px-[5mm] py-3">
      <div class="">
        <ContentRenderer
          class=" prose-h1:mb-4 prose-h1:text-3xl prose-h2:mt-3 prose-h2:text-xl prose-h2:mb-0 prose-p:mt-1 prose-h1:text-primary prose-h2:text-primary prose-p:mb-2 prose-p:text-sm prose-p:leading-relaxed"
          v-if="page"
          :value="page"
        ></ContentRenderer>
      </div>
    </UPage>
  </UContainer>
</template>
<style scoped>
@media print {
  @page {
    margin: 0.60in 0in 0.60in 0in;
    size: A4;
    color: var(--color-primary);
    @top-left {
      content: 'Adam M. Golan';
      background-color: var(--color-primary-50);
      height: var(--print-header-height);
      margin-bottom: calc(100% - var(--print-header-height));
      padding-left: var(--print-margin-x);
      width: 50%;
      font-weight: bold;
    }
    @top-center {
      /* content: 'I am top center';
      font-weight: bold;
      color: blue; */
    }
    @top-right {
      content: 'adamdamgolan@gmail.com | +45 51 20 19 77';
      background-color: var(--color-primary-50);
      width: 50%;
      height: var(--print-header-height);
      margin-bottom: calc(100% - var(--print-header-height));
      padding-right: var(--print-margin-x);
      /* content: 'top right ' counter(page); */
    }
    @bottom-right {
      content: counter(page);
      padding-right: var(--print-margin-x);
      background-color: var(--color-primary-50);
      color: var(--color-primary);
      height: var(--print-header-height);
      margin-top: calc(100% - var(--print-header-height));
      font-weight: bold;
    }
  }
  @page :first {
    /* margin-top: 0in; */
  }
}
</style>