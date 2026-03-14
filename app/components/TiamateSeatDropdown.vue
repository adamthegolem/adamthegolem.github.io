<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { genders, type Student } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';

const props = defineProps<{
  team: Team,
  availableStudents: Student[],
  appendItems?: DropdownMenuItem[],
  excludeRemoveSeat?: boolean,
}>()
// const { teams } = useTiamateStore()
const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const separator: DropdownMenuItem = {
  type: 'separator',
}

const items = computed((): DropdownMenuItem[] => {
  const removeItem: DropdownMenuItem[] = [
    {
      label: t('Remove seat||Fjern plads'),
      icon: 'lucide:x',
      onSelect: () => {
        props.team.seats--
      },
      color: 'error',
    },
    separator,
  ]
  const recommendedStudents: DropdownMenuItem[] = [
    {
      type: 'label',
      label: t('Recommended students||Anbefalede studerende'),
    },
    ...(props.availableStudents?.map(student => ({
      label: student.name,
      // icon: genders.get(student.gender)?.icon,
      icon: 'lucide:user-plus',
      slot: 'student' as const,
      student: student,
      scoreIncrease: Math.round((tiamate.calculateAverageScore([...props.team.members, student]) - teamAverageScore.value) * 100),
      onSelect: () => {
        props.team.members.push(student)
      },
    })).sort((a, b) => b.scoreIncrease - a.scoreIncrease) as DropdownMenuItem[]),
  ]
  // const huh = [
              
              
  //             {
  //               type: 'separator',
  //             },
  //             {
  //               type: 'label',
  //               label: t('All available students||Alle tilgængelige studerende'),
  //             },
  //             ...(props.availableStudents?.map(student => ({
  //               label: student.name,
  //               icon: genders.get(student.gender)?.icon,
  //               color: genders.get(student.gender)?.baseColor,
  //               onSelect: () => {
  //                 props.team.members.push(student)
  //               },
  //             })) as DropdownMenuItem[]),
  //           ]
  return [
    ...(props.excludeRemoveSeat ? [] : removeItem),
    ...recommendedStudents,
    ...(props.appendItems || []),
  ]
})
const teamAverageScore = computed(() => {
  const score = tiamate.calculateAverageScore(props.team.members)
  if (Number.isNaN(score)) return 0
  return score
})
</script>
<template>
  <UDropdownMenu
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
    <template #student-trailing="{item}">
      <template v-for="scoreIncrease in [(item as {scoreIncrease: number}).scoreIncrease]">
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
      </template>
    </template>
    <slot></slot>
  </UDropdownMenu>
  <!-- <slot></slot> -->
</template>