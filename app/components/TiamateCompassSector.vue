<script setup lang="ts">
import { belbinRoles, type BelbinRole } from '../classes/tiamate/student';
interface Coordinates {
    x: number,
    y: number,
  }
const props = defineProps<{
  roleId: BelbinRole,
  iconCoordinates: Coordinates,
  startCoordinates: Coordinates,
  endCoordinates: Coordinates,
  size: number,
}>()
const { t } = useLanguageStore()
const role = computed(() => belbinRoles.find(({id}) => id == props.roleId))
const popoverOpen = ref(false)
</script>
<template>
  <g
    class="group cursor-help"
    @click="popoverOpen = true"
  >
    <!-- <path
      v-for="student in role.students.map((student, index) => ({
        student,
        start: degToCoordinates(role.angle + role.subWidth * (index - 1), student.belbinRoles.get(role.id)),
        end: degToCoordinates(role.angle + role.subWidth * (index ), student.belbinRoles.get(role.id)),
        radius: size / 2 * (student.belbinRoles.get(role.id) || 1),
        color: genders.get(student.gender)?.fillColor,
      }))"
      :d="`
        M ${size/2} ${size/2}
        L ${student.start.x} ${student.start.y}
        A ${student.radius} ${student.radius} 0 0 1 ${student.end.x} ${student.end.y}
        L 100 100
      `"
      :class="`${student.color} opacity-20 hover:opacity-50 transition-opacity stroke-(--ui-bg) stroke-2`"
    /> -->
    <path
      :d="`
        M 0 0
        L ${startCoordinates.x} ${startCoordinates.y}
        A ${size / 2} ${size / 2} 0 0 0 ${endCoordinates.x} ${endCoordinates.y}
      `"
      class="fill-(--ui-bg) group-hover:fill-(--ui-bg-muted) transition-colors"
    />
    <foreignObject
      width="20"
      height="20"
      class="z-20"
      :x="iconCoordinates.x - 10"
      :y="iconCoordinates.y - 10"
    >
      <UPopover
        arrow
        v-model:open="popoverOpen"
      >
        <template #anchor>
          <div
            class="flex items-center justify-center"
          >
            <UIcon
              :name="role?.icon"
              class="group-hover:text-highlighted text-(--ui-border) transition-colors cursor-help"
            ></UIcon>
          </div>
        </template>
        <template #content>
          <PopoverContainer>
            <div class="flex flex-col gap-1">
              <span class="font-bold">{{ t(role?.name) }}</span>
              <p>{{ t(role?.description) }}</p>
            </div>
          </PopoverContainer>
        </template>
      </UPopover>
    </foreignObject>
    <!-- <line
      x1="0" y1="0"
      :x2="startCoordinates.x" :y2="startCoordinates.y"
      class="stroke-1 stroke-default"
    /> -->
  </g>
</template>