<script setup lang="ts">
import type { PageFeatureProps } from '@nuxt/ui';
import { useInfoStore } from '../stores/info';

const info = useInfoStore();
const langStore = useLanguageStore()
const { t } = langStore
const { tools: softwareAndSystems } = info;
const route = useRoute()
const { data: projects } = await useAsyncData(`${route.path} projects`, () => {
  return queryCollection("projects").order("start", "DESC").all()
})
// const traits = ref<PageFeatureProps[]>([
//   {
//     title: t("Generalist||Generalist"),
//     icon: "lucide:shapes"
//   },
//   {
//     title: t("Specialist||Specialist"),
//     icon: "lucide-lab:crosshair-2"
//   },
//   {
//     title: t("Ideator||Idémand"),
//     icon: "lucide:lightbulb",
//   },
//   {
//     title: t("Detail-Oriented||Detaljeorienteret"),
//     icon: "lucide:microscope"
//   }
// ])
const traits = computed(() => {
  return [
    {
      title: t('Generalist||Generalist'),
      icon: 'lucide:shapes',
      description: t('Jack of all trades with an understanding of a wide variety of engineering and design concepts.||Tusindkunstner med forståelse for en bred vifte af ingeniør- og designkundskaber.'),
      pair: 0
    },
    {
      title: t('Specialist||Specialist'),
      icon: 'lucide:target',
      description: t('Focused and digs deep when a project requires that a heavy, technical task be done.||Fokuseret og går i dybden, når et projekt kræver, at en tung teknisk opgave udføres.'),
      pair: 0,
    },,
    {
      title: t('Ideas||Idéer'),
      icon: 'lucide:lightbulb',
      description: t('Out-of-the-box thinker with a systematic approach to creative ideation.||Tænker ud af boksen og går systematisk til værks med kreativ idégenerering.'),
      pair: 1,
    },
    {
      title: t('Details||Detaljer'),
      icon: 'lucide:cone',
      description: t('Thorough and analytical with a focus on the particulars and finalizing projects.||Grundig og analytisk med fokus på nuancer og at tilendebringe projekter.'),
      pair: 1,
    },,
    {
      title: t('Design||Design'),
      icon: 'lucide:brush',
      description: t('An eye for the visual, and a flair for form that informs function with the user in mind.||Et øje for det visuelle og flair for form, der præger funktion med brugeren i centrum.'),
      pair: 2,
    },
    {
      title: t('Tech||Teknik'),
      icon: 'lucide:wrench',
      description: t('Proficient with technical tools to develop, calculate, and test real solutions.||Erfaren med tekniske værktøjer til at udvikle, udregne og teste reelle løsninger.'),
      pair: 2
    },
    
  ]
})
const traitPairs = computed(() => {
  const colors = ['primary' as const, 'secondary' as const, 'tertiary' as const]
  return colors.map((color, i) => ({
    color,
    traits: traits.value.filter(trait => trait?.pair == i)
  }))
})
</script>
<template>
  <div>
    <UPageHero
      title="Adam Golan"
      :description="t('A product developer with a technical mind & a flair for design. Experienced team worker but enjoys digging deep in technical tasks independently.||Produktudvikler med teknisk hjerne & flair for design. Erfaren gruppearbejder men nyder at dykke ned i tekniske opgaver selvstændigt.')"
      :links="[
        // {
        //   label: 'Read more about me',
        //   to: '/about',
        //   trailingIcon: 'i-lucide-arrow-right',
        //   size: 'xl'
        // },
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
          <UFieldGroup>
            <UBadge :label="t('Location||Lokation')"
              icon="i-lucide-map-pin"
              variant="outline"
              color="neutral"
            >
            </UBadge>
            <UBadge :label="t('Odense, Denmark||Odense')"
              variant="outline"
              color="neutral"
              :ui="{
                label: 'text-primary'
              }"
            >
            </UBadge>
          </UFieldGroup>
          <UFieldGroup>
            <UBadge :label="t('Languages||Sprog')"
              icon="i-lucide-languages"
              variant="outline"
              color="neutral"
            >
            </UBadge>
            <UBadge :label="t('English||Dansk')"
              variant="outline"
              color="neutral"
              :ui="{
                label: 'text-primary'
              }"
            >
            </UBadge>
            <UBadge :label="t('Danish||Engelsk')"
              variant="outline"
              color="neutral"
              :ui="{
                label: 'text-primary'
              }"
            >
            </UBadge>
            <UBadge :label="t('Hebrew||Hebraisk')"
              variant="outline"
              color="neutral"
              :ui="{
                label: 'text-primary'
              }"
            >
            </UBadge>
          </UFieldGroup>
        </div>
      </template>
      <template #links>
        <UButton :label="t('Read more about me||Læs mere om mig')"
          size="xl"
          to="/about"
          trailing-icon="i-lucide-arrow-right"
        >
        </UButton>
        <UButton
          :label="t('See projects||Se projekter')"
          trailing-icon="lucide:arrow-right"
          size="xl"
          variant="subtle"
          to="/projects"
        ></UButton>
        <MultiIconButton :label="t('Or get in touch||Eller tag kontakt')"
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
    <!-- <UContainer class=" pb-20">
      <UPageGrid>
        <UPageFeature
          v-for="trait in traits"
          v-bind="trait"
        >
        </UPageFeature>
      </UPageGrid>
    </UContainer> -->
    <!-- <UContainer class=" pb-20">
      <UPageGrid>
        <div v-for="pair in [[0, 1], [2, 3], [4, 5]]" class="flex">
          <UPageFeature
            v-for="trait in pair.map(i => traits[i])"
            v-bind="trait"
          >
          </UPageFeature>
        </div>
      </UPageGrid>
    </UContainer> -->
    <UPageSection :title="t('Key Traits||Nøgletræk')" icon="lucide:key-round">
      <!-- <div class="grid grid-cols-3 gap-6 mb-20"> -->
      <UPageGrid>
        <!-- <UCard class=" md:mx-30"
          variant="soft"
          v-for="traitPair in traits"
          :ui="{
            body: 'flex md:flex-row flex-col gap-3'
          }"
        >
          <UPageFeature
            v-bind="traitPair[0]"
            class=" flex-3"
          >
          </UPageFeature>
          <USeparator orientation="vertical" class="h-auto md:flex hidden"></USeparator>
          <USeparator class="md:hidden"></USeparator>
          <UPageFeature
            v-bind="traitPair[1]"
            class=" flex-3"
          >

          </UPageFeature>
        </UCard> -->
        <UPageCard class="group"
          v-for="traitPair in traitPairs"
          spotlight
          :spotlight-color="traitPair.color"
          :ui="{
            // spotlight: 'group-hover:animate-pulse'
            spotlight: 'bg-default md:bg-default/90'
          }"
        >
          <div class="flex flex-col gap-4">
            <UPageFeature
              v-for="trait in traitPair.traits"
              class=" flex-1"
              v-bind="trait"
              :ui="{
                leadingIcon: 'text-default',
                description: 'hyphen-auto'
              }"
            >
              <template #leading>
                <UIcon :name="trait?.icon" :data-color="traitPair.color" class=" size-5 data-[color=primary]:text-primary data-[color=secondary]:text-secondary data-[color=tertiary]:text-tertiary"></UIcon>
              </template>
            </UPageFeature>
          </div>
          <!-- <UPageFeature
            v-bind="traitPair.pair[1]"
            class=" flex-3"
          > -->

          <!-- </UPageFeature> -->
        </UPageCard>
      </UPageGrid>
      <USeparator orientation="vertical"></USeparator>
    </UPageSection>
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
          v-for="(skill, index) in list"
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
          <UIcon
            v-if="logo.logo"
            :name="logo.logo"
            class="size-10 md:size-20"
          ></UIcon>
          <img
            v-else-if="logo.logoImg"
            :src="logo.logoImg"
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
      :description="t('From problem to solution, and idea to product.||Fra problem til løsning og idé til produkt.')"
      :links="[
        {
          label: t('Read more||Læs mere'),
          trailingIcon: 'lucide:arrow-right',
          to: '/projects'
        }
      ]"
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
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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
