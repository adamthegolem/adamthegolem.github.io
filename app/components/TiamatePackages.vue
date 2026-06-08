<script setup lang="ts">
import type { Package } from '../classes/tiamate/package';

const tiamate = useTiamateStore()
const { t } = useLanguageStore()
const util = useUtilStore()
function calculatePackageScore(pack: Package) {
  return util.average(pack.teams.map(team => tiamate.calculateAverageScore(team.members)))
}
</script>
<template>
  <UCard
    v-for="pack in tiamate.packages"
  >
    <TiamateScoreBadge
      icon="lucide:equal"
      :label="t('Average score||Gennemsnitlig score')"
      :value="calculatePackageScore(pack)"
    ></TiamateScoreBadge>
  </UCard>
</template>