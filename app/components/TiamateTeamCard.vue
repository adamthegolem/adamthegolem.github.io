<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { Gender, genders, Student } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';
import type { IBelbinRole } from '../stores/tiamate';
import { VNetworkGraph } from 'v-network-graph';
import * as vNG from "v-network-graph"
import {
  ForceLayout,
  type ForceNodeDatum,
  type ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"

const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const { students, teams } = tiamate
const globalActiveTeamTab = defineModel<string>("activeTab", {
  required: true,
  default: '0',
})
const props = defineProps<{
  team: Team,
  index: number,
  availableStudents: Student[],
}>()
const name = computed(() => {
  return `${t('Team||Gruppe')} ${props.index + 1}`
})
const activeTeamTab = ref(globalActiveTeamTab)
// watch(activeTeamTab, () => {
//   globalActiveTeamTab = activeTeamTab.value
// })
// watch(globalActiveTeamTab, () => {

// })
// const activeTeamTab = computed({
//   get: () => globalActiveTeamTab,
//   set: (value) => globalActiveTeamTab = value
// })
const roleBalanceWeight = defineModel<number>("roleBalanceWeight", {
  required: true,
  default: 1,
})
const genderBalanceWeight = defineModel<number>("genderBalanceWeight", {
  required: true,
  default: 1,
})
const pastComembersWeight = defineModel<number>("pastComembersWeight", {
  required: true,
  default: 1,
})
const studentDropdownAppendItems = (student: Student): DropdownMenuItem[] => [
  {
    type: 'separator'
  },
  {
    label: t('Remove student||Fjern studerende'),
    icon: 'lucide:x',
    color: 'error',
    onSelect: () => {
      const index = props.team.members.indexOf(student)
      if (index > -1) {
        props.team.members.splice(index, 1)
      }
    }
  }
]
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
const emptySeats = computed(() => props.team.seats - props.team.members.length)
const getNuxtVariable = (variableName: string): string => {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(variableName).trim();
};
const configs = computed(() => {

  return vNG.defineConfigs({
    view: {
      scalingObjects: true,
      minZoomLevel: 0.1,
      maxZoomLevel: 16,
      
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true,
        createSimulation: (d3, nodes, edges) => {
          // d3-force parameters
          const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
          return d3
            .forceSimulation(nodes)
            .force("edge", forceLink.distance(100).strength(0.1))
            // .force("charge", d3.forceManyBody().strength(-1))
            .force("collide", d3.forceCollide(20).strength(0.5))
            .force("center", d3.forceCenter().strength(0.5))
            .alphaMin(0.001)

            // * The following are the default parameters for the simulation.
            // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
            // return d3
            //   .forceSimulation(nodes)
            //   .force("edge", forceLink.distance(100))
            //   .force("charge", d3.forceManyBody())
            //   .force("collide", d3.forceCollide(50).strength(0.2))
            //   .force("center", d3.forceCenter().strength(0.05))
            //   .alphaMin(0.001)
        }
      }),
    },
    node: {
      label: {
        color: isDark.value ? 'white' : 'black'
        // color: getNuxtVariable('--ui-text')
      },
      normal: {
        color: getNuxtVariable('--ui-bg-accented')
      },
      hover: {
        color: getNuxtVariable('--ui-bg-inverted')
      },
      // draggable: false,
    },
    edge: {
      normal: {
        color: getNuxtVariable('--ui-bg-accented')
      },
      hover: {
        color: getNuxtVariable('--ui-bg-inverted')
      },
    }
  })
})
const allPreviousTeams = computed(() => {
  const initArray: string[] = []
  props.team.members.forEach(member => initArray.push(...member.previousTeams))
  return [...new Set(initArray)]
})
const nodeEdges = computed(() => {
  const edges: [string, any][] = []
  let index = 0
  allPreviousTeams.value.forEach(team => {
    const members = props.team.members.filter(member => member.previousTeams.includes(team))
    for (let i = 0; i < members.length; i++) {
      members.slice(i + 1, members.length).forEach(member => {
        edges.push([
          `edge${index}`,
          {
            source: members[i]?.name || '',
            target: member.name,
          }
        ])
        index++
      })
    }
  })
  return Object.fromEntries(edges)
})
const nodes = computed(() => {
  return Object.fromEntries(props.team.members.map(member => [
    member.name, {
      // name: member.name,
      // color: getNuxtVariable(`--ui-${genders.get(member.gender)?.baseColor}`),
      
    }
  ]))
})
</script>
<template>
  <UCard
    :ui="{
      body: 'sm:p-0',
      header: 'sm:p-1',
      footer: 'sm:p-1',
    }"
  >
    <template #header>
      <div class="flex gap-2 items-center">
        <div class="flex text-xs uppercase font-bold grow items-center gap-2 px-1">
          <UIcon name="lucide:users" class="size-5"></UIcon>
          {{ name }}
          <TiamateSeatBadge :team="team" interactable></TiamateSeatBadge>
          <!-- <UBadge icon="lucide:lock"
            color="neutral"
            variant="outline"
          ></UBadge> -->
        </div>
        <UDropdownMenu
          arrow
          :items="[
            // {
            //   label: t(!team.locked ? 'Lock team||Lås gruppe' : 'Unlock team||Lås gruppe op'),
            //   icon: !team.locked ? 'lucide:lock-open' : 'lucide:lock',
            //   onSelect: () => {
            //     team.locked = !team.locked
            //   }
            // },
            {
              label: t('Clear members||Ryd medlemmer'),
              icon: 'lucide:list-x',
              onSelect: () => {
                team.members = []
              }
            },
            {
              label: t('Delete team||Slet gruppe'),
              icon: 'lucide:trash',
              color: 'error',
              onSelect: () => {
                const index = teams.indexOf(team)
                if (index > -1) {
                  teams.splice(index, 1)
                }
              }
            },
          ]"
        >
          <UButton
            icon="lucide:ellipsis"
            color="neutral"
            variant="ghost"
          ></UButton>
        </UDropdownMenu>
      </div>
    </template>
    
    <UTabs
      :items="[
        {
          icon: 'lucide:circle-user',
          slot: 'seats' as const,
        },
        {
          icon: 'lucide:list',
          slot: 'list' as const,
        },
        {
          icon: 'lucide:compass',
        },
        {
          icon: 'lucide:waypoints',
          slot: 'nodes' as const,
        },
      ]"
      :ui="{
        indicator: 'rounded',
        list: 'rounded-none gap-1 bg-transparent h-full justify-items-start',
        trigger: 'p-1',
        root: 'items-start gap-0',
        content: 'p-0 aspect-square border-l border-l-default overflow-auto',
      }"
      orientation="vertical"
      color="neutral"
      v-model="globalActiveTeamTab"
    >
      <template #seats>
        <div class="grid grid-cols-5 gap-2 p-2">
          <TiamateStudentDropdown
            v-for="member in team.members"
            :student="member"
            :append-items="studentDropdownAppendItems(member)"
            arrow
            :comember-pool="team.members"
            previous-members
          >
            <template #label2-label="{item}">
              <span class=" font-normal">
                {{(item as {label: string}).label}}
              </span>
            </template>
            <UButton
              icon="lucide:circle-user"
              variant="subtle"
              :color="genders.get(member.gender)?.baseColor||'neutral'"
              class="rounded-full aspect-square justify-center"
            ></UButton>
          </TiamateStudentDropdown>
          <TiamateSeatDropdown
            v-for="seat in emptySeats"
            :modal="false"
            :team="team"
            :available-students="availableStudents"
            :arrow="true"
            :ui="{
              viewport: 'max-h-80'
            }"
          >
            <UButton
              icon="lucide:armchair"
              class="rounded-full aspect-square justify-center"
              color="neutral"
              variant="outline"
            ></UButton>
            <template #student-trailing="{item}">
              <UTooltip
                v-for="belbinRole in Array.from((item as {student: Student}).student.belbinRoles).slice(0, 1).map(role => [belbinRoles.find(({id}) => id == role[0]), role[1]] as [IBelbinRole, number])"
                :text="`${t(belbinRole[0].name)}: ${belbinRole[1] * 100}%`"
                arrow
              >
                <UIcon
                  class="shrink-0 size-5"
                  :name="belbinRole[0].icon"
                ></UIcon>
              </UTooltip>
              <!-- {{ (item as {student: Student}).student.belbinRoles }} -->
            </template>
          </TiamateSeatDropdown>
          <UTooltip
            :text="t('Add seat||Tilføj plads')"
            arrow
          >
            <UButton
              icon="lucide:plus"
              variant="ghost"
              color="neutral"
              class="rounded-full aspect-square justify-center"
              @click="team.seats++"
            ></UButton>
          </UTooltip>
        </div>
      </template>
      <template #list>
        <div class="flex flex-col gap-1 p-2">
          <TiamateStudentDropdown
            v-for="member in team.members"
            :student="member"
            :append-items="studentDropdownAppendItems(member)"
            arrow
            :comember-pool="team.members"
            previous-members
          >
            <UButton
              :label="member.name"
              variant="subtle"
              :color="genders.get(member.gender)?.baseColor"
              size="sm"
              icon="lucide:circle-user"
            ></UButton>
          </TiamateStudentDropdown>
          <TiamateSeatDropdown
            v-for="seat in emptySeats"
            :team="team"
            :available-students="availableStudents"
          >
            <UButton
              :label="t('Empty seat||Ledig plads')"
              size="sm"
              icon="lucide:armchair"
              variant="outline"
              color="neutral"
            ></UButton>
          </TiamateSeatDropdown>
          <UButton
            :label="t('Add seat||Tilføj plads')"
            size="sm"
            variant="ghost"
            color="neutral"
            icon="lucide:plus"
            @click="team.seats++"
          ></UButton>
        </div>
      </template>
      <template #nodes>
        <VNetworkGraph
          :nodes="nodes"
          :configs="configs"
          :edges="nodeEdges"
        >
          <template #override-node="{ nodeId, scale, config, ...slotProps }">
            <!-- <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps" /> -->
            <foreignObject
              :x="-19" 
              :y="-19"
              width="38"
              height="38"
              class="rounded-full bg-default"
            >
              <!-- Standard HTML/Nuxt UI context starts here -->
              <TiamateStudentDropdown
                :student="(students.find(student => student.name == nodeId) as Student)"
                :append-items="studentDropdownAppendItems((students.find(student => student.name == nodeId) as Student))"
                right-click
                :comember-pool="team.members"
                previous-members
              >
                <template #default="{student}">
                  <UTooltip
                    :text="student.name"
                    arrow
                  >
                    <div class="flex justify-center items-center w-full h-full">
                      <UButton
                        variant="subtle"
                        :color="genders.get(student.gender)?.baseColor"
                        icon="lucide:circle-user"
                        class="rounded-full cursor-grab"
                      >
                      </UButton>
                    </div>
                  </UTooltip>
                </template>
              </TiamateStudentDropdown>
            </foreignObject>
          </template>
        </VNetworkGraph>
      </template>
    </UTabs>
    <!-- Footer -->
    <template #footer>
      <div class="flex gap-1">
        <TiamateScoreBadge
          v-model:weight="roleBalanceWeight"
          icon="lucide:scale"
          label="Belbin role balance||Belbin-rollefordeling"
        ></TiamateScoreBadge>
        <TiamateScoreBadge
          v-model:weight="genderBalanceWeight"
          icon="lucide:venus-and-mars"
          label="Gender balance||Kønsfordeling"
        ></TiamateScoreBadge>
        <TiamateScoreBadge
          v-model:weight="pastComembersWeight"
          icon="lucide:clock"
          label="Past co-members||Tidligere medlemmer"
        ></TiamateScoreBadge>
        <UBadge
          icon="lucide:equal"
          label="100%"
          variant="outline"
          color="success"
          class="justify-center grow font-mono"
        ></UBadge>
      </div>
    </template>
  </UCard>
</template>