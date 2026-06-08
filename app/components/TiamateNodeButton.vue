<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { genders, type Student } from '../classes/tiamate/student';

const props = defineProps<{
  student: Student,
  appendItems?: DropdownMenuItem[],
  comemberPool?: Student[],
  previousMembers?: boolean,
  minimize?: boolean,
  draggable?: boolean,
}>()
const hover = defineModel<string>("hover", {required: false})
</script>
<template>
  <foreignObject
    :x="minimize ? -10 : -19"
    :y="minimize ? -10 : -19"
    :width="minimize ? 20 : 38"
    :height="minimize ? 20 : 38"
    :data-minimize="minimize"
    class="rounded-full bg-default data-[minimize=true]:bg-transparent group overflow-visible"
  >
    <!-- Standard HTML/Nuxt UI context starts here -->
    <TiamateStudentDropdown
      :student="student"
      :append-items="appendItems"
      :comember-pool="comemberPool"
      :previous-members="previousMembers"
      :include="['belbinRoles', 'previousMembers', 'removeStudent']"
    >
      <template #default="{student, mouseDown, mouseUp}">
        <UTooltip
          :text="student.name"
          arrow
        >
          <template #content>
            <slot name="tooltip" :student="student"></slot>
          </template>
          <div
            :data-minimize="minimize"
            class="flex justify-center items-center w-full h-full rounded-full data-[minimize=true]:hover:bg-default transition-all"
          >
            <UButton
              variant="subtle"
              :color="genders.get(student.gender)?.baseColor"
              icon="lucide:circle-user"
              :data-draggable="draggable"
              :data-hover="hover == student.name"
              :class="`rounded-full data-[draggable=true]:cursor-grab ${minimize ? 'p-2 group-hover:p-1.5 data-[hover=true]:p-1.5 transition-all' : ''}`"
              :ui="{
                leadingIcon: minimize ? `size-0 group-hover:size-5 ${hover == student.name ? 'size-5' : ''} transition-all` : ''
              }"
              @mousedown="mouseDown"
              @mouseup="mouseUp"
              @click.prevent.stop
              @mouseover="hover = student.name"
              @mouseleave="hover = ''"
            >
            </UButton>
          </div>
        </UTooltip>
      </template>
    </TiamateStudentDropdown>
  </foreignObject>
</template>