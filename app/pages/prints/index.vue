<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui'

const { data: prints } = await useAsyncData("prints-index", () => {
  return queryCollection("prints").order("date", "ASC").all()
})
const { t } = useLanguageStore()
const info = useInfoStore()
useSeoMeta({
  title: computed(() => `${t("Prints||Print")} - Adam Golan`)
})
enum ApplicationStatus {
  Edit = "edit",
  Pending = "pending",
  Rejected = "rejected",
  Accepted = "accepted",
  Abandoned = "abandoned",
}
const statusBadges = computed(() => {
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
    ],
    [
      ApplicationStatus.Abandoned,
      {
        icon: "lucide:trash",
        color: "neutral",
        label: t("Abandoned||Forladt")
      }
    ],
  ])
})
enum ApplicationType {
  Unsolicited = "unsolicited",
  Listed = "listed",
  Network = "network",
}
const typeBadges = computed(() => {
  return new Map<ApplicationType, BadgeProps>([
    [
      ApplicationType.Unsolicited,
      {
        label: t('Unsolicited||Uopfordret'),
        color: 'secondary',
        icon: 'lucide:list-x',
      },
    ],
    [
      ApplicationType.Listed,
      {
        label: t('Listed||Opslået'),
        color: 'primary',
        icon: 'lucide:list-check',
      }
    ],
    [
      ApplicationType.Network,
      {
        label: t('Network||Netværk'),
        color: 'tertiary',
        icon: 'lucide:network',
      }
    ],
  ])
})
const accordionValue = ref("1")
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
          <span>
            {{ print.company }}
            <span class="text-muted">
            • {{ t(print.jobTitle || 'Design Engineer||Designingeniør') }}</span>
          </span>
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
          <UAccordion
            :items="[
              {
                slot: 'skills',
                label: t('Skills||Færdigheder')
              }
            ]"
            v-if="print.highlightedSkills?.length > 0"
          >
            <template #skills>
              <SkillBadges :skills="print.highlightedSkills||[]" :exclude-see-more="true"></SkillBadges>
            </template>
          </UAccordion>
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
  <UTable
    :data="prints?.map(print => ({
      date: print.date,
      status: print.status,
      type: print.type,
      link: print.url,
      application: print.path,
      resume: `/prints/resume/${print.path.split('/')[2]}`,
      company: print.company,
      title: print.jobTitle,
    })).reverse()"
    sticky
    class="flex-1 max-h-150"
  >
    <template #link-cell="{ row }">
      <UButton
        v-if="row.original.link"
        target="_blank"
        :to="row.original.link"
        icon="lucide:globe"
        variant="ghost"
        color="neutral"
        class=""
      ></UButton>
    </template>
    <template #application-cell="{row}">
      <UButton
        :label="t('Application||Ansøgning')"
        :to="row.original.application"
        variant="solid"
        trailing-icon="lucide:arrow-right"
      ></UButton>
    </template>
    <template #resume-cell="{row}">
      <UButton
        :label="t('Resume||CV')"
        :to="row.original.resume"
        variant="link"
        trailing-icon="lucide:arrow-right"
      ></UButton>
    </template>
    <template #status-cell="{row}">
      <UBadge
        v-bind="{...statusBadges.get(row.original.status as ApplicationStatus), variant: 'subtle'}"
      >

      </UBadge>
    </template>
    <template #type-cell="{row}">
      <UBadge
        v-bind="{...typeBadges.get(row.original.type as ApplicationType)}"
        variant="subtle"
      ></UBadge>
    </template>
  </UTable>
</UPageSection>
</template>