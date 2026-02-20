<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';
import TiamateStudents from '../components/TiamateStudents.vue';
import TiamateTeams from '../components/TiamateTeams.vue';
import TiamatePackages from '../components/TiamatePackages.vue';
const { t } = useLanguageStore()
const stepperItems = computed(() => [
  {
    title: t('Students||Studerende'),
    icon: "lucide:graduation-cap",
    description: t("Import students as an Excel file.||Importér studerende som Excel-fil."),
    contentElement: TiamateStudents,
  },
  {
    title: t('Teams||Grupper'),
    icon: "tabler:users-group",
    description: t("Create teams manually or automatically.||Dan grupper manuelt eller automatisk."),
    contentElement: TiamateTeams,
  },
  {
    title: t('Packages||Pakker'),
    icon: "lucide:package",
    description: t("Export teams as packages in PDF files.||Eksportér grupper som pakker i PDF-filer."),
    contentElement: TiamatePackages,
  },
])
const currStep = ref(0)
</script>
<template>
  <UMain>
    <UPageSection
      :title="t('Tiamate Online')"
      :description="t('Quick team generation for Integrated Design at SDU.||Hurtig gruppedannelse for Integreret Design på SDU.')"
      icon="lucide:egg"
    >
      <UStepper
        :items="stepperItems"
        size="sm"
        :ui="{
          header: 'w-250 mx-auto',
          trigger: 'cursor-pointer group-data-[state=completed]:hover:bg-primary/50 hover:bg-accented group-data-[state=active]:hover:bg-primary group-data-[state=active]:cursor-default transition-color transition-opacity'
        }"
        v-model="currStep"
      >
        <!-- <template #content="{item}">
          <UCard>
            <component :is="item.contentElement"></component>
          </UCard>
        </template> -->
      </UStepper>
      <UCard>
        <KeepAlive>
          <component :is="stepperItems[currStep]?.contentElement" />
        </KeepAlive>
      </UCard>
    </UPageSection>
  </UMain>
</template>