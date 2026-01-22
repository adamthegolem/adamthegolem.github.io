<script setup lang="ts">
const langStore = useLanguageStore()
const {t} = langStore
const useDate = useDateStore()
const { stringKeySorter } = useUtilStore()
const { data: projects } = await useAsyncData("index-all", () => {
  return queryCollection('projects').order("start", "DESC").all()
  // return queryCollection("projects").all()
})
// const projects: {
//   title: string
// }[] = [
//   {
//     title: ""
//   }
// ]
</script>
<template>
  <!-- <UTimeline :items="projects" size="lg">

  </UTimeline> -->
  <UPageSection :title="t('Projects||Projekter')">
    <UPageGrid>
      <UBlogPost v-for="project in projects"
        :title="t(project.title)"
        :date="useDate.timeSpan(project.start, project.end)"
        :to="project.path"
        :description="t(project.description)"
        :image="project.thumbnail"
        :ui="{
          image: 'object-center'
        }"
        orientation="vertical"
      >
        <template #badge>
          <!-- <UAvatar :icon="project.icon"></UAvatar> -->
          <!-- <UBadge :icon="project.icon" class="rounded-full" variant="subtle"></UBadge> -->
        </template>
      </UBlogPost>
    </UPageGrid>
  </UPageSection>
</template>