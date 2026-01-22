<script setup lang="ts">
const info = useInfoStore()
const { t } = useLanguageStore()
const date = useDateStore()
</script>
<template>
  
  <!-- <UHeader
    title="CV"
    :ui="{
      root: 'bg-primary-50 dark:bg-primary-800 mb-10'
    }"
  >
    <template #right>
      <span class=" uppercase text-4xl">Adam M. Golan</span>
    </template>
    <template #default>
      hhh
    </template>
  </UHeader> -->
  <div class='bg-primary-50 dark:bg-primary-900 p-10 flex flex-col gap-8 text-primary'>
    <div class="flex flex-col">
      <div class="flex text-3xl">
        <span class=" grow font-bold">CV</span>
        <span class=" self-end place-self-end uppercase">Adam M. Golan</span>
      </div>
      <USeparator color="primary"></USeparator>
    </div>
    <div class="flex">
      <ul class=" grow">
        <li v-for="item in [
          {...info.contactInfo.address, to: undefined},
          {...info.contactInfo.phoneNumber, to: undefined},
          {...info.links.email,
            label: 'adamdamgolan@gmail.com'
          },
          {...info.links.linkedIn,
            label: info.links.linkedIn.to.split('www.')[1],
          },
        ]">
          <UButton :label="item.label" :icon="item.icon" variant="link" :to="item.to" size="xl"></UButton>
        </li>
      </ul>
      <NuxtImg src="/img/profile.jpg" class=" size-80 rounded-full border-8 border-white dark:border-neutral-900"></NuxtImg>
    </div>
  </div>
  <UContainer>
    <UPage :ui="{
      root: 'm-10'
    }">
      <UTimeline
        
        size="3xl"
        :ui="{
          wrapper: 'mt-2',
          item: 'page-break-inside-avoid',
        }"
        :default-value="10"
        :items="[
          {
            title: 'Profile||Profil',
            icon: 'i-lucide-user',
            description: info.profile
          },
          {
            title: 'Educational Background||Uddannelse',
            icon: 'i-lucide-graduation-cap',
            children: info.educationalItems.map(x => ({...x, competences: undefined}))
          },
          {
            title: 'Prior Experience||Erfaring',
            icon: 'i-lucide-briefcase-business',
            children: info.jobItems.filter(x => !x.volunteerWork).map(x => ({...x, subjects: undefined, projects: undefined}))
          },
          {
            title: 'Volunteer Work||Frivilligt arbejde',
            icon: 'i-lucide-handshake',
            children: info.jobItems.filter(x => x.volunteerWork).map(x => ({...x, subjects: undefined, projects: undefined}))
          },
          {
            title: 'Tools & Languages||Sprog & værktøj',
            icon: 'i-lucide-pencil-ruler'
          },
          {
            title: 'Free Time||Fritid',
            icon: 'i-lucide-star'
          },
        ]"
      >
        <template #title="{item}">
          <span class=" text-2xl font-bold text-primary uppercase">{{ t(item.title) }}</span>
        </template>
        <template #description="{item}">
          <p v-if="item.description">{{ t(item.description) }}</p>
          <div v-if="item.children" class="flex flex-col gap-6">
            <div v-for="child in item.children" class="flex flex-col items-start gap-2">
              <span class="text-lg">
                <b>{{ t(child.title) }}</b>
                •
                {{ t(child.location) }}
              </span>
              <UBadge variant="outline" icon="i-lucide-calendar" color="neutral" :label="date.timeSpan(child.start, child.end)">
              </UBadge>
              <p>{{ t(child.description) }}</p>
              <template v-for="table in [
                {
                  list: child.subjects,
                  title: 'Subjects||Emner',
                },
                {
                  list: child.projects,
                  title: 'Projects||Projekter',
                }
              ]">
                <UPageCard v-if="table.list"
                  variant="soft"
                  :ui="{
                    root: 'w-full bg-primary-50 dark:bg-primary-900',
                    container: ' sm:p-4'
                  }"
                  :title="t(table.title)"
                >
                  <ul class=" list-disc columns-2 pl-8">
                    <li v-for="tableItem in table.list">
                      {{ t(tableItem) }}
                    </li>
                  </ul>
                </UPageCard>
              </template>
              <span v-if="child.competences">
                <b>{{ t('Competences||Kompetencer') }}:</b> {{ t(child.competences) }}
              </span>
            </div>
          </div>
        </template>
      </UTimeline>
    </UPage>
  </UContainer>
</template>