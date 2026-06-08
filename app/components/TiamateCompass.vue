<script setup lang="ts">
import { VNetworkGraph } from 'v-network-graph';
import { belbinRoles, type Student, type IBelbinRole, BelbinRole, genders } from '../classes/tiamate/student';
import type { Team } from '../classes/tiamate/team';
import * as vNG from "v-network-graph"
import {
  ForceLayout,
  type ForceNodeDatum,
  type ForceEdgeDatum,
  
} from "v-network-graph/lib/force-layout"
import * as d3 from "d3-force"
// Import the specific Type interfaces
import type { SimulationNodeDatum, forceSimulation } from "d3-force"
const props = defineProps<{
  students: Student[],
  team?: Team,
  availableStudents?: Student[],
}>()
const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const classic = ref(tiamate.classicCompassLayout)
watch(classic, () => {
  tiamate.classicCompassLayout = classic.value
})
watch(() => tiamate.classicCompassLayout, (value, oldValue) => {
  if (value != oldValue) classic.value = value
})
const belbinRoleAreasClassic: {
  id: BelbinRole,
  angle?: number,
  startAngle?: number,
  width: number,
}[] = [
  {
    id: BelbinRole.Coordinator,
    angle: 285,
    startAngle: 270,
    width: 30,
  },
  {
    id: BelbinRole.Teamworker,
    angle: 315,
    width: 30,
  },
  {
    id: BelbinRole.ResourceInvestigator,
    angle: 345,
    width: 30,
  },
  {
    id: BelbinRole.Shaper,
    angle: 45,
    width: 90,
  },
  {
    id: BelbinRole.CompleterFinisher,
    angle: 105,
    width: 30,
  },
  {
    id: BelbinRole.Specialist,
    angle: 135,
    width: 30,
  },
  {
    id: BelbinRole.Plant,
    angle: 165,
    width: 30,
  },
  {
    id: BelbinRole.MonitorEvaluator,
    angle: 180 + 45 / 2,
    width: 45,
  },
  {
    id: BelbinRole.Implementer,
    angle: 270 - 45 / 2,
    width: 45,
  },
]
const belbinRoleAreasEqual = [
  BelbinRole.Plant,
  BelbinRole.MonitorEvaluator,
  BelbinRole.Specialist,
  BelbinRole.Implementer,
  BelbinRole.CompleterFinisher,
  BelbinRole.Shaper,
  BelbinRole.Coordinator,
  BelbinRole.Teamworker,
  BelbinRole.ResourceInvestigator,
].map(id => ({
  id,
  width: 40,
}))
const belbinRoleAreas = computed(() => {
  return classic.value ? belbinRoleAreasClassic : belbinRoleAreasEqual
})
const size = ref(200)
function degToRad(deg: number) {
  return deg * (Math.PI / 180)
}
function cummulativeAngle(index: number) {
  return belbinRoleAreas.value.slice(0, index + 1).reduce((prev, curr) => prev + curr.width, 0)
}
function degToCoordinates(deg: number, multiplier?: number) {
  const rad = degToRad(deg + 270)
  multiplier = multiplier || 1
  return {
    x: Math.cos(rad) * (size.value / 2 * multiplier) ,
    y: Math.sin(rad) * (size.value / 2 * multiplier),
  }
}
const map = computed(() => {
  return new Map(belbinRoleAreas.value.map((area, index) => [
    area.id,
    props.students.filter(student => student.belbinRoles.has(area.id)).map((student, i, array) => ({
      angle: belbinRoleAreas.value.slice(0, index + 1).reduce((prev, curr) => prev + curr.width, 0),
      student,
      area,
      subWidth: area.width / array.length,
      studentsCount: array.length,
    })).map((role, index) => ({
      ...role,
      start: degToCoordinates(role.angle + role.subWidth * (index - role.studentsCount), role.student.belbinRoles.get(area.id)),
      end: degToCoordinates(role.angle + role.subWidth * (index - role.studentsCount + 1), role.student.belbinRoles.get(area.id)),
      radius: size.value / 2 * (role.student.belbinRoles.get(area.id) || 1),
      fillColor: genders.get(role.student.gender)?.fillColor,
      baseColor: genders.get(role.student.gender)?.baseColor,
    })).map((role, index) => ({
      ...role,
      middle: degToCoordinates(role.angle + (role.subWidth) * (index - role.studentsCount) + (role.subWidth / 2), role.student.belbinRoles.get(area.id))
    }))
  ]))
})

const configs = computed(() => {
  console.log(props.students.length)
  return vNG.defineConfigs({
    view: {
      layoutHandler: new ForceLayout({
        createSimulation: (d3, nodes, edges) => {
          const nodeData = (d: SimulationNodeDatum) => {
            const id = nodes.find(x => x.index == d.index)?.id || ''
            const split = id.split("||")
            const magnitude = Number(split[1] || 1)
            const role = split[0] as BelbinRole
            const belbinRole = belbinRoleAreas.value.find(x => x.id == role)
            const index = belbinRole ? belbinRoleAreas.value.indexOf(belbinRole) : 0
            return {
              magnitude,
              role,
              angle: cummulativeAngle(index) - (belbinRole?.width || 0) / 2
            }
          }
          return d3.forceSimulation(nodes)
            // .force("edge", d3.forceLink(edges).id((d: {id: any}) => d.id))
            // .force("charge", d3.forceManyBody().strength(-100))
            .force("collide", d3.forceCollide(9).strength(0.5))
            .force("radius", d3.forceRadial(1).strength(-0))
            // Per-node X coordinate logic
            .force("x", d3.forceX(d => {
              // if (d.type === "source") return 0
              // if (d.type === "target") return 500
              const data = nodeData(d)
              return degToCoordinates(data.angle, data.magnitude).x
            }).strength(1)) 
            // Per-node Y coordinate logic
            .force("y", d3.forceY((d) => {
              const data = nodeData(d)
              return degToCoordinates(data.angle, data.magnitude).y
            }).strength(1))
            .force("boundary", () => {
              for (const n of nodes) {
                if (n.x !== undefined && n.y !== undefined) {
                  // Define your bounds (example: -500 to 500)
                  const minX = -size.value/2, maxX = size.value/2
                  const minY = -size.value/2, maxY = size.value/2
                  const padding = 0

                  n.x = Math.max(minX + padding, Math.min(maxX - padding, n.x))
                  n.y = Math.max(minY + padding, Math.min(maxY - padding, n.y))
      }
              }
            })
        }
      }),
      zoomEnabled: false,
      panEnabled: false,
      
    },
    node: {
      normal: {
        radius: 10,
      },
      draggable: false,
    }
  })
}) 
const graph = ref<vNG.VNetworkGraphInstance>()
watch(graph, () => {
  graph.value?.setViewBox({
    left: -120,
    top: -120,
    right: 120,
    bottom: 120,
  })

})
const nodes = computed(() => {
  return Object.fromEntries(belbinRoleAreas.value.flatMap(area => {
    return props.students.filter(student => student.belbinRoles.has(area.id)).map(student => [
      `${area.id}||${student.belbinRoles.get(area.id)}||${student.name}`,
      {
        // name: student.name
      }
    ])
  }))
})
const edges = computed(() => {
  const _edges: [string, any][] = []
  props.students.forEach(student => {
    const studentNodes = Object.keys(nodes.value).filter(node => node.split('||')[2] == student.name)
    studentNodes.forEach((node, index, array) => {
      const remainingNodes = studentNodes.slice(index + 1, studentNodes.length)
      console.log(remainingNodes)
      remainingNodes.forEach(remainingNode => _edges.push([
        `${student.name}||${node}||${remainingNode}`,
        {
          source: node,
          target: remainingNode,
        }
      ]))
    })
  })
  return Object.fromEntries(_edges)
})
const hoveredStudent = ref("")
</script>
<template>
  <div class="w-full overflow-hidden h-full">
    <div class="flex rounded-full aspect-square h-full relative"
    >
      <svg class=" w-full aspect-square hidden" preserveAspectRatio="none" :viewBox="`0 0 ${size} ${size}`">
        <!-- <path
          d="M 100 100
            L 200 100
            A 100 100 0 0 1 100 200
            L 100 100
          "
          class="stroke-(--ui-bg) stroke-4 fill-error/20 hover:fill-error/50 transition-colors"
        /> -->
        <!-- <circle class="stroke-(--ui-bg-accented) fill-transparent" cx="50" cy="50" r="50"></circle> -->
        <g
          v-for="student in students"
          class="group"
        >
          <!-- <path
            v-for="role in student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))"
            :d="`
              M ${size / 2} ${size / 2}
              L ${role?.start.x} ${role?.start.y}
              A ${role?.radius} ${role?.radius} 0 0 1 ${role?.end.x} ${role?.end.y}
              L ${size / 2} ${size / 2}
            `"
            :class="`${role?.fillColor} opacity-20 group-hover:opacity-30 hover:opacity-50 transition-opacity stroke-(--ui-bg) stroke-2`"
          /> -->
          <path
            v-for="roles in [student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))]"
            :d="roles.slice(1, roles.length).reduce((prev, curr) => prev + `L ${curr?.middle.x} ${curr?.middle.y}`, `M ${roles[0]?.middle.x} ${roles[0]?.middle.y} `)"
            :class="` opacity-20 group-hover:opacity-30 hover:opacity-50 transition-opacity fill-(--ui-bg-inverted) stroke-(--ui-bg) stroke-2`"
          />
          <!-- <foreignObject
            v-for="role in student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))"
            :x="(role?.middle.x||0) - 15"
            :y="(role?.middle.y||0) - 15"
            width="30"
            height="30"
            class="rounded-full"
          >
            <div
              class="flex w-full aspect-square items-center justify-center"
            >
              <UButton
                :color="role?.baseColor"
                icon="lucide:circle-user"
                class="rounded-full"
                size="xs"
              >
              </UButton>
            </div>
          </foreignObject> -->
        </g>
        <g
          v-for="role in belbinRoleAreas.map((area, index) => ({
            ...area,
            students: students.filter(student => student.belbinRoles.has(area.id)),
            ...belbinRoles.find(({id}) => id == area.id),
            angle: belbinRoleAreas.slice(0, index + 1).reduce((prev, curr) => prev + curr.width, 0),
          })).map(x => ({
            ...x,
            iconCoordinates: degToCoordinates(x.angle - x.width / 2, 0.85),
            subWidth: x.width / x.students.length
          }))"
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
          <foreignObject
            width="20"
            height="20"
            class=""
            :x="role.iconCoordinates.x - 10"
            :y="role.iconCoordinates.y - 10"
          >
            <UPopover
              arrow
            >
              <div
                class="flex items-center justify-center"
              >
                <UIcon
                  :name="role.icon"
                  class="hover:opacity-100 opacity-50 transition-opacity cursor-help"
                ></UIcon>
              </div>
              <template #content>
                <PopoverContainer>
                  <div class="flex flex-col gap-1">
                    <span class="font-bold">{{ t(role.name) }}</span>
                    <p>{{ t(role.description) }}</p>
                  </div>
                </PopoverContainer>
              </template>
            </UPopover>
          </foreignObject>
        </g>
        <line x1="50%" y1="0" x2="50%" y2="100%" class="stroke-default stroke-1"/>
        <line x1="0" y1="50%" x2="100%" y2="50%" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(180+45).x" :y1="degToCoordinates(180+45).y" x2="50%" y2="50%" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(330).x" :y1="degToCoordinates(330).y" :x2="degToCoordinates(150).x" :y2="degToCoordinates(150).y" class="stroke-default stroke-1"/>
        <line :x1="degToCoordinates(300).x" :y1="degToCoordinates(300).y" :x2="degToCoordinates(120).x" :y2="degToCoordinates(120).y" class="stroke-default stroke-1"/>
        <!-- <circle r="10%" cx="50%" cy="50%" class="fill-(--ui-bg) stroke-1 stroke-default"></circle> -->
        <foreignObject
          width="50"
          height="50"
          :x="size / 2 - 25"
          :y="size / 2 - 25"
          class="rounded-full bg-default border border-default"
        >
          <div class="flex items-center justify-center w-full aspect-square rounded-full">
            <TiamateSeatDropdown
              v-if="team && availableStudents && team.members.length < team.seats"
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
        <circle cx="50%" cy="50%" r="100"
          class="fill-transparent pointer-events-none stroke-1 stroke-default"
        />
      </svg>
      <div class="flex absolute z-30 p-2 right-0">
        <UDropdownMenu
          :items="[
            {
              type: 'label',
              label: 'Layout',
              icon: 'lucide-lab:wheel',
            },
            {
              type: 'checkbox',
              label: t('Classic||Klassisk'),
              onUpdateChecked: (checked) => {
                classic = checked
              },
              checked: classic,
            },
            {
              type: 'checkbox',
              label: t('Official||Officiel'),
              onUpdateChecked: (checked) => {
                classic = !checked
              },
              checked: !classic,
            },
          ]"
          arrow
        >
          <UButton
            icon="lucide:settings"
            variant="ghost"
            size="sm"
            color="neutral"
          ></UButton>
        </UDropdownMenu>
        <!-- <UTooltip>
          <USelectMenu
            v-model="classic"
            :items="[
              {
                label: t('Classic||Klassisk'),
                id: true,
              },
              {
                label: t('Official||Offic')
              }
            ]"
          ></USelectMenu>
        </UTooltip> -->
      </div>
      <VNetworkGraph
        ref="graph"
        class="p-2"
        :nodes="nodes"
        :configs="configs"
      >
        <template #override-node="{ nodeId, scale, config, ...slotProps }">
          <!-- <circle
            r="10"
            class="-z-20"
          /> -->
          <TiamateNodeButton
            class="hover:z-50 -z-10"
            :student="(students.find(({name}) => name == nodeId.split('||')[2]) as Student)" 
            minimize
            v-model:hover="hoveredStudent"
          >
            <template #tooltip="{student}">
                <span>{{ student.name }}</span>
                <span>({{ Number(nodeId.split('||')[1]) * 100 }}%)</span>
            </template>
          </TiamateNodeButton>
        </template>
        <svg class=" aspect-square" preserveAspectRatio="none" :viewBox="`${-size/2 -5} ${-size/2 - 5} ${size + 10} ${size +10}`">
          <!-- <path
            d="M 100 100
              L 200 100
              A 100 100 0 0 1 100 200
              L 100 100
            "
            class="stroke-(--ui-bg) stroke-4 fill-error/20 hover:fill-error/50 transition-colors"
          /> -->
          <!-- <circle class="stroke-(--ui-bg-accented) fill-transparent" cx="50" cy="50" r="50"></circle> -->
          <g
            v-if="false"
            v-for="student in students"
            class="group"
          >
            <!-- <path
              v-for="role in student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))"
              :d="`
                M ${size / 2} ${size / 2}
                L ${role?.start.x} ${role?.start.y}
                A ${role?.radius} ${role?.radius} 0 0 1 ${role?.end.x} ${role?.end.y}
                L ${size / 2} ${size / 2}
              `"
              :class="`${role?.fillColor} opacity-20 group-hover:opacity-30 hover:opacity-50 transition-opacity stroke-(--ui-bg) stroke-2`"
            /> -->
            <path
              v-for="roles in [student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))]"
              :d="roles.slice(1, roles.length).reduce((prev, curr) => prev + `L ${curr?.middle.x} ${curr?.middle.y}`, `M ${roles[0]?.middle.x} ${roles[0]?.middle.y} `)"
              :class="` opacity-20 group-hover:opacity-30 hover:opacity-50 transition-opacity fill-(--ui-bg-inverted) stroke-(--ui-bg) stroke-2`"
            />
            <!-- <foreignObject
              v-for="role in student.belbinRolesExtended.map(role => map.get(role.id)?.find(x => x.student == student))"
              :x="(role?.middle.x||0) - 15"
              :y="(role?.middle.y||0) - 15"
              width="30"
              height="30"
              class="rounded-full"
            >
              <div
                class="flex w-full aspect-square items-center justify-center"
              >
                <UButton
                  :color="role?.baseColor"
                  icon="lucide:circle-user"
                  class="rounded-full"
                  size="xs"
                >
                </UButton>
              </div>
            </foreignObject> -->
          </g>
          <TiamateCompassSector
            v-for="role in belbinRoleAreas.map((area, index) => ({
              ...area,
              students: students.filter(student => student.belbinRoles.has(area.id)),
              ...belbinRoles.find(({id}) => id == area.id),
              angle: cummulativeAngle(index) ,
            })).map(x => ({
              ...x,
              iconCoordinates: degToCoordinates(x.angle - x.width / 2, 0.85),
              subWidth: x.width / x.students.length
            }))"
            :start-coordinates="degToCoordinates(role.angle)"
            :end-coordinates="degToCoordinates(role.angle - role.width)"
            :role-id="role.id"
            :size="size"
            :icon-coordinates="role.iconCoordinates"
          >
            <!-- <path
              :d="`
                M 0 0
                L ${degToCoordinates(role.angle).x} ${degToCoordinates(role.angle).y}
                A ${size / 2} ${size / 2} 0 0 0 ${degToCoordinates(role.angle - role.width).x} ${degToCoordinates(role.angle - role.width).y}
              `"
              class="fill-(--ui-bg) group-hover:fill-(--ui-bg-muted) transition-colors"
            />
            <foreignObject
              width="20"
              height="20"
              class="z-20"
              :x="role.iconCoordinates.x - 10"
              :y="role.iconCoordinates.y - 10"
            >
              <UPopover
                arrow
              >
                <div
                  class="flex items-center justify-center"
                >
                  <UIcon
                    :name="role.icon"
                    class="group-hover:text-highlighted text-(--ui-border) transition-colors cursor-help"
                  ></UIcon>
                </div>
                <template #content>
                  <PopoverContainer>
                    <div class="flex flex-col gap-1">
                      <span class="font-bold">{{ t(role.name) }}</span>
                      <p>{{ t(role.description) }}</p>
                    </div>
                  </PopoverContainer>
                </template>
              </UPopover>
            </foreignObject>
            <line
              x1="0" y1="0"
              :x2="degToCoordinates(role.angle).x" :y2="degToCoordinates(role.angle).y"
              class="stroke-1 stroke-default"
            /> -->
          </TiamateCompassSector>
          <line
            v-for="role in belbinRoleAreas.map((area, index) => ({
              ...area,
              angle: cummulativeAngle(index) ,
            })).map(x => ({
              ...x,
              startCoordinates: degToCoordinates(x.angle),
            }))"
            x1="0" y1="0"
            :x2="role.startCoordinates.x" :y2="role.startCoordinates.y"
            class="stroke-1 stroke-default pointer-events-none"
          />
          <!-- <line x1="0" y1="-100" x2="0" y2="100" class="stroke-default stroke-1"/>
          <line x1="0" y1="50%" x2="100%" y2="50%" class="stroke-default stroke-1"/>
          <line :x1="degToCoordinates(180+45).x" :y1="degToCoordinates(180+45).y" x2="50%" y2="50%" class="stroke-default stroke-1"/>
          <line :x1="degToCoordinates(330).x" :y1="degToCoordinates(330).y" :x2="degToCoordinates(150).x" :y2="degToCoordinates(150).y" class="stroke-default stroke-1"/>
          <line :x1="degToCoordinates(300).x" :y1="degToCoordinates(300).y" :x2="degToCoordinates(120).x" :y2="degToCoordinates(120).y" class="stroke-default stroke-1"/> -->
          <!-- <circle r="10%" cx="50%" cy="50%" class="fill-(--ui-bg) stroke-1 stroke-default"></circle> -->
          <foreignObject
            width="50"
            height="50"
            :x="0 - 25"
            :y="0 - 25"
            class="rounded-full bg-default border border-default z-50"
          >
            <div class="flex items-center justify-center w-full aspect-square rounded-full">
              <TiamateSeatDropdown
                v-if="team && availableStudents && team.members.length < team.seats"
                :team="team"
                :available-students="availableStudents"
                exclude-remove-seat
              >
                  <UButton
                    class="rounded-full p-2"
                    variant="subtle"
                    color="neutral"
                    icon="lucide:user-plus"
                  >
                  </UButton>
              </TiamateSeatDropdown>
              <UButton
                v-else
                class="rounded-full p-2"
                variant="subtle"
                color="neutral"
                icon="lucide:user-plus"
                disabled
              >
              </UButton>
            </div>
          </foreignObject>
          <circle cx="0" cy="0" :r="size/2"
            class="fill-transparent pointer-events-none stroke-1 stroke-default"
          />
        </svg>

      </VNetworkGraph>
    </div>
  </div>
</template>