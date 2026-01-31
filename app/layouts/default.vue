<script setup lang="ts">
const info = useInfoStore();
const langStore = useLanguageStore()
const { t, Languages, languageOrder } = langStore;
const langCookie = useCookie("lang")
langCookie.value ||= "0"
langStore.language = languageOrder[Number(langCookie.value)]||Languages.English

watch(() => langStore.language, () => {
  // localStorage.setItem("lang", languageOrder.indexOf(langStore.language).toString())
  langCookie.value = languageOrder.indexOf(langStore.language).toString()
}) 
const iconLinks = [
  info.links.linkedIn,
  info.links.email,
]
const homeLink = computed(() => ({
  label: t('Home||Hjem'),
  icon: 'i-lucide-home',
  to: '/'
}))
const projectsLink = computed(() => ({
  label: t('Projects||Projekter'),
  icon: 'i-lucide-folders',
  to: '/projects'
}))
const experienceLink = computed(() => ({
  label: t('Experience||Erfaring'),
  icon: 'i-lucide-briefcase',
  to: '/experience'
}))
const musicLink = computed(() => ({
  label: t('Music||Musik'),
  icon: 'i-lucide-music',
  to: '/music'
}))
const aboutLink = computed(() => ({
  label: t('About||Om'),
  icon: 'i-lucide-info',
  to: '/about'
}))
const navLinks = computed((): {
  to: string,
  icon: string,
  label: string,
}[] => [
  homeLink.value,
  projectsLink.value,
  experienceLink.value,
  // musicLink
  aboutLink.value,
])
</script>
<template>
  <UHeader title="Adam Golan" class="no-print">
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>
    <template #default>

      <UNavigationMenu
        :items="navLinks"
        variant="link"
      >
      </UNavigationMenu>
    </template>
    <template #body>
      <UNavigationMenu
        :items="navLinks"
        orientation="vertical"
      >
      </UNavigationMenu>
      
      <div class=" flex justify-center mt-6">
        <USelect
          v-model="langStore.language"
          leading-icon="i-lucide-earth"
          :items="langStore.languages">
        </USelect>
      </div>
    </template>
    <template #right>

      <!-- <UButton
        to="https://github.com/nuxt-ui-templates/starter"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      /> -->
      
      <UTooltip 
        v-for="link in iconLinks"
        :text="link.label"
      >
        <UButton
          :to="link.to"
          target="_blank"
          :icon="link.icon"
          :aria-label="link.label"
          color="neutral"
          variant="ghost"
        />

      </UTooltip>
      
      
      <UTooltip :text="t('Toggle color mode||Skift farvetilstand')">
        <UColorModeButton :ui="{
          base: 'cursor-pointer',
          label: 'cursor-pointer'
        }"/>
      </UTooltip>
      <UTooltip :text="t('Change language')">
        <!-- <UButton
          icon="i-lucide-earth"
          :label="langStore.language.toString()"
          variant="outline"
          color="neutral"
          @click="langStore.language = 0"
        >
        </UButton> -->
        <USelect 
          class="hidden md:block"
          v-model="langStore.language"
          leading-icon="i-lucide-earth"
          :items="langStore.languages"
          :ui="{
            base: 'bg-default/80'
          }"
        >
          
        </USelect>
      </UTooltip>
    </template>
  </UHeader>
  <slot></slot>
  <USeparator class="no-print"/>

  <UFooter class="no-print" :ui="{
    root: ''
  }">
    <template #left>
      <p class="text-sm text-muted">
        Copyright © {{ new Date().getFullYear() }}
      </p>

    <!-- <UFooterColumns
      :columns="[
        {
          label: t('Pages||Sider'),
          children: navLinks.map(x => ({...x, target: '_blank', icon: undefined}))
        },
        {
          label: 'Links',
          children: [
            {
              label: info.links.linkedIn.label,
              target: '_blank',
              to: info.links.linkedIn.to
            }
          ]
        }
      ]"
    >
    </UFooterColumns> -->
    </template>
    <UNavigationMenu :items="[projectsLink, experienceLink, aboutLink].map(x => ({...x, target: '_blank', icon: undefined}))" variant="link">

    </UNavigationMenu>
    <template #right>
      <!-- <UButton
        to="https://github.com/nuxt-ui-templates/starter"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      /> -->
      <div class="flex gap-2">
        <UTooltip 
          v-for="link in [
            info.links.linkedIn,
            info.links.email,
            info.links.gitHub,
            info.links.bandcamp,
            info.links.youTube,
          ]"
          :text="link.label"
        >
          <UButton
            variant="link"
            :icon="link.icon"
            color="neutral"
            :to="link.to"
            target="_blank"
          >
          </UButton>
        </UTooltip>
      </div>
    </template>
  </UFooter>
</template>