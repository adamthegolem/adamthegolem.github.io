<script setup lang="ts">
import { belbinRoles, type Student, type IBelbinRole, BelbinRole } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';

const props = defineProps<{
  students: Student[],
  team?: Team,
  availableStudents?: Student[],
}>()
const belbinRoleAreas = [
  {
    id: BelbinRole.Coordinator,
    angle: 285,
  },
  {
    id: BelbinRole.Teamworker,
    angle: 315,
  },
  {
    id: BelbinRole.ResourceInvestigator,
    angle: 345,
  },
  {
    id: BelbinRole.Shaper,
    angle: 45,
  },
  {
    id: BelbinRole.CompleterFinisher,
    angle: 105,
  },
  {
    id: BelbinRole.Specialist,
    angle: 135,
  },
  {
    id: BelbinRole.Plant,
    angle: 165,
  },
  {
    id: BelbinRole.MonitorEvaluator,
    angle: 180 + 45 / 2,
  },
  {
    id: BelbinRole.Implementer,
    angle: 270 - 45 / 2,
  },
]
const size = ref(200)
function degToRad(deg: number) {
  return deg * (Math.PI / 180)
}
function degToCoordinates(deg: number, detract?: number) {
  const rad = degToRad(deg)
  detract = detract || 0
  return {
    x: Math.cos(rad) * (size.value / 2 - detract) + size.value / 2,
    y: Math.sin(rad) * (size.value / 2 - detract) + size.value / 2,
  }
}
</script>
<template>
  <div class="w-full overflow-hidden p-2">
    <div class="flex border border-transparent rounded-full aspect-square"
    >
      <svg class=" block w-full aspect-square" preserveAspectRatio="none" :viewBox="`0 0 ${size} ${size}`">
        <path
          d="M 100 100
            L 200 100
            A 100 100 0 0 1 100 200
            L 100 100
          "
          class="stroke-(--ui-bg) stroke-4 fill-error/20 hover:fill-error/50 transition-colors"
        />
        <!-- <circle class="stroke-(--ui-bg-accented) fill-transparent" cx="50" cy="50" r="50"></circle> -->
        <line x1="50%" y1="0" x2="50%" y2="100%" class="stroke-default stroke-1"/>
        <line x1="0" y1="50%" x2="100%" y2="50%" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(180+45).x" :y1="degToCoordinates(180+45).y" x2="50%" y2="50%" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(330).x" :y1="degToCoordinates(330).y" :x2="degToCoordinates(150).x" :y2="degToCoordinates(150).y" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(300).x" :y1="degToCoordinates(300).y" :x2="degToCoordinates(120).x" :y2="degToCoordinates(120).y" class="stroke-default stroke-1"/>
        <!-- <circle r="10%" cx="50%" cy="50%" class="fill-(--ui-bg) stroke-1 stroke-default"></circle> -->
        <foreignObject
          v-if="team && availableStudents && team.members.length < team.seats"
          width="50"
          height="50"
          :x="size / 2 - 25"
          :y="size / 2 - 25"
          class="rounded-full bg-default border border-default"
        >
          <div class="flex items-center justify-center w-full aspect-square rounded-full">
            <TiamateSeatDropdown
              
              :team="team"
              :available-students="availableStudents"
            >
                <UButton
                  class="rounded-full p-2"
                  variant="subtle"
                  color="neutral"
                  icon="lucide:user-plus"
                >
                </UButton>
            </TiamateSeatDropdown>
          </div>
        </foreignObject>
        <g
          v-for="role in belbinRoleAreas"
        >
          <foreignObject
            width="20"
            height="20"
            class=""
            :x="degToCoordinates(role.angle, 15).x - 10"
            :y="degToCoordinates(role.angle, 15).y - 10"
          >
            <UPopover
              arrow
            >
              <div
                class="flex items-center justify-center text-error"
              >
                <UIcon
                  :name="belbinRoles.find(({id}) => role.id == id)?.icon"
                  class="hover:opacity-100 opacity-50 transition-opacity cursor-help"
                ></UIcon>
              </div>
              <template #content>
                <PopoverContainer>
                  Hye
                </PopoverContainer>
              </template>
            </UPopover>
          </foreignObject>
        </g>
        <circle cx="50%" cy="50%" r="100"
          class="fill-transparent pointer-events-none stroke-1 stroke-default"
        />
      </svg>
    </div>
  </div>
</template>