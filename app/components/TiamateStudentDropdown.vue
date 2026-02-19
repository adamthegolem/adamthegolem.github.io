<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { genders, type Student } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';

const props = defineProps<{
  student: Student,
  appendItems?: DropdownMenuItem[],
  addToTeams?: boolean,
  comemberPool?: Student[],
  previousMembers?: boolean,
}>()
const { teams } = useTiamateStore()
const { t } = useLanguageStore()

const separator: DropdownMenuItem = {
  type: 'separator',
}

const items = computed((): DropdownMenuItem[] => {
  const nameItem: DropdownMenuItem = {
    label: props.student.name,
    type: 'label',
    icon: genders.get(props.student.gender)?.icon,
    color: genders.get(props.student.gender)?.baseColor
  }
  const belbinRolesItems: DropdownMenuItem[] = [
    separator,
    {
      type: 'label',
      label: t('Belbin roles||Belbin-roller')
    },
    ...(props.student.belbinRolesExtended.map(role => ({
      label: `${t(role.name)}: ${role.percentage}`,
      type: 'label',
      icon: role.icon,
      slot: 'label2' as const,
    })) as DropdownMenuItem[]),
  ]
  const teamsItems: DropdownMenuItem[] = [
    separator,
    {
      label: t('Add to team||Tilføj til gruppe'),
      type: 'label',
    },
    ...(teams.map((team, index) => ({
      label: `${t('Team||Gruppe')} ${index + 1}`,
      icon: 'lucide:users',
      onSelect: () => {
        team.members.push(props.student)
      },
      slot: 'team' as const,
      team: team,
      disabled: team.members.length >= team.seats,
    }))),
  ]
  const previousMembers: DropdownMenuItem[] = props.comemberPool?.filter(student => student.previousTeams.some(team => props.student.previousTeams.includes(team))).filter(student => student != props.student).map(member => ({
    label: member.name,
    type: 'label',
    slot: 'label2',
    icon: 'lucide:circle-user',
  })) || []
  const previousTeamMembersItems: DropdownMenuItem[] = [
    separator,
    {
      label: `${t('Previous team members||Tidligere gruppemedlemmer')} (${previousMembers.length})`,
      type: 'label',
    },
    ...previousMembers
  ]
  return [
    nameItem,
    ...belbinRolesItems,
    ...(props.addToTeams ? teamsItems : []),
    ...((props.previousMembers) ? previousTeamMembersItems : []),
    ...(props.appendItems || []),
  ]
})
const isOpen = ref(false)
let startTime = 0
let button: number;
const handleMouseDown = (event: MouseEvent) => {
  startTime = Date.now()
  button = event.button
}

const handleMouseUp = (event: MouseEvent) => {
  const duration = Date.now() - startTime
  // Only toggle if the click was shorter than 200ms
  if (duration < 200 && button == 0) {
    isOpen.value = !isOpen.value
  }
}
</script>
<template>
  <UContextMenu
    v-if="false"
    :items="items"
    :ui="{
      item: 'items-center',
    }"
    arrow
    :modal="false"
    
  >
    <template #label2-label="{item}">
      <span class=" font-normal">
        {{(item as {label: string}).label}}
      </span>
    </template>
    <template #team-trailing="{item}">
      <TiamateSeatBadge :team="(item as {team: Team}).team"></TiamateSeatBadge>
    </template>
    <slot :student="student"></slot>
  </UContextMenu>
  <UDropdownMenu
    :items="items"
    :ui="{
      item: 'items-center',
    }"
    arrow
    :modal="false"
    v-model:open="isOpen"
  >
    <template #label2-label="{item}">
      <span class=" font-normal">
        {{(item as {label: string}).label}}
      </span>
    </template>
    <template #team-trailing="{item}">
      <TiamateSeatBadge :team="(item as {team: Team}).team"></TiamateSeatBadge>
    </template>
    <slot :student="student" :mouse-up="handleMouseUp" :mouse-down="handleMouseDown"></slot>
  </UDropdownMenu>
</template>