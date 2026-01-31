<script setup lang="ts">
import { useInfoStore } from '../stores/info';

const info = useInfoStore();
const langStore = useLanguageStore()
const { t } = langStore
const { softwareAndSystems } = info;
const route = useRoute()
const { data: projects } = await useAsyncData(`${route.path} projects`, () => {
  return queryCollection("projects").order("start", "DESC").all()
})
</script>
<template>
  <div>
    <UPageHero
      title="Adam Golan"
      :description="t('A product developer with a technical mind & a flair for design. Experienced team worker but enjoys digging deep in technical tasks independently.||Produktudvikler med teknisk hjerne & flair for design. Erfaren gruppearbejder men nyder at dykke ned i tekniske opgaver selvstændigt.')"
      :links="[
        {
          label: 'Read more about me',
          to: '/about',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        },
        // {
        //   label: 'Reach out',
        //   to: 'https://github.com/nuxt-ui-templates/starter',
        //   target: '_blank',
        //   icon: 'i-simple-icons-github',
        //   size: 'xl',
        //   color: 'neutral',
        //   variant: 'link'
        // }
      ]"
      :ui="{
        description: 'flex flex-col gap-6'
      }"
    >
      <template #headline>
        <!-- <UAvatar src="/img/profile.jpg" size="3xl" height="200"></UAvatar> -->
        <img src="/img/profile.jpg" class=" rounded-full size-30 mx-auto ring-2">
        <!-- <NuxtImg src="/img/profile.jpg" sizes=" "></NuxtImg> -->
      </template>
      <template #description>
        <p>{{ t(info.profile) }}</p>
        <div class="flex justify-center gap-3 flex-wrap">
          <UTooltip text="Location">
            <UBadge :label="t('Odense, Denmark||Odense, Danmark')"
              icon="i-lucide-map-pin"
              variant="subtle"
            >
            </UBadge>
          </UTooltip>
          <UTooltip text="Languages">
            <UFieldGroup>
              <UBadge :label="t('English||Dansk')"
                icon="i-lucide-languages"
                variant="subtle"
              >
              </UBadge>
              <UBadge :label="t('Danish||Engelsk')"
                variant="subtle"
              >
              </UBadge>
              <UBadge :label="t('Hebrew||Hebraisk')"
                variant="subtle"
              >
              </UBadge>
            </UFieldGroup>
          </UTooltip>
        </div>
      </template>
      <template #links>
        <UButton :label="t('Read more about me||Læs mere om mig')"
          size="xl"
          to="/about"
          trailing-icon="i-lucide-arrow-right"
        >
        </UButton>
        <MultiIconButton :label="t('Get in touch||Tag kontakt')"
          :icons="[
            {
              icon: info.links.linkedIn.icon,
              to: info.links.linkedIn.to
            },
            {
              icon: info.links.email.icon,
              to: info.links.email.to
            }
          ]"
          size="xl"
        ></MultiIconButton>
        <!-- <UFieldGroup>
          <UButton
            size="xl"
            label="Get in touch"
            variant="subtle"
            target="_blank"
            to="https://www.linkedin.com/in/adam-golan-720765310/"
            color="neutral"
          ></UButton>
          <UButton
            size="xl"
            icon="i-ri-linkedin-fill"
            variant="outline"
            target="_blank"
            to="https://www.linkedin.com/in/adam-golan-720765310/"
            color="neutral"
          >
          </UButton>
          <UButton
            size="xl"
            icon="i-lucide-mail"
            variant="outline"
            target="_blank"
            to="mailto:adamdamgolan@gmail.com"
            color="neutral"
          >
          </UButton>
        </UFieldGroup> -->
      </template>
    </UPageHero>
    <USeparator></USeparator>
    <UPageSection
      :title="t('Skills & Tools||Færdigheder & værktøjer')"
      icon="i-lucide-pocket-knife"
      :description="t('Right tools for the right jobs.||Det rette værktøj til den rette opgave.')"
      orientation="vertical"
      :links="[
        {
          label: t('Read more||Læs mere'),
          trailingIcon: 'i-lucide-arrow-right',
          to: '/about#tools'
        }
      ]"
    >
      <UMarquee v-for="(list, index) of [
          info.skills.slice(0, Math.floor(info.skills.length/2)),
          info.skills.slice(Math.floor(info.skills.length/2) + 1)
        ]"
        :reverse="index % 2 == 1"
      >
        <!-- <UTooltip 
          v-for="logo in skills.skills"
          :text="logo.name"
        >
          <UIcon :name="logo.icon"
            class="text-neutral text-4xl md:text-8xl"
          ></UIcon>
        </UTooltip> -->
        <UBadge
          v-for="skill in list"
          :icon="skill.icon"
          size="xl"
          variant="soft"
          color="neutral"
          :label="t(skill.name)"
        ></UBadge>
      </UMarquee>
      <UMarquee pause-on-hover>
        <UTooltip 
          v-for="logo in softwareAndSystems"
          :text="logo.name"
        >
          <img
            :src="logo.logo"
            class="h-10 md:h-20"
            :aria-label="logo.name"
          >
        </UTooltip>
      </UMarquee>
    </UPageSection>
    <USeparator></USeparator>
    <UPageSection
      :title="t('Projects||Projekter')"
      icon="i-lucide-folders"
    >
      <UAccordion
        :items="[
          {
            label: t('Team Projects||Gruppeprojekter'),
            icon: 'i-lucide-users',
            projects: [
              'semester-7',
              'semester-4',
              'technology-entrepreneurship'
            ],
          },
          {
            label: t('Individual Projects||Selvstændige projekter'),
            icon: 'i-lucide-user-star',
            projects: [
              'midi-controller',
              'tiamate',
              'workshop-2'
            ]
          },
        ]"
        type="multiple"
        :default-value="['0', '1']"
      >
        <template #body="{item}">
          <div class="grid grid-cols-4 gap-6">
            <!-- {{ projects }} -->
            <UBlogPost
              v-for="project in item.projects.map(id => projects?.find(project => `/projects/${id}` == project.path))"
              :title="t(project?.title)"
              :image="project?.thumbnail"
              variant="soft"
              :to="project?.path"
            >
              
            </UBlogPost>
            <UEmpty
              variant="naked"
              icon="i-lucide-folders"
              :actions="[
                {
                  label: t('See more projects||Se flere projekter'),
                  trailingIcon: 'i-lucide-arrow-right',
                  variant: 'link',
                  to: '/projects'
                }
              ]"
            >

            </UEmpty>
          </div>
        </template>
      </UAccordion>
      <!-- <UCarousel
        :items="projects"
        v-slot="{item}"
        arrows
        loop
        dots
        
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :ui="{
          item: 'md:basis-1/3 w-10',
          viewport: 'p-3',
          dots: 'hidden md:flex'
        }"
      >
        <UBlogPost
          :icon="item.icon"
          :title="t(item.title)"
          :to="item.path"
          :description="t(item.description)"
          :ui="{
            // container: 'h-full'
            image: 'object-center'
          }"
          :image="item.thumbnail"
        >
          
        </UBlogPost>
      </UCarousel> -->
    </UPageSection>
  </div>
</template>
