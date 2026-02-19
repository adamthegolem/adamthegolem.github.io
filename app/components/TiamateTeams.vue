<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui';
import { genders } from '../classes/tiamate/student';
import { Team } from '../classes/tiamate/team';
import type { BelbinRole } from '../stores/tiamate';

const { t } = useLanguageStore()
const tiamate = useTiamateStore()
const { students, teams } = tiamate
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
const roleBalanceWeight = ref(1)
const genderBalanceWeight = ref(1)
const pastComembersWeight = ref(1)
const totalSeats = computed(() => teams.map(x => x.seats).reduce((prev, curr) => curr + prev, 0))
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
    <UCollapsible
      :items="[
        {
          icon: 'lucide:bot',
        }
      ]"
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
        Hey
      </template>
    </UCollapsible>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 justify-center">
        <div class="flex grow">
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
              :color="totalSeats < students.length ? 'error' : 'success'"
              variant="outline"
            ></UBadge>
          </UFieldGroup>
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
      
        <TiamateTeamCard
          v-for="(team, index) in teams"
          :team="team"
          :index="index"
          :available-students="availableStudents"
          v-model:active-tab="globalActiveTeamTab"
          v-model:roleScoreWeight="roleBalanceWeight"
          v-model:genderScoreWeight="genderBalanceWeight"
          v-model:previousTeamMembersScoreWeight="pastComembersWeight"
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
      </div>
    </div>
  </div>
  
</template>