<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { genders, type Student } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';

const props = defineProps<{
  team: Team,
  availableStudents: Student[],
  appendItems?: DropdownMenuItem[],
}>()
const { teams } = useTiamateStore()
const { t } = useLanguageStore()

const separator: DropdownMenuItem = {
  type: 'separator',
}

const items = computed((): DropdownMenuItem[] => {
  const removeItem: DropdownMenuItem = {
    label: t('Remove seat||Fjern plads'),
    icon: 'lucide:x',
    onSelect: () => {
      props.team.seats--
    },
    color: 'error',
  }
  const recommendedStudents: DropdownMenuItem[] = [
    separator,
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
      onSelect: () => {
        props.team.members.push(student)
      },
    })) as DropdownMenuItem[]),
  ]
  const huh = [
              
              
              {
                type: 'separator',
              },
              {
                type: 'label',
                label: t('All available students||Alle tilgængelige studerende'),
              },
              ...(props.availableStudents?.map(student => ({
                label: student.name,
                icon: genders.get(student.gender)?.icon,
                color: genders.get(student.gender)?.baseColor,
                onSelect: () => {
                  props.team.members.push(student)
                },
              })) as DropdownMenuItem[]),
            ]
  return [
    removeItem,
    ...recommendedStudents,
    ...(props.appendItems || []),
  ]
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
    <slot></slot>
  </UDropdownMenu>
</template>