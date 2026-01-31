<script setup lang="ts">

const useLang = useLanguageStore()
const { t } = useLang
const useDate = useDateStore()
const useInfo = useInfoStore()
const route = useRoute()
const langPath = computed(() => {
  return `${route.path}.${useLang.language}`
})
const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection('projects').path(route.path).first()
  // return queryCollection("projects").all()
})
const { data: projectContent } = await useAsyncData(computed(() => langPath.value), () => {
  return queryCollection('projectContent').path(langPath.value).first()
  // return queryCollection("projects").all()
})
useHead({
  title: computed(() => `${t(project.value?.title)} - Adam Golan`)
})
// const projectContent = computed(async () => {
//   return await queryCollection('projectContent').path(langPath.value).first()
// })
const { data: projects } = await useAsyncData("slug-all", () => {
  return queryCollection('projects').order("start", "ASC").all()
  // return queryCollection("projects").all()
})
// const sortedProjects = computed(() => {
//   return projects.value?.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
// })
console.log(project.value)
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('projects', route.path, {
    fields: [
      // "description",
      "headline"
    ]
  }).order('start', "ASC")
})
const { data: company } = await useAsyncData(computed(() => `${route.path}-${project.value?.company}`), () => {
  return queryCollection('companies').where('_id', '=', project.value?.company).first()
  // return queryCollection('companies').path(`/companies/${project.value?.company}` || '').first()
})
console.log(surround.value)
// const surround = computed(() => {
//   if (sortedProjects.value) {
//     return [sortedProjects.value[0]]
//   }
//   return []
// })
</script>
<template>
  <!-- {{ route.fullPath}} -->
  <UContainer v-if="projectContent && project">

    <!-- {{ post }} -->
      
    <UPage>
      
      <template #left>
        <UPageAside :ui="{
            root: ''
          }"
        >
          <div class=" flex flex-col gap-2">
            <UTimeline
              v-if="projects"
              :items="projects?.map(x => ({
                ...x,
                date: undefined,
                description: undefined
              }))"
              :default-value="projects.findIndex(x => x.path == project?.path)"
              :ui="{
                wrapper: 'mt-0'
              }"
            >
              <template #date="{item}">
                <span>{{ useDate.monthAndYear(item.start) }}</span>
              </template>
              <template #title="{item}">
                <!-- <ULink :to="item.path">{{ t(item.title) }}</ULink> -->
                <UButton variant="ghost" :data-current="item.path == project.path" color="neutral" class=" data-[current=true]:text-primary" :to="item.path">
                  <div class="flex flex-col items-start">
                    <span class="text-dimmed text-xs/5">
                      {{ useDate.monthAndYear(item.start) }}
                    </span>
                    <!-- <ULink :to="item.path" class="group-hover:">{{ t(item.title) }}</ULink> -->
                    <span class="">
                      {{ t(item.title) }}
                    </span>
                  </div>
                </UButton>
              </template>
            </UTimeline>
          </div>
        </UPageAside>
      </template>
      <!-- <UPageHeader
        :title="t(project.title)"
        :headline="t(project.description)"
        :description="t(project.description)"
      >
        <template #links>
          <img src="https://picsum.photos/id/237/200/300"/>
        </template>
      </UPageHeader> -->
      <UPageHeader
        :title="t(project.title)"
        :headline="t(project.headline)"
        :description="t(project.description)"
        orientation="horizontal"
      >
        <template #description>
          <div class="flex flex-col gap-3 justify-start items-start">
            <div class="flex gap-2 flex-wrap">
              <UBadge
                :label="useDate.timeSpan(project.start, project.end)"
                icon="i-lucide-calendar"
                variant="soft"
                color="neutral"
              >
              </UBadge>
              <UBadge
                :color="project.individual ? 'secondary' : 'primary'"
                variant="soft"
                :label="project.individual ? t('Individual Project||Selvstændigt projekt') : t('Team Project||Gruppeprojekt')"
                :icon="project.individual ? 'i-lucide-user-star' : 'i-lucide-users'"
              >

              </UBadge>
            </div>
            <p>
              {{t( project.description )}}
            </p>
            <!-- <div v-if="project.skills" class="flex gap-2 w-full flex-wrap">
              <UBadge
                v-for="skill in project.skills.map(id1 => useInfo.skills.find(({id}) => id1 == id))"
                :icon="skill?.icon"
                :label="t(skill?.name)"
                color="neutral"
                variant="outline"
              >

              </UBadge>
            </div> -->
          </div>
        </template>
      </UPageHeader>
      <UPageBody>
        <UAccordion
          :items="[
            {
              label: t('Skills||Færdigheder'),
              include: project.skills,
              slot: 'skills'
            },
            {
              label: t('Partner Company||Samarbejdsvirksomhed'),
              include: company,
              slot: 'company'
            },
          ].filter(({include}) => include)"
          default-value="0"
          :ui="{
            content: 'p-0 pb-6'
          }"
        >
          <template #skills>
            <div class="flex items-start gap-2 flex-wrap">
              <UPopover
                v-for="skill in project.skills.map(id1 => useInfo.skills.find(({id}) => id1 == id))"
                mode="click"
                :content="{
                  align: 'start'
                }"
                arrow
              >
                <UBadge
                  :icon="skill?.icon"
                  :label="t(skill?.name)"
                  color="neutral"
                  variant="outline"
                  class=" cursor-help"
                >
                </UBadge>
                <template #content>
                  <div v-if="skill?.description" class="flex p-2 max-w-80 text-toned text-sm">
                    <p>{{ t(skill?.description) }}</p>
                  </div>
                </template>
              </UPopover>
              <UButton :label="t('See more||Se mere')" size="xs" variant="link" to="/about#tools" trailing-icon="i-lucide-arrow-right">
              </UButton>
            </div>
          </template>
          <template #company>
            <UBlogPost
              :title="t(company?.name)"
              :description="t(company?.description)"
              :image="company?.logo"
              orientation="horizontal"
              :ui="{
                image: 'object-center object-contain bg-elevated p-3',
                // header: 'shadow-none rounded-b-none md:rounded-r-none',
                header: 'shadow-none',
                // root: 'bg-muted'
              }"
              variant="ghost"
            >
              <template #title>
                <div class="flex items-center gap-2">
                  <span>{{ company?.name }}</span>
                  <span>•</span>
                  <UBadge
                    :label="t(company?.location)"
                    variant="outline"
                    icon="i-lucide-map-pin"
                    color="neutral"
                    size="sm"
                  ></UBadge>
                </div>
              </template>
              <template #description>
                <div class="flex flex-col gap-2 items-start">
                  <p>
                    {{ t(company?.description) }}
                  </p>
                  <UButton
                    :label="t('Website||Hjemmeside')"
                    :to="t(company?.website)"
                    target="_blank"
                    variant="soft"
                    icon="i-lucide-globe"
                    trailing-icon="i-lucide-arrow-up-right"
                  ></UButton>
                </div>
              </template>
            </UBlogPost>
          </template>
        </UAccordion>
        <!-- {{ projects }} -->
        <!-- <img :src="project.thumbnail" class="rounded"> -->
        <!-- <UCard v-if="project.skills" variant="outline" to="/about#tools" :ui="{
          body: 'sm:p-3 relative'
        }">
          <div class="absolute top-0 bottom-0 left-0 right-0 bg-elevated/50 backdrop-blur-sm z-50 hover:opacity-100 opacity-0 transition-opacity cursor-pointer flex items-center justify-center">
            <span>{{ t('See more||Se mere') }}<UIcon name="i-lucide-arrow-right"></UIcon></span>
          </div>
          <div class="flex items-start gap-2 flex-wrap">
            <UBadge
              v-for="skill in project.skills.map(id1 => useInfo.skills.find(({id}) => id1 == id))"
              :icon="skill?.icon"
              :label="t(skill?.name)"
              color="neutral"
              variant="outline"
            >
            </UBadge>
            <UButton :label="t('See more||Se mere')" size="xs" variant="link" to="/about#tools" trailing-icon="i-lucide-arrow-right">

            </UButton>
          </div>
        </UCard> -->
        <!-- <UAccordion
          v-if="project.skills"
          :ui="{
            item: 'bg-elevated/50 p-3 rounded-lg',
            trigger: 'sm:py-0',
            content: 'sm:pt-3',
            root: 'sm:mb-8'
          }"
          :items="[
            {
              label: t('Skills||Kompetencer'),
              slot: 'skills'
            }
          ]"
          default-value="0"
        >
          <template #skills>
            <div class="flex flex-col gap-3 items-start">
              <div class="flex items-start gap-2 flex-wrap">
                <UBadge
                  v-for="skill in project.skills.map(id1 => useInfo.skills.find(({id}) => id1 == id))"
                  :icon="skill?.icon"
                  :label="t(skill?.name)"
                  color="neutral"
                  variant="outline"
                >
                </UBadge>
              </div>
              <UButton
                :label="t('More details||Flere detaljer')"
                trailing-icon="i-lucide-arrow-right"
                size="sm"
                variant="ghost"
                class=" self-end"
                to="/about#tools"
              ></UButton>
            </div>
          </template>
        </UAccordion> -->
        <MDC :value="`![Image](${project.thumbnail})`"></MDC>
        <!-- <NuxtImg :src="project.thumbnail" class="rounded"/> -->
        <ContentRenderer :value="projectContent"/>
        <!-- <UContentSurround></UContentSurround> -->
        <UContentSurround :surround="surround"
          :ui="{
            linkDescription: 'line-clamp-none hyphens-auto'
          }"
        >
          <template #link-title="{link}">
            <div class="flex flex-col">
              <span class=" text-xs text-primary">{{ t(link.headline as string) }}</span>
              <span>{{ t(link.title) }}</span>
            </div>
          </template>
          <!-- <template #link-description="{link}">
            {{ t(link.description as string) }}
          </template> -->
        </UContentSurround>
      </UPageBody>
      <template #right>
        <UPageAside>
          <div class="flex flex-col gap-3">
            
            
            <UContentToc :links="projectContent?.body?.toc?.links" highlight :title="t('On this page||På denne side')">
            </UContentToc>
          </div>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
  
  <UError v-else
    :error="{
      statusCode: 404,
      statusMessage: t('Page not found||Side ikke fundet'),
      message: t('The page you are looking for does not exist.||Siden, du leder efter, eksisterer ikke.'),
    }"
    :clear="{
      label: t('Back to projects||Tilbage til projekter')
    }"
    redirect="/projects/"
  >
  </UError>
  <!-- {{ langPath }}
  {{ projectContent }} -->
</template>