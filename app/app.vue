<script setup lang="ts">
const lang = useLanguageStore()
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: lang.language
  }
})

const title = 'Adam Golan'
useSeoMeta({
  title,
})
</script>

<template>
  <UApp>
    

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    
  </UApp>
</template>