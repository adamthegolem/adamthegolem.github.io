<script setup lang="ts">
import type { BadgeProps, ButtonProps } from '@nuxt/ui';
import type { Team } from '../classes/tiamate/team';

const props = defineProps<{
  team: Team,
  interactable?: boolean,
}>()
const bind = computed(() => ({
  icon: "lucide:armchair",
  color: "neutral",
  variant: "outline",
  ui: {
    label: 'font-mono',
  },
  label: `${props.team.members.length}/${props.team.seats}`
}))
const { t } = useLanguageStore()
</script>
<template>
  <UPopover
    arrow
    v-if="interactable"
    :ui="{
      content: 'backdrop-blur-lg bg-default/80'
    }"
  >
    <UButton
      v-bind="{
        ...(bind as ButtonProps),
        size: 'sm',
        variant: 'subtle'
      }"
    ></UButton>
    <template #content>
      <PopoverContainer>
        <UFormField
          :label="t('Number of seats||Antal pladser')"
        >
          <UInputNumber
            orientation="vertical"
            v-model="team.seats"
            :min="team.members.length"
            :ui="{
              base: 'bg-default/50'
            }"
          ></UInputNumber>
        </UFormField>
      </PopoverContainer>
    </template>
  </UPopover>
  <UBadge
    v-else
    v-bind="{
      ...(bind as BadgeProps),
      ui: {
        ...bind.ui,
        base: 'bg-transparent'
      }
    }"
  ></UBadge>
</template>