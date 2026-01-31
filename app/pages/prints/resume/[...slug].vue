<script setup lang="ts">
const info = useInfoStore()
const { t } = useLanguageStore()
const route = useRoute()
const date = useDateStore()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("prints").path(`/prints/${route.path.split('/')[3]}`).first()
})
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
  <div class='bg-primary-50 dark:bg-primary-900 p-8 flex flex-col gap-8 text-primary'>
    <div class="flex flex-col">
      <div class="flex text-2xl">
        <span class=" grow font-bold">CV</span>
        <span class=" self-end place-self-end uppercase">Adam M. Golan</span>
      </div>
      <USeparator color="primary"></USeparator>
    </div>
    <div class="flex relative">
      <ul class=" grow">
        <li v-for="item in [
          {icon: 'lucide:map-pin', label: t('Odense, Denmark||Odense'), to: undefined},
          {...info.contactInfo.phoneNumber, to: undefined},
          {...info.links.email,
            label: 'adamdamgolan@gmail.com'
          },
          {...info.links.linkedIn,
            label: info.links.linkedIn.to.split('www.')[1],
          },
          {
            label: `${t('Portfolio||Portefølje')}: adamthegolem.studio`,
            icon: 'lucide:file-user',
            to: 'https://adamthegolem.studio'
          }
        ]">
          <UButton :label="item.label" :icon="item.icon" variant="link" :to="item.to" size="lg"></UButton>
        </li>
      </ul>
      <NuxtImg src="/img/profile.jpg" class=" size-60 absolute right-0 rounded-full border-8 border-white dark:border-neutral-900 shadow-sm"></NuxtImg>
    </div>
  </div>
  <UContainer>
    <UPage :ui="{
      root: 'my-8 mx-[5mm]'
    }">
      <UTimeline
        
        size="xl"
        :ui="{
          wrapper: 'mt-2',
          item: 'page-break-inside-avoid',
          description: 'print:text-xs'
        }"
        :default-value="10"
        :items="[
          {
            title: 'Profile||Profil',
            icon: 'i-lucide-user',
            description: page?.profile || info.profile
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
            icon: 'lucide:pocket-knife',
            list: ['High level English||Engelsk på højt niveau', 'High level Danish||Dansk på højt niveau', 'Hebrew (high level spoken, low level written)||Hebraisk (mundtligt på højt niveau, skriftligt på lavt niveau)', 'JavaScript, TypeScript, HTML, CSS, Tailwind, Vue, Electron, C#, C++, Nuxt, Node, Git', 'Autodesk Inventor', 'Adobe Photoshop, InDesign, Premiere Pro, Illustrator', 'Blender', 'PrusaSlicer']
          },
          {
            title: 'Free Time||Fritid',
            icon: 'i-lucide-star',
            description: t(info.freeTime)
          },
        ]"
      >
        <template #title="{item}">
          <span class=" text-xl font-bold text-primary uppercase">{{ t(item.title) }}</span>
        </template>
        <template #description="{item}">
          <p v-if="item.description">{{ t(item.description) }}</p>
          <ul v-if="item.list" class="list-disc columns-2 pl-8">
            <li v-for="li in item.list">{{ t(li) }}</li>
          </ul>
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
                    container: ' sm:p-2 gap-y-2 text-primary',
                    title: 'text-sm text-primary'
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
<style scoped>
@media print {
  @page {
    margin: 0.60in 0in 0.60in 0in;
    size: A4;
    color: var(--color-primary);
    text-transform: uppercase;
    @top-left {
      content: 'CV';
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
      content: 'Adam M. Golan';
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
    margin-top: 0in;
  }
}
</style>