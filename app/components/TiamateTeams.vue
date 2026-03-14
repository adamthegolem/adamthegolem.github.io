<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui';
import { genders, belbinRoles, BelbinRole } from '../classes/tiamate/student';
import { Team } from '../classes/tiamate/team';
import { Package } from '../classes/tiamate/package';

const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const util = useUtilStore()
const { students, teams, availableStudents: _availableStudents } = tiamate
const availableStudents = computed(() => {
  return students.filter(student => {
    return teams.every(team => !team.members.includes(student))
  }) || []
})
const globalActiveTeamTab = ref('0')
const numberOfSeats = ref(6)
const numberOfTeamsToAdd = ref(1)
const numberOfTeamsToAddCalculate = ref(false)
const numberOfSeatsCalculate = ref(false)
const roleFilters = ref<{
  label: string,
  icon: string,
  id: BelbinRole,
}[]>([])
const totalSeats = computed(() => teams.map(x => x.seats).reduce((prev, curr) => curr + prev, 0))
const loadingGeneration = ref(false)
async function generateTeams() {
  loadingGeneration.value = true
  tiamate.generateTeams()
}
const exampleTeam = ref(new Team({
  seats: 5,
}))
const automaticGenerationOpen = ref(false)
</script>
<template>
  <UTabs v-if="false"
    variant="link"
    :items="[
      {
        label: t('Automatic Generation||Automatisk gruppering'),
        icon: 'lucide:bot',
        slot: 'auto' as const,
      },
      {
        label: t('Manual Generation||Manuel gruppering'),
        icon: 'lucide:hand',
        slot: 'manual' as const,
      },
    ]"
    :ui="{
      list: 'justify-center mb-2'
    }"
    size="sm"
  >
    <template #manual>
      <div class="flex flex-col gap-4">
        <UFormField
          :label="t('Filter by Belbin roles ()||Filtrer ud fra Belbin-roller')"
          class="w-full"
        >
          <template #hint>
            <div class="flex gap-1">
              <UBadge
                v-for="badge in [
                  {
                    label: 'Fully satisfied||Fuldt tilfredsstillet',
                    color: 'success' as const,
                  },
                  {
                    label: 'Partially satisfied||Delvist tilfredsstillet',
                    color: 'warning' as const,
                  },
                ]"
                :label="t(badge.label)"
                variant="soft"
                color="neutral"
                size="sm"
                :ui="{
                  label: 'text-muted'
                }"
              >
                <template #leading>
                  <UChip :color="badge.color" standalone inset></UChip>
                </template>
              </UBadge>
            </div>
          </template>
          <UInputMenu
            :items="belbinRoles.map(role => ({
              label: role.name,
              icon: role.icon,
              id: role.id,
            }))"
            multiple
            v-model="roleFilters"
            class="w-full"
          >
            <template #item-label="{item}">
              {{ t(item.label) }}
            </template>
            <template #item-trailing="{item}">
              <span class="font-mono">{{ `${availableStudents.filter(student => student.belbinRolesExtended.map(role => role.id).includes(item.id)).length}/${availableStudents.length}` }}</span>
            </template>
            <template #tags-item-text="{item}">
              <div class="flex gap-1 items-center">
                <UIcon :name="item.icon" class="size-4"></UIcon>
                {{ t(item.label) }}
              </div>
            </template>
          </UInputMenu>
        </UFormField>
        <UCard
          :ui="{
            body: 'sm:p-4 h-60 overflow-y-auto'
          }"
        >
          <div class="flex gap-2 flex-wrap justify-center">
            <TiamateStudentDropdown
              v-for="student in availableStudents"
              :student="student"
              add-to-teams
              :comember-pool="students"
              previous-members
              :include="['addToTeams', 'previousMembers']"
            >
          
              <UChip
                inset
                :color="roleFilters.map(filter => filter.id).every(role => student.belbinRolesExtended.map(role2 => role2.id).includes(role)) ? 'success' : 'warning'"
                :show="!roleFilters.map(filter => filter.id).every(role => !student.belbinRolesExtended.map(role2 => role2.id).includes(role))"
              >
                <UButton
                  color="neutral"
                  variant="soft"
                  icon="lucide:circle-user"
                  :label="student.name"
                  class=" select-none rounded-full"
                  size="sm"
                >
                  <!-- <template #leading>
                    <UIcon name="lucide:grip-vertical" class=" size-4 cursor-move"></UIcon>
                  </template> -->
                </UButton>
              </UChip>
            </TiamateStudentDropdown>
          </div>
        </UCard>
      </div>
    </template>
  </UTabs>
  <div class="flex flex-col gap-4">
    <div
      class="flex gap-2 justify-end"
    >
      <UTooltip
        :text="t('Show walkthrough||Vis gennemgang')"
      >
        <UButton
          icon="lucide:circle-question-mark"
          color="neutral"
          variant="ghost"
          @click="tiamate.teamsWalkthrough.start()"
        ></UButton>
      </UTooltip>
    </div>
    <WalkthroughElement
      id="filter"
      :walkthrough="tiamate.teamsWalkthrough"
      icon="lucide:filter"
      title="Filter"
      description="Filter through the available students based on Belbin roles.||Filtrér gennem de ledige studerende baseret på Belbin-roller."
    >
      <UFormField
        :label="t('Filter by Belbin roles||Filtrér ud fra Belbin-roller')"
        class="w-full"
      >
        <template #hint>
          <div class="flex gap-1 flex-wrap">
            <UBadge
              v-for="badge in [
                {
                  label: 'Fully satisfied||Fuldt tilfredsstillet',
                  color: 'success' as const,
                },
                {
                  label: 'Partially satisfied||Delvist tilfredsstillet',
                  color: 'warning' as const,
                },
              ]"
              :label="t(badge.label)"
              variant="soft"
              color="neutral"
              size="sm"
              :ui="{
                label: 'text-muted'
              }"
            >
              <template #leading>
                <UChip :color="badge.color" standalone inset></UChip>
              </template>
            </UBadge>
          </div>
        </template>
        <UInputMenu
          :items="belbinRoles.map(role => ({
            label: role.name,
            icon: role.icon,
            id: role.id,
          }))"
          multiple
          v-model="roleFilters"
          class="w-full"
        >
          <template #item-label="{item}">
            {{ t(item.label) }}
          </template>
          <template #item-trailing="{item}">
            <span class="font-mono">{{ `${availableStudents.filter(student => student.belbinRolesExtended.map(role => role.id).includes(item.id)).length}/${availableStudents.length}` }}</span>
          </template>
          <template #tags-item-text="{item}">
            <div class="flex gap-1 items-center">
              <UIcon :name="item.icon" class="size-4"></UIcon>
              {{ t(item.label) }}
            </div>
          </template>
        </UInputMenu>
      </UFormField>
    </WalkthroughElement>
    <WalkthroughElement
      :walkthrough="tiamate.teamsWalkthrough"
      id="students"
      description="Here you can see all students available to be added to teams.||Her kan du se alle studerende, der er ledige til at blive tilføjet til grupper."
      icon="lucide:user-search"
      title="Students||Studerende"
    >
      <UCard
        :ui="{
          body: 'sm:p-4 h-60 overflow-y-auto'
        }"
      >
        <div class="flex gap-2 flex-wrap justify-center">
          <TiamateStudentDropdown
            v-for="student in availableStudents"
            :student="student"
            :comember-pool="students"
            :include="['addToTeams', 'belbinRoles', 'previousMembers']"
          >
      
            <UChip
              inset
              :color="roleFilters.map(filter => filter.id).every(role => student.belbinRolesExtended.map(role2 => role2.id).includes(role)) ? 'success' : 'warning'"
              :show="!roleFilters.map(filter => filter.id).every(role => !student.belbinRolesExtended.map(role2 => role2.id).includes(role))"
            >
              <UButton
                color="neutral"
                variant="soft"
                icon="lucide:circle-user"
                :label="student.name"
                class=" select-none rounded-full"
                size="sm"
              >
                <!-- <template #leading>
                  <UIcon name="lucide:grip-vertical" class=" size-4 cursor-move"></UIcon>
                </template> -->
              </UButton>
            </UChip>
          </TiamateStudentDropdown>
        </div>
      </UCard>
    </WalkthroughElement>
    <WalkthroughElement
      :walkthrough="tiamate.teamsWalkthrough"
      id="automatic"
      icon="lucide:bot"
      title="Automatic Generation||Automatisk gruppering"
      @activated="automaticGenerationOpen = true"
      @deactivated="automaticGenerationOpen = false"
    >
      <UCollapsible
        :items="[
          {
            icon: 'lucide:bot',
          }
        ]"
        :ui="{}"
        v-model:open="automaticGenerationOpen"
      >
        <UButton
          variant="outline"
          class="group"
          :label="t('Automatic generation||Automatisk gruppering')"
          icon="lucide:bot"
          trailing-icon="i-lucide-chevron-down"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }"
          color="neutral"
          block
        ></UButton>
        <template #content>
          <div
            class="flex gap-2 w-full mt-3"
          >
            <div class="flex grow">
            </div>
            <div class="flex gap-2 items-center">
              <UIcon
                name="lucide:loader-circle"
                class="animate-spin size-5"
                v-if="loadingGeneration"
              ></UIcon>
              <UButton
                icon="lucide:wand-sparkles"
                class=""
                variant="subtle"
                color="primary"
                :label="t('Generate teams||Generér grupper')"
                @click="generateTeams"
              ></UButton>
            </div>
          </div>
        </template>
      </UCollapsible>
    </WalkthroughElement>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 justify-center">
        <div class="flex grow">
          <WalkthroughElement
            :walkthrough="tiamate.teamsWalkthrough"
            id="total-seats"
            icon="lucide:armchair"
            title="Number of seats||Antal pladser"
            description="Compare the total number of seats to the number of students here.||Sammenlign her det samlede antal pladser med antallet af studerende."
            :ui="{
              container: 'flex'
            }"
          >
            <UFieldGroup>
              <UBadge
                :label="`${students.length} ${t('students||studerende')}`"
                icon="lucide:circle-user"
                color="neutral"
                variant="outline"
              ></UBadge>
              <UBadge
                :label="`${totalSeats} ${t('seats total||samlede pladser')}`"
                icon="lucide:armchair"
                :color="totalSeats < students.length ? 'error' : ( totalSeats > students.length ? 'warning' : 'success')"
                variant="outline"
              ></UBadge>
            </UFieldGroup>
          </WalkthroughElement>
        </div>
        <UDropdownMenu
          arrow
          :items="[
            {
              label: t('Refresh teams||Gendan grupper'),
              icon: 'lucide:list-restart',
              onSelect: () => {
                teams.forEach(team => team.members = [])
              },
            },
            {
              label: t('Delete all teams||Slet alle grupper'),
              color: 'error',
              icon: 'lucide:list-x',
              onSelect: () => {
                teams.splice(0, teams.length)
              },
            },
          ]"
        >
          <UButton
            icon="lucide:ellipsis"
            variant="ghost"
            color="neutral"
          ></UButton>
        </UDropdownMenu>
      </div>
      <div class="grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-4">
        <!-- {{ teams }} -->
        <WalkthroughElement
          :walkthrough="tiamate.teamsWalkthrough"
          id="team-card"
          icon="lucide:users"
          title="Team||Gruppe"
          hide
        >
          <TiamateTeamCard
            :team="exampleTeam"
            :index="0"
            :available-students="availableStudents"
            v-model:active-tab="globalActiveTeamTab"
          ></TiamateTeamCard>
        </WalkthroughElement>
        <TiamateTeamCard
          v-for="(team, index) in teams"
          :team="team"
          :index="index"
          :available-students="availableStudents"
          v-model:active-tab="globalActiveTeamTab"
        >
          <span>{{ t('Team||Gruppe') }} {{ index + 1 }}</span>
        </TiamateTeamCard>
        <!-- <UEmpty
          :title="t('No teams yet||Ingen grupper endnu')"
          icon="lucide:users"
          :actions="[
            {
              label: t('Add new team||Tilføj ny gruppe'),
              icon: 'lucide:plus',
              onClick: () => {teams.push(new Team())},
            },
          ]"
        >
        </UEmpty> -->
        <WalkthroughElement
          :walkthrough="tiamate.teamsWalkthrough"
          id="add-teams"
          icon="lucide:plus"
          title="Add teams||Tilføj grupper"
          description="Add a number of teams with a number of seats in each. You may adjust afterward so the total number of seats equals the number of students.||Tilføj et antal grupper med et antal pladser hver. Justér det samlede antal derefter, så det matcher antallet af studerende."
          :ui="{
            container: 'flex'
          }"
        >
          <UCard
            :ui="{
              root: 'flex flex-col',
              header: 'flex flex-col gap-2 grow items-center justify-center',
              body: 'flex flex-col gap-2 items-center',
              footer: 'flex flex-col items-center sm:p-1'
            }"
          >
            <template #header>
              <div class="bg-elevated rounded-full size-10 flex items-center justify-center">
                <UIcon name="lucide:users" class="size-5 text-muted"></UIcon>
              </div>
              <span class="text-highlighted font-medium text-pretty">
                {{ t('Add teams||Filføj grupper') }}
              </span>
            </template>
            <TiamateCalcInputNumber
              v-model="numberOfTeamsToAdd"
              v-model:calculate="numberOfTeamsToAddCalculate"
              :label="t('Number of teams||Antal grupper')"
              :calculation="() => Math.ceil(students.length / numberOfSeats - teams.length)"
            ></TiamateCalcInputNumber>
            <TiamateCalcInputNumber
              v-model="numberOfSeats"
              v-model:calculate="numberOfSeatsCalculate"
              :label="t('Number of seats per team||Antal pladser pr. gruppe')"
              :calculation="() => Math.ceil(students.length / numberOfTeamsToAdd - totalSeats)"
            ></TiamateCalcInputNumber>
            <template #footer>
              <UButton
                icon="lucide:plus"
                variant="ghost"
                color="primary"
                :label="t('Add||Tilføj')"
                :ui="{
                  base: 'w-full justify-center'
                }"
                @click="() => {
                  for (let i = 0; i < numberOfTeamsToAdd; i++) {
                    teams.push(new Team({
                      seats: numberOfSeats
                    }))
                  }
                }"
              ></UButton>
            </template>
          </UCard>
        </WalkthroughElement>
      </div>
    </div>
    <div
      class="flex gap-2"
    >
      <TiamateScoreBadge
        icon="lucide:equal"
        :label="t('Average score for all teams||Gennemsnitlig score for alle grupper')"
        :value="util.average(teams.map(team => tiamate.calculateAverageScore(team.members)))"
      ></TiamateScoreBadge>
      <!-- <UBadge
        :label="util.average(teams.map(team => tiamate.calculateAverageScore(team.members)))"
      ></UBadge> -->
      <UButton
        :label="t('Package teams||Pak grupper')"
        variant="subtle"
        icon="lucide:package-plus"
        @click="tiamate.packages.push(new Package(teams))"
      ></UButton>
    </div>
  </div>
  
</template>