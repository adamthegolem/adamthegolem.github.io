<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui'

const langStore = useLanguageStore()
const {t} = langStore
useSeoMeta({
  title: computed(() => `${t("Projects||Projekter")} - Adam Golan`)
})
const useDate = useDateStore()
const info = useInfoStore()
const { stringKeySorter } = useUtilStore()
const filteredSkillsItems = ref<{label: string, icon: string, id: string}[]>([])
const filteredSkillsIds = computed({
  get: () => {
    
    return filteredSkillsItems.value.map(({id}) => id)
  },
  set: (value: string[]) => {
    filteredSkillsItems.value = value.reduce((acc, id) => {
      const skill = info.skills.find(skill => skill.id == id)
      if (skill) {
        acc.push({
          ...skill,
          label: skill?.name
        })
      }
      
        
      return acc
    }, [] as {label: string, icon: string, id: string}[])
  }
})
watch(filteredSkillsIds, () => {
  localStorage.setItem("filteredSkills", JSON.stringify(filteredSkillsIds.value))
})
onMounted(() => {
  const localFilteredSkills = localStorage.getItem("filteredSkills")
  const searchParams = new URL(location.href).searchParams
  const skillsSearchParam = searchParams.get("skills")
  if (localFilteredSkills) {
    filteredSkillsIds.value = JSON.parse(localFilteredSkills)
  }
  if (skillsSearchParam) {
    filteredSkillsIds.value = skillsSearchParam.split('&')
  }
})
const projectOrderAscending = ref(false)
const { data: projects } = await useAsyncData("index-all", () => {
  return queryCollection('projects').order("start", "DESC").all()
  // return queryCollection("projects").all()
})
// const teamProject = {
//   label: t('Team Project||Gruppeprojekt'),
//   icon: 'i-lucide-users',
// }
// const individualProject = {
//   label: t('Individual Project||Selvstændigt projekt'),
//   icon: 'i-lucide-user-star'
// }
const filteredProjects = computed(() => {
  let array = projects.value?.filter(project => {
    if (filteredSkillsIds.value.length == 0) return true
    return filteredSkillsIds.value.find(skill => skill ? project.skills?.includes(skill) : false)
    // return project.skills?.includes('mop')
  })
  // const includeIndividual = filteredSkills.value.includes(individualProject)
  // console.log(includeIndividual)
  // const includeTeam = filteredSkills.value.includes(teamProject)
  // console.log(includeTeam)
  // if (includeIndividual || includeTeam) array = array?.filter(project => {
  //   if (includeIndividual && project.individual) return true
  //   if (includeTeam && !project.individual) return true
  //   return false
  // })
  if (projectOrderAscending.value) array = array?.reverse()
  return array
})
// const projects: {
//   title: string
// }[] = [
//   {
//     title: ""
//   }
// ]
// const filterItems = computed(() => {
//   const items: InputMenuItem[] = [
//     {
//       type: 'label',
//       label: t('Types||Typer')
//     }
//   ]
//   items.push(teamProject, individualProject)
//   items.push({
//     type: 'separator',
//   }, {
//     type: 'label',
//     label: t('Skills||Færdigheder')
//   })
//   const skills = info.skills.map(x => ({
//     label: t(x.name),
//     icon: x.icon,
//     id: x.id
//   })).sort((a, b) => stringKeySorter(a.label, b.label))
//   items.push(...skills)
//   return items
// })
</script>
<template>
  <!-- <UTimeline :items="projects" size="lg">

  </UTimeline> -->
  <UPage v-if="false">
    <template #left>
      <UPageAside :ui="{
        root: 'w-600'
      }">

      </UPageAside>
    </template>
    <UPageBody>
      <div class="flex flex-col gap-3">
        <UBlogPost v-for="project in projects"
          :title="t(project.title)"
          :date="useDate.timeSpan(project.start, project.end)"
          :to="project.path"
          :description="t(project.description)"
          :image="project.thumbnail"
          :ui="{
            image: 'object-center',
            title: 'hyphens-auto'
          }"
          orientation="horizontal"
        >
          <template #badge>
            <!-- <UAvatar :icon="project.icon"></UAvatar> -->
            <!-- <UBadge :icon="project.icon" class="rounded-full" variant="subtle"></UBadge> -->
          </template>
          <template #date>
            <span class=" text-primary font-semibold">{{ t(project.headline) }}</span>
          </template>
          <template #description>
            <div class="flex flex-col gap-3 items-start mt-1">
              <UBadge
                :label="useDate.timeSpan(project.start, project.end)"
                variant="soft"
                icon="i-lucide-calendar"
                color="neutral"
              >
              </UBadge>
              <p>{{ t(project.description) }}</p>
            </div>
          </template>
        </UBlogPost>
      </div>
    </UPageBody>
  </UPage>
  <UPageSection
    orientation="vertical"
    :title="t('Projects||Projekter')"
    :description="t('')"
    :features="[
      {
        title: t('Product Development||Produktudvikling'),
        icon: 'i-lucide-package-open',
        description: t('These projects all to some extent center around developing products, whether through redesign or innovation from scratch.||Disse projekter er alle til en vis grad centreret om udvikling af produkter ved redesign eller innovation fra bunden.')
      },
      {
        title: t('Rapid Prototyping'),
        icon: 'i-lucide-zap',
        description: t('In many of the projects, rapid prototyping plays a large role in the form of CAD, 3D printing, and microcontrollers.||I mange af projekterne spiller rapid protoryping en stor rolle i form af CAD, 3D-print og mikrocontrollere.')
      },
      {
        title: t('Graphic Design||Grafisk design'),
        icon: 'i-lucide-spline-pointer',
        description: t('Every project has an element of graphic design, through reports, posters, or videos.||Hvert projekt har et element af grafisk design via rapporter, plakater eller videoer.')
      },
      {
        title: t('Programming||Programmering'),
        icon: 'i-lucide-code',
        description: t('Programming plays an increasingly important role in projects through different forms of prototyping.||Programmering spiller i stigende grad en vigtig rolle gennem forskellige former for prototyping.')
      },
      {
        title: t('Teamwork||Gruppearbejde'),
        icon: 'i-tabler-users-group',
        description: t('Most projects are done collaboratively, increasingly across disciplines and specialties.||De fleste projekter udføres i fællesskab og i stigende grad på tværs af discipliner.')
      },
      {
        title: t('Project Management||Projektledelse'),
        icon: 'i-lucide-megaphone',
        description: t('In many projects I have taken on a partial management role, with a focus on administrative tasks.||I mange projekter har jeg påtaget mig en delvis projektledelsesrolle med fokus på administrative opgaver.')
      }
    ]"
  >
    <!-- <UPage>
      <template #left>
        <UPageAside>
          <UCheckboxGroup
            indicator="hidden"
            variant="table"
            :legend="t('Types||Typer')"
            :items="['System', 'Good']"
          >
            <template #label>
              <UIcon name="i-lucide-x"></UIcon>
            </template>
          </UCheckboxGroup>
        </UPageAside>
      </template> -->
      <div class="flex flex-col gap-6 md:w-2/3 md:m-auto">
      
        <!-- <div class="flex flex-col md:flex-row w-full gap-2 md:items-start"> -->
          <UFieldGroup class="overflow-clip">
            <UInputMenu
              class="grow text-ellipsis"
              multiple
              clear
              v-model="filteredSkillsItems"
              :data-filled="filteredSkillsIds.length > 0"
              icon="i-lucide-filter"
              :items="info.skills.map(x => ({
                icon: x.icon,
                label: x.name,
                id: x.id
              })).sort((a, b) => stringKeySorter(a.label, b.label))"
              :placeholder="t('Add skill to filter...||Tilføj færdighed til filter...')"
              :ui="{
                base: 'rounded-r-none',
                tagsItemText: 'max-w-40 md:max-w-full'
              }"
            >
              <template #tags-item-text="{item}">
                {{ t(item.label) }}
              </template>
              <template #item-label="{item}">
                {{ t(item.label) }}
              </template>
            </UInputMenu>
            <UTooltip :text="t('Clear all||Ryd alle')">
              <UButton
                :disabled="filteredSkillsIds.length == 0"
                variant="outline"
                color="neutral"
                icon="i-lucide-list-x"
                class=" text-muted"
                @click="filteredSkillsIds = []"
              ></UButton>
            </UTooltip>
            <UTooltip class=" text-muted" :text="t(`Sort by date (${projectOrderAscending ? 'ascending' : 'descending'})||Sortér efter dato (${projectOrderAscending ? 'stigende' : 'faldende'})`)">
              <UButton
                :icon="`i-lucide-calendar-arrow-${!projectOrderAscending ? 'down' : 'up'}`"
                variant="outline"
                color="neutral"
                @click="projectOrderAscending = !projectOrderAscending"
              ></UButton>
            </UTooltip>
          </UFieldGroup>
          <!-- <UTooltip class="hidden md:inline-flex" :text="t(`Sort by date (${projectOrderAscending ? 'ascending' : 'descending'})||Sortér efter dato (${projectOrderAscending ? 'stigende' : 'faldende'})`)">
            <UButton
              :icon="`i-lucide-calendar-arrow-${!projectOrderAscending ? 'down' : 'up'}`"
              variant="outline"
              color="neutral"
              @click="projectOrderAscending = !projectOrderAscending"
            ></UButton>
          </UTooltip>
          <UButton
            class=" md:hidden"
            :icon="`i-lucide-calendar-arrow-${!projectOrderAscending ? 'down' : 'up'}`"
            variant="outline"
            color="neutral"
            @click="projectOrderAscending = !projectOrderAscending"
            :label="t(`Sort by date (${projectOrderAscending ? 'ascending' : 'descending'})||Sortér efter dato (${projectOrderAscending ? 'stigende' : 'faldende'})`)"
          ></UButton> -->
        <!-- </div> -->
        <!-- <UFieldGroup class="overflow-clip">
          <UInputMenu
            class="grow text-ellipsis"
            multiple
            clear
            v-model="filteredSkills"
            :data-filled="filteredSkills.length > 0"
            icon="i-lucide-filter"
            :items="filterItems"
            :placeholder="t('Add to filter...||Tilføj til filter...')"
            :ui="{
              base: 'rounded-r-none',
              tagsItemText: 'max-w-40 md:max-w-full'
            }"
          >
          </UInputMenu>
          <UTooltip :text="t('Clear all||Ryd alle')">
            <UButton
              :disabled="filteredSkills.length == 0"
              variant="outline"
              color="neutral"
              icon="i-lucide-list-x"
              class=" text-muted"
              @click="filteredSkills = []"
            ></UButton>
          </UTooltip>
          <UTooltip class=" text-muted" :text="t(`Sort by date (${projectOrderAscending ? 'ascending' : 'descending'})||Sortér efter dato (${projectOrderAscending ? 'stigende' : 'faldende'})`)">
            <UButton
              :icon="`i-lucide-calendar-arrow-${!projectOrderAscending ? 'down' : 'up'}`"
              variant="outline"
              color="neutral"
              @click="projectOrderAscending = !projectOrderAscending"
            ></UButton>
          </UTooltip>
        </UFieldGroup> -->
        <UBlogPost v-for="project in filteredProjects"
          :title="t(project.title)"
          :date="useDate.timeSpan(project.start, project.end)"
          :to="project.path"
          :description="t(project.description)"
          :image="project.thumbnail"
          :ui="{
            image: 'object-center object-cover',
            title: 'hyphens-auto',
            body: 'md:pr-8 lg:pr-8',
            header: 'h-full',
          }"
          orientation="horizontal"
        >
          <template #badge>
            <!-- <UAvatar :icon="project.icon"></UAvatar> -->
            <!-- <UBadge :icon="project.icon" class="rounded-full" variant="subtle"></UBadge> -->
          </template>
          <template #date>
            <span class=" text-primary font-semibold">{{ t(project.headline) }}</span>
          </template>
          <template #description>
            <div class="flex flex-col gap-3 items-start mt-1">
              <UBadge
                :label="useDate.timeSpan(project.start, project.end)"
                variant="soft"
                icon="i-lucide-calendar"
                color="neutral"
              >
              </UBadge>
              <p class=" line-clamp-3 hyphens-auto">{{ t(project.description) }}</p>
            </div>
          </template>
        </UBlogPost>
      </div>
    <!-- </UPage> -->
    <!-- <UTable
      :columns="[
        {
          accessorKey: 'title',
          header: t('Title||Titel')
        }
      ]"
      :data="projects?.map(project => ({
        title: t(project.title)
      }))"
    ></UTable> -->
  </UPageSection>
</template>