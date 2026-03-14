<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { genders, type Student } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';
type ItemId = "addToTeams" | "previousMembers" | "removeStudent" | "belbinRoles"
const props = defineProps<{
  student: Student,
  appendItems?: DropdownMenuItem[],
  addToTeams?: boolean,
  comemberPool?: Student[],
  previousMembers?: boolean,
  removeStudent?: boolean,
  include: ItemId[],
}>()
const { teams } = useTiamateStore()
const { t } = useLanguageStore()
const tiamate = useTiamateStore()

const separator: DropdownMenuItem = {
  type: 'separator',
}

const items = computed((): DropdownMenuItem[] => {
  const include = props.include || []

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
      scoreIncrease: Math.round((tiamate.calculateAverageScore([...team.members, props.student]) - teamAverageScore(team)) * 100),
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
  const removeStudentItem: DropdownMenuItem[] = team.value ? [
    {
      type: 'separator'
    },
    {
      label: t('Remove student||Fjern studerende'),
      icon: 'lucide:x',
      color: 'error',
      onSelect: () => {
        const index = (team.value as Team).members.indexOf(props.student)
        if (index > -1) {
          (team.value as Team).members.splice(index, 1)
        }
      }
    }
  ] : []
  const includedItems: DropdownMenuItem[] = []
  const map = new Map<ItemId, DropdownMenuItem[]>([
    ["addToTeams", teamsItems],
    ["previousMembers", previousTeamMembersItems],
    ["removeStudent", removeStudentItem],
    ["belbinRoles", belbinRolesItems],
  ])
  include.forEach(str => {
    includedItems.push(...(map.get(str) || []))
  })
  return [
    nameItem,
    // ...belbinRolesItems,
    // ...(props.addToTeams ? teamsItems : []),
    // ...((props.previousMembers) ? previousTeamMembersItems : []),
    ...includedItems,
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
const teamAverageScore = (team: Team) => {
  const score = tiamate.calculateAverageScore(team.members)
  if (Number.isNaN(score)) return 0
  return score
}
const team = computed<Team | undefined>(() => {
  return tiamate.teams.find(team => team.members.includes(props.student))

})
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
      <div class="flex" v-for="scoreIncrease in [(item as {scoreIncrease: number}).scoreIncrease]">
        <span v-if="scoreIncrease >= 0"
          class="text-success"
        >
          +{{scoreIncrease}}%
        </span>
        <span v-else
          class="text-error"
        >
          {{scoreIncrease}}%
        </span>
        <TiamateSeatBadge :team="(item as {team: Team}).team"></TiamateSeatBadge>
      </div>
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
      <div class="flex items-center gap-1" v-for="scoreIncrease in [(item as {scoreIncrease: number}).scoreIncrease]">
        <span v-if="scoreIncrease >= 0"
          class="text-success"
        >
          +{{scoreIncrease}}%
        </span>
        <span v-else
          class="text-error"
        >
          {{scoreIncrease}}%
        </span>
        <TiamateSeatBadge :team="(item as {team: Team}).team"></TiamateSeatBadge>
      </div>
    </template>
    <slot :student="student" :mouse-up="handleMouseUp" :mouse-down="handleMouseDown"></slot>
  </UDropdownMenu>
</template>