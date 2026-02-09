<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui'

const { data: prints } = await useAsyncData("prints-index", () => {
  return queryCollection("prints").order("date", "ASC").all()
})
const { t } = useLanguageStore()
const info = useInfoStore()
enum ApplicationStatus {
  Edit = "edit",
  Pending = "pending",
  Rejected = "rejected",
  Accepted = "accepted",
}
const statusBadges = computed(() => {
  // return [
  //   {
  //     status: ApplicationStatus.Edit,
  //     icon: "lucide:pencil-line",
  //     color: "primary",
  //     label: t("Edit||Redigeres"),
  //   }
  // ]
  return new Map<ApplicationStatus, BadgeProps>([
    [
      ApplicationStatus.Edit,
      {
        icon: "lucide:pencil-line",
        color: "primary",
        label: t("Edit||Redigeres"),
      }
    ],
    [
      ApplicationStatus.Pending,
      {
        icon: "lucide:clock",
        color: "info",
        label: t("Pending||Afventer"),
      }
    ],
    [
      ApplicationStatus.Rejected,
      {
        icon: "lucide:circle-x",
        color: "error",
        label: t("Rejected||Afvist"),
      }
    ],
    [
      ApplicationStatus.Accepted,
      {
        icon: "lucide:circle-check",
        color: "success",
        label: t("Accepted||Accepteret")
      }
    ]
  ])
})
</script>
<template>
  <UPageSection
    :title="t('Job Search||Jobsøgning')"
  >
    <UPageGrid>
      <UBlogPost
        v-for="print in prints"
        :title="print.title"
        :date="print.date"
        :badge="{...statusBadges.get(print.status as ApplicationStatus), variant: 'subtle'}"
        :ui="{
          description: 'grow'
        }"
      >
      <!-- <template #date>
        <ULink class="text-primary" :href="print.url" target="_blank">{{ print.company }}</ULink>
        {{ print.date }}
      </template> -->
      <template #title>
        <div class="flex gap-2 items-center">
          {{ print.company }}
          <UButton
            v-if="print.url"
            target="_blank"
            :to="print.url"
            icon="lucide:globe"
            variant="ghost"
            color="neutral"
            class=""
          ></UButton>
        </div>
      </template>
      <template #description>
        <div class="flex flex-col gap-2 h-full">
          <p class=" line-clamp-2">{{ print.description||print.profile }}</p>
          <SkillBadges :skills="print.highlightedSkills||[]"></SkillBadges>
          <div class="flex gap-2 grow items-end">
            <UButton
              :label="t('Application||Ansøgning')"
              :to="print.path"
              variant="solid"
              trailing-icon="lucide:arrow-right"
            ></UButton>
            <UButton
              :label="t('Resume||CV')"
              :to="`/prints/resume/${print.path.split('/')[2]}`"
              variant="link"
              trailing-icon="lucide:arrow-right"
            ></UButton>
          </div>
        </div>
      </template>
    </UBlogPost>
  </UPageGrid>
</UPageSection>
</template>