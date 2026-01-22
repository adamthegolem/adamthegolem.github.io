<script setup lang="ts">
import { useInfoStore } from '../stores/info';

const info = useInfoStore();
const langStore = useLanguageStore()
const { t } = langStore
const softwareAndSystems = info.softwareAndSystems;
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
        <div class="flex justify-center gap-3">
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
    <USeparator v-if="false"></USeparator>
    <UPageSection v-if="false"
      id="features"
      title="Everything you need to build modern Nuxt apps"
      description="Start with a solid foundation. This template includes all the essentials for building production-ready applications with Nuxt UI's powerful component system."
      :features="[{
        icon: 'i-lucide-rocket',
        title: 'Production-ready from day one',
        description: 'Pre-configured with TypeScript, ESLint, Tailwind CSS, and all the best practices. Focus on building features, not setting up tooling.'
      }, {
        icon: 'i-lucide-palette',
        title: 'Beautiful by default',
        description: 'Leveraging Nuxt UI\'s design system with automatic dark mode, consistent spacing, and polished components that look great out of the box.'
      }, {
        icon: 'i-lucide-zap',
        title: 'Lightning fast',
        description: 'Optimized for performance with SSR/SSG support, automatic code splitting, and edge-ready deployment. Your users will love the speed.'
      }, {
        icon: 'i-lucide-blocks',
        title: '100+ components included',
        description: 'Access Nuxt UI\'s comprehensive component library. From forms to navigation, everything is accessible, responsive, and customizable.'
      }, {
        icon: 'i-lucide-code-2',
        title: 'Developer experience first',
        description: 'Auto-imports, hot module replacement, and TypeScript support. Write less boilerplate and ship more features.'
      }, {
        icon: 'i-lucide-shield-check',
        title: 'Built for scale',
        description: 'Enterprise-ready architecture with proper error handling, SEO optimization, and security best practices built-in.'
      }]"
    />

    <UPageSection v-if="false">
      <UPageCTA
        title="Ready to build your next Nuxt app?"
        description="Join thousands of developers building with Nuxt and Nuxt UI. Get this template and start shipping today."
        variant="subtle"
        :links="[{
          label: 'Start building',
          to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }, {
          label: 'View on GitHub',
          to: 'https://github.com/nuxt-ui-templates/starter',
          target: '_blank',
          icon: 'i-simple-icons-github',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
