<script setup lang="ts">
// :features="[
//       {
//         title: 'Uh'
//       }
//     ]"
const langStore = useLanguageStore()
const {t} = langStore
const info = useInfoStore()
const { jobItems, educationalItems } = info
const date = useDateStore()
const route = useRoute()
const { data: projects } = await useAsyncData(`${route.path}-projects`, () => {
  return queryCollection("projects").all()
})
useSeoMeta({
  title: `${t("Experience||Erfaring")} - Adam Golan`
})
</script>
<template>
  <UPageHero
    :title="t('Experience||Erfaring')"
  >

  </UPageHero>
  <UPageSection 
  >
    <UAccordion type="multiple"
      :items="[
        {
          label: t('Educational Background||Uddannelse'),
          icon: 'i-lucide-graduation-cap',
          slot: 'edu'
        },
        {
          label: t('Job Experience||Joberfaring'),
          icon: 'i-lucide-briefcase-business',
          slot: 'jobs'
        },
      ]"
      :default-value="['0', '1']"
      :ui="{
        content: 'p-1 pb-6'
      }"
    >
      <template #edu>
        <UPageGrid>
          <ExperienceCard
            v-for="item in educationalItems"
            v-bind="item"
            :time-span="date.timeSpan(item.start, item.end)"
          >
          </ExperienceCard>
        </UPageGrid>
      </template>
      <template #jobs>
        <UPageGrid>
          <ExperienceCard
            v-for="item in jobItems"
            v-bind="item"
            :time-span="date.timeSpan(item.start, item.end)"
          >
            <template #ps>
              <span><b>{{t('Competences||Kompetencer')}}: </b>{{ t(item.competences) }}</span>
            </template>
          </ExperienceCard>
        </UPageGrid>
      </template>
    </UAccordion>
    
  </UPageSection>
  <USeparator></USeparator>
  <UPageSection v-if="false"
    v-for="item in educationalItems"
    :title="t(item.title)"
    :id="item.readMore.slice(1)"
    :description="item.description"
    :icon="item.icon"
    :headline="date.timeSpan(item.start, item.end)"
  >
    <UPageGrid>
      <UPageCard
        icon="i-lucide-book-text"
        :title="t('Subjects||Emner')"
        variant="soft"
      >
        <template #description>
          <ul class=" list-disc ml-6">
            <li v-for="subject in item.subjects">{{ subject }}</li>
          </ul>
        </template>
      </UPageCard>
      <UPageCard
        v-if="item.projects"
        icon="i-lucide-folders"
        :title="t('Projects||Projekter')"
        variant="soft"
      >
        <template #description>
          <ul class=" list-disc ml-6">
            <li v-for="subject in item.projects">{{ subject }}</li>
          </ul>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
  <UPageSection :title="t('Educational Background||Uddannelse')"
    icon="i-lucide-graduation-cap"
  >
    <template v-for="item in educationalItems">
      <UPageHeader :title="t(item.title)"
        :id="item.readMore.slice(1)"
        :description="t(item.description)"
        :headline="date.timeSpan(item.start, item.end)"
        :ui="{
          description: 'flex flex-col gap-6'
        }"
      >
        <!-- <template #headline>
          <UIcon :name="item.icon" size="20"></UIcon>
          <span>{{ item.timeSpan }}</span>
        </template> -->
        <template #description>
          <p>{{ t(item.description) }}</p>
          <UPageGrid>
            <UPageCard
              icon="i-lucide-book-text"
              :title="t('Subjects||Emner')"
              variant="soft"
            >
              <template #description>
                <ul class=" list-disc ml-6">
                  <li v-for="subject in info.idsToSkills(item.subjects)">{{ t(subject?.name) }}</li>
                </ul>
              </template>
            </UPageCard>
            <UPageCard
              v-if="item.projects"
              icon="i-lucide-folders"
              :title="t('Projects||Projekter')"
              variant="soft"
            >
              <template #description>
                <ul class=" list-disc ml-6">
                  <li v-for="project in info.idsToProjects(item.projects, projects)">{{ t(project.title) }}</li>
                </ul>
              </template>
            </UPageCard>
          </UPageGrid>
        </template>
      </UPageHeader>
      
    </template>
  </UPageSection>
</template>