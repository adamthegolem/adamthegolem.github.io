<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { Gender, genders, Student, belbinRoles, type IBelbinRole } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';
import { VNetworkGraph, VEdgeLabel } from 'v-network-graph';
import * as vNG from "v-network-graph"
import {
  ForceLayout,
  type ForceNodeDatum,
  type ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"
import { Walkthrough } from '../classes/walkthrough';

const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const util = useUtilStore()
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
      // autoPanAndZoomOnLoad: "fit-content",
      
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true,
        createSimulation: (d3, nodes, edges) => {
          // d3-force parameters
          const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id((d: {id: any}) => d.id)
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
      label: {
        color: getNuxtVariable('--ui-bg-inverted')
      },
      selectable: true,
      selected: {
        color: getNuxtVariable('--ui-bg-inverted'),
        dasharray: 0
      }
    }
  })
})
const allPreviousTeams = computed(() => {
  // const initArray: string[] = []
  // props.team.members.forEach(member => initArray.push(...member.previousTeams))
  // return [...new Set(initArray)]
  return tiamate.allPreviousTeams(props.team.members)
})
const nodeEdges = computed(() => {
  const edges: [string, any][] = []
  let index = 0
  allPreviousTeams.value.forEach(team => {
    const members = props.team.members.filter(member => member.previousTeams.includes(team))
    for (let i = 0; i < members.length; i++) {
      members.slice(i + 1, members.length).forEach(member => {
        edges.push([
          `${team}-${index}`,
          {
            source: members[i]?.name || '',
            target: member.name,
            label: team
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
const selectedEdges = ref<string[]>([])
const roleScore = computed(() => {
  return tiamate.calculateRoleScore(props.team.members)
})
const genderScore = computed(() => {
  // if (props.team.members.length == 1) return NaN 
  // const comparisons = Array.from(genders.keys()).map(gender => {
  //   const members = props.team.members.length
  //   const membersOfGender = props.team.members.filter(member => member.gender == gender).length
  //   const studentsOfGender = students.filter(student => student.gender == gender).length
  //   return util.fourNumberComparison(membersOfGender / members, studentsOfGender / students.length, 0, 1)
  // }).filter(x => !Number.isNaN(x))
  // return comparisons.reduce((prev, curr) => prev + curr, 0) / comparisons.length
  return tiamate.calculateGenderScore(props.team.members)
})
const previousTeamMembersScore = computed(() => {
  // if (tiamate.currentSemester == 1) return NaN
  // return util.threeNumberComparison(nodeCount.value, highestNodeCount.value * (tiamate.currentSemester - 1), 0)
  return tiamate.calculatePreviousTeamMembersScore(props.team.members)
})
const roleScoreWeight = ref(tiamate.roleScoreWeight)
watch(roleScoreWeight, (value) => tiamate.roleScoreWeight = value)
watch(() => tiamate.roleScoreWeight, (value, oldValue) => {if (value != oldValue) roleScoreWeight.value = value})

const genderScoreWeight = ref(tiamate.genderScoreWeight)
watch(genderScoreWeight, (value) => tiamate.genderScoreWeight = value)
watch(() => tiamate.genderScoreWeight, (value, oldValue) => {if (value != oldValue) genderScoreWeight.value = value})

const previousTeamMembersScoreWeight = ref(tiamate.previousTeamMembersScoreWeight)
watch(previousTeamMembersScoreWeight, (value) => tiamate.previousTeamMembersScoreWeight = value)
watch(() => tiamate.previousTeamMembersScoreWeight, (value, oldValue) => {if (value != oldValue) previousTeamMembersScoreWeight.value = value})

const scoreAverage = computed(() => {
  // // const scores = [...Array.from({length: genderBalanceWeight.value * 10}, () => genderScore.value)]
  // const wrapper = (score: number, weight: number) => !Number.isNaN(score) ? util.multiplyToArray(score, weight * 10) : []
  // const scores = [
  //   ...wrapper(roleScore.value, roleScoreWeight.value),
  //   ...wrapper(genderScore.value, genderScoreWeight.value),
  //   ...wrapper(previousTeamMembersScore.value, previousTeamMembersScoreWeight.value),
  // ]
  // console.log(scores)
  // return scores.reduce((prev, curr) => prev + curr, 0) / scores.length
  return tiamate.calculateAverageScore(props.team.members)
})
// const nodeCount = computed(() => {
//  return Object.values(nodeEdges.value).length
// })
// const highestNodeCount = computed(() => {
//   return props.team.members.reduce((prev, curr, i) => prev + props.team.members.slice(i + 1, props.team.members.length).length, 0)
// })

const walkthrough = ref(new Walkthrough([
  "seat-badge",
  "seats",
  "list",
  "compass",
  "nodes",
  "scores",
]))
const savedActiveTeamTab = ref("0")
watch(() => walkthrough.value.index, (value, oldValue) => {
  
  if (oldValue == -2 && value >= 0) savedActiveTeamTab.value = globalActiveTeamTab.value
  switch (walkthrough.value.items[value]) {
    case "seats":
      globalActiveTeamTab.value = "0"
      break
    case "list":
      globalActiveTeamTab.value = "1"
      break
    case "compass":
      globalActiveTeamTab.value = "2"
      break
    case "nodes":
      globalActiveTeamTab.value = "3"
      break
  }
  if (oldValue >= 0 && value == -2) globalActiveTeamTab.value = savedActiveTeamTab.value
})
const seatListItems = ref([
  {
    label: 'Click to view or modify||Klik for at se eller ændre',
    icon: 'lucide:circle-user',
  },
  {
    label: 'Click to fill a seat with a member||Klik for at pladsere et medlem',
    icon: 'lucide:armchair',
  },
  {
    label: 'Click to add a seat||Klik for at tilføje en plads',
    icon: 'lucide:plus',
  },
])
</script>
<template>
  <UCard
    :ui="{
      body: 'sm:p-0',
      header: 'sm:p-1',
      footer: 'sm:p-1',
      root: 'flex flex-col'
    }"
  >
    <template #header>
      <div class="flex gap-2 items-center">
        <div class="flex text-xs uppercase font-bold grow items-center gap-2 px-1">
          <UIcon name="lucide:users" class="size-5"></UIcon>
          {{ name }}
          <WalkthroughElement
            :walkthrough="walkthrough"
            id="seat-badge"
            icon="lucide:armchair"
            title="Seats||Pladser"
            description="See how many seats are filled and click to adjust the seat count.||Se antallet af udfyldte pladser og klik for at justere det fulde antal."
          >
            <TiamateSeatBadge :team="team" interactable></TiamateSeatBadge>
          </WalkthroughElement>
          <!-- <UBadge icon="lucide:lock"
            color="neutral"
            variant="outline"
          ></UBadge> -->
        </div>
        <UButton
          icon="lucide:circle-question-mark"
          variant="ghost"
          color="neutral"
          @click="walkthrough.start()"
        ></UButton>
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
          slot: 'compass' as const,
        },
        {
          icon: 'lucide:waypoints',
          slot: 'nodes' as const,
        },
        // {
        //   icon: 'lucide:search',
        //   slot: 'search' as const,
        // },
      ]"
      :ui="{
        indicator: 'rounded light:bg-accented',
        list: 'rounded-none gap-1 bg-transparent h-full justify-items-start',
        trigger: 'p-1 light:data-[state=active]:text-default',
        root: 'items-start gap-0 ',
        content: 'p-0 aspect-square border-l border-l-default overflow-auto',
        
      }"
      orientation="vertical"
      color="neutral"
      v-model="globalActiveTeamTab"
    >
      <template #seats>
        <WalkthroughElement
          :walkthrough="walkthrough"
          id="seats"
          :content="{
            side: 'right',
          }"
          icon="lucide:circle-user"
          title="Simple List||Simpel liste"
          description="Here seats and members are listed without names.||Her er en liste af pladser og medlemmer uden navne."
          :list="seatListItems"
        >
          <div class="grid grid-cols-5 gap-2 p-2">
            <TiamateStudentDropdown
              v-for="member in team.members"
              :student="member"
              :comember-pool="team.members"
              previous-members
              :include="['previousMembers', 'removeStudent']"
            >
              <template #label2-label="{item}">
                <span class=" font-normal">
                  {{(item as {label: string}).label}}
                </span>
              </template>
              <UTooltip
                :text="member.name"
                arrow
              >
                <UButton
                  icon="lucide:circle-user"
                  variant="subtle"
                  :color="genders.get(member.gender)?.baseColor||'neutral'"
                  class="rounded-full aspect-square justify-center"
                ></UButton>
              </UTooltip>
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
              <UTooltip
                :text="t('Empty seat||Ledig plads')"
                arrow
              >
                <UButton
                  icon="lucide:armchair"
                  class="rounded-full aspect-square justify-center"
                  color="neutral"
                  variant="outline"
                ></UButton>
              </UTooltip>
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
        </WalkthroughElement>
      </template>
      <template #list>
        <WalkthroughElement
          :walkthrough="walkthrough"
          id="list"
          :content="{
            side: 'right',
          }"
          :ui="{
            container: 'h-full'
          }"
          icon="lucide:list"
          title="Extended List||Udvidet liste"
          description="Here is an extended list of seats and members with names included.||Her er en udvidet liste af pladser og medlemmer med navne."
          :list="seatListItems"
        >
          <div class="flex flex-col gap-2 p-2">
            <TiamateStudentDropdown
              v-for="member in team.members"
              :student="member"
              arrow
              :comember-pool="team.members"
              previous-members
              :include="['previousMembers', 'removeStudent']"
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
        </WalkthroughElement>
      </template>
      <template #compass>
        <WalkthroughElement
          :walkthrough="walkthrough"
          id="compass"
          :content="{
            side: 'right',
          }"
          icon="lucide:compass"
          title="Belbin compass||Belbin-kompas"
          description="Here you can view the distribution of Belbin roles for the team. The layout can be changed in settings.||Her kan du se fordelingen af Belbin-roller for gruppen. Layoutet kan ændres i indstillinger."
          :list="[
            {
              label: 'Click on a section to read about the role||Klik en sektion for at læse om rollen',
              icon: 'lucide:chart-pie'
            }
          ]"
        >
          <TiamateCompass
            :students="team.members"
            :available-students="availableStudents"
            :team="team"
          ></TiamateCompass>
        </WalkthroughElement>
      </template>
      <template #nodes>
        <WalkthroughElement
          :walkthrough="walkthrough"
          id="nodes"
          :ui="{
            container: 'h-full '
          }"
          :content="{
            side: 'right',
          }"
          icon="lucide:waypoints"
          title="Connections||Forbindelser"
          description="Here you can view connections between members which represent mutual previous teams.||Her kan du se forbindelser mellem medlemmer, der repræsenterer fælles tidligere grupper."
        >
          <div class="relative flex h-full bg-default"
              v-if="team.members.length > 0">
            <div class="flex absolute right-0 p-2 z-20">
              <UTooltip
                :text="t('Previous team||Tidligere gruppe')"
                arrow
              >
                <UBadge
                  :label="selectedEdges[0]?.split('-')[0]"
                  variant="outline"
                  class="transition-all"
                  color="neutral"
                  icon="lucide:clock"
                ></UBadge>
              </UTooltip>
            </div>
            <VNetworkGraph
              :nodes="nodes"
              :configs="configs"
              :edges="nodeEdges"
              v-model:selected-edges="selectedEdges"
            >
              <template #override-node="{ nodeId, scale, config, ...slotProps }">
                <!-- <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps" /> -->
                <TiamateNodeButton
                    :student="(students.find(student => student.name == nodeId) as Student)"
                    :comember-pool="team.members"
                    previous-members
                    draggable
                ></TiamateNodeButton>
              </template>
              <!-- <template #edge-label="{ edgeId, area, ...slotProps }">
                <foreignObject
                  :x="area.source.above.x"
                  :y="area.source.above.y"
                  :width="Math.hypot(area.target.above.x - area.source.above.x, area.target.above.y - area.source.above.y)"
                  height="20"
                  rotate="30deg"
                  class="overflow-visible"
                  :style="{
                    transform: `rotate(${Math.atan2(
                      area.target.above.y - area.source.above.y, area.target.above.x - area.source.above.x
                    ) * (180 / Math.PI)}deg)`,
                    transformOrigin: `${area.source.above.x}px ${area.source.above.y}px`
                  }"
                >
                    <UTooltip :text="`${edgeId}`">
                    <div class="flex justify-center items-center h-full w-full bg-accented">
                    </div>
                    </UTooltip>
                </foreignObject>
              </template> -->
              <!-- <template #edge-label="{ edge, ...slotProps }">
                <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
              </template> -->
            </VNetworkGraph>
          </div>
          <UEmpty
            v-else
            :ui="{
              root: 'h-full ring-0'
            }"
            icon="lucide:waypoints"
            :title="t('No members yet||Ingen medlemmer endnu')"
            :description="t('Add members to see their previous team connections.||Tilføj medlemmer for at se forbindelser fra tidligere grupper.')"
            size="sm"
            variant="naked"
          >
          </UEmpty>
        </WalkthroughElement>
      </template>
      <!-- <template #search>
        <div class="flex p-2 flex-col">
          <UForm
            class="w-full"
          >
            <UInputMenu
              class="w-full"
              :items="availableStudents.map(student => ({
                label: student.name
              }))"
            ></UInputMenu>
            <UButton
              icon="lucide:eye"
              :label="t('Preview')"
              color="neutral"
              variant="subtle"
            ></UButton>
          </UForm>
        </div>
      </template> -->
    </UTabs>



    <!-- Footer -->
    <template #footer>
      <WalkthroughElement
        :walkthrough="walkthrough"
        id="scores"
        icon="lucide:award"
        title="Scores||Scorer"
        description="The team is evaluated continuously on the points below. To change the weight of a score, click on it and adjust the slider.||Gruppen evalueres løbende på nedenstående punkter. For at ændre vægtningen af en score, klik på den og justér slideren."
        :list="[
          {
            label: 'Belbin role balance||Belbin-rollefordeling',
            icon: 'lucide:scale',
          },
          {
            label: 'Gender balance||Kønsfordeling',
            icon: 'lucide:venus-and-mars',
          },
          {
            label: 'Previous members||Tidligere medlemmer',
            icon: 'lucide:clock',
          },
          {
            label: 'Average||Gennemsnit',
            icon: 'lucide:equal',
          },
        ]"
      >
        <template #description>
          <!-- <p>
            {{t('The team is evaluated continuously on||Gruppen evalueres løbende på')}} <UBadge
              :label="t('Belbin roles,||Belbin-roller,')"
              variant="outline"
              color="neutral"
              icon="lucide:scale"
              class="align-middle m-1"
            ></UBadge> <UBadge
              :label="t('gender balance,||Kønsfordeling,')"
              variant="outline"
              color="neutral"
              icon="lucide:venus-and-mars"
              class="align-middle m-1"
            ></UBadge> <UBadge
              :label="t('previous members,||tidligere medlemmer,')"
              variant="outline"
              color="neutral"
              icon="lucide:clock"
              class="align-middle m-1"
            ></UBadge>{{ t(' and || og ') }}<UBadge
              :label="t('all of the above on average.||gennemsnittet af disse.')"
              variant="outline"
              color="neutral"
              icon="lucide:equal"
              class="align-middle m-1"
            ></UBadge>
          </p> -->
          <!-- <p class="[&_.iconify]:align-middle [&_.iconify]:size-5 *:text-highlighted ">
            {{t('The team is evaluated continuously on ||Gruppen evalueres løbende på ')}} 
            <span>
              {{ t('Belbin roles||Belbin-roller') }}
              <UIcon
                name="lucide:scale"
              ></UIcon>
            </span>,
            <span>
              {{ t('gender balance||kønsfordeling') }}
              <UIcon
                name="lucide:venus-and-mars"
              ></UIcon>
            </span>,
            <span>
              {{ t('previous members||tidligere medlemmer') }}
              <UIcon
                name="lucide:clock"
              ></UIcon>
            </span>
            {{ t(', and || og ') }}
            <span>
              {{ t('all of the above on average||gennemsnittet af disse') }}
              <UIcon
                name="lucide:equal"
              ></UIcon>
            </span>.
            {{ t('To change the weight of a score, click on it and adjust the slider.||For at ændre vægtningen af en score, klik på den og justér slideren.') }}
          </p> -->
        </template>
        <div class="flex gap-1 flex-wrap ">
          <TiamateScoreBadge
            :value="roleScore"
            v-model:weight="roleScoreWeight"
            icon="lucide:scale"
            label="Belbin role balance||Belbin-rollefordeling"
          ></TiamateScoreBadge>
          <TiamateScoreBadge
            :value="genderScore"
            :change-values="[0.5, 0.7]"
            v-model:weight="genderScoreWeight"
            icon="lucide:venus-and-mars"
            label="Gender balance||Kønsfordeling"
          ></TiamateScoreBadge>
          <TiamateScoreBadge
            :value="previousTeamMembersScore"
            v-model:weight="previousTeamMembersScoreWeight"
            icon="lucide:clock"
            label="Past co-members||Tidligere medlemmer"
          ></TiamateScoreBadge>
          <TiamateScoreBadge
            :value="scoreAverage"
            icon="lucide:equal"
            :label="t('Average score||Gennemsnitlig score')"
          ></TiamateScoreBadge>
          <!-- <UBadge
            icon="lucide:equal"
            :label="`${scoreAverage}%`"
            variant="outline"
            color="success"
            class="justify-center grow font-mono"
          ></UBadge> -->
        </div>
      </WalkthroughElement>
    </template>
  </UCard>
</template>