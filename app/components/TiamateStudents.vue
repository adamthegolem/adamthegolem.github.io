<script setup lang="ts">
import readXlsxFile, { type Schema } from 'read-excel-file';
import { BelbinRole, useTiamateStore, type XlsxStudent } from '../stores/tiamate';
import { Student, belbinRoles } from '../classes/tiamate/student';

const language = useLanguageStore()
const { t } = language
const tiamate = useTiamateStore()
const fileInput = ref()
const schema = computed(() => ({
	name: {
		column: t("NAME||NAVN"),
		type: String
	},
	gender: {
		column: t("GENDER||KØN"),
		type: String,
		oneOf: [
			t("Man||Mand"),
			t("Woman||Kvinde"),
			t("Non-binary||Ikke-binær")
		]
	},
	initialPreviousTeams: {
		column: t("PREV. TEAMS||TIDL. GRUPPER"),
		type: String
	},
	initialRoles: {
		schema: {
			coordinator: {
				prop: "Co-ordinator",
				column: t("CO-ORDINATOR||KOORDINATOR"),
				type: Number,
				format: "0%"
			},
			teamworker: {
				prop: "Teamworker",
				column: t("TEAMWORKER||FORMIDLER"),
				type: Number,
				format: "0%"
			},
			resourceInvestigator: {
				prop: "Resource Investigator",
				column: t("RESOURCE INVESTIGATOR||KONTAKTSKABER"),
				type: Number,
				format: "0%"
			},
			shaper: {
				prop: "Shaper",
				column: t("SHAPER||OPSTARTER"),
				type: Number,
				format: "0%"
			},
			completerFinisher: {
				prop: "Completer Finisher",
				column: t("COMPLETER FINISHER||AFSLUTTER"),
				type: Number,
				format: "0%"
			},
			specialist: {
				prop: "Specialist",
				column: "SPECIALIST",
				type: Number,
				format: "0%"
			},
			plant: {
				prop: "Plant",
				column: t("PLANT||IDÉMAND"),
				type: Number,
				format: "0%"
			},
			monitorEvaluator: {
				prop: "Monitor Evaluator",
				column: t("MONITOR EVALUATOR||ANALYSATOR"),
				type: Number,
				format: "0%"
			},
			implementer: {
				prop: "Implementer",
				column: t("IMPLEMENTER||ORGANISATOR"),
				type: Number,
				format: "0%"
			}
		}
	}
}))
async function importExcelFile() {
	console.log(fileInput.value)
	if (fileInput.value) {
    const excel = await readXlsxFile(fileInput.value, {schema: schema.value})
    console.log(excel)
		tiamate.students = excel.rows.map(row => new Student(row as XlsxStudent))
		console.log(tiamate.students)
	} else {
		tiamate.students = []
	}
}
const currentSemester = ref(1)
watch(currentSemester, () => {
  tiamate.currentSemester = currentSemester.value
})
// watch(fileInput, importExcelFile)
</script>
<template>
	<div class="flex flex-col gap-4">
		<div class="mx-auto flex flex-col gap-2">
      <UFormField
        :label="t('Curren semester||Nuværende semester')"
        class="w-full"
      >
        <UInputNumber
          v-model="currentSemester"
          :min="1"
          class="w-full"
        ></UInputNumber>
      </UFormField>
			<UFileUpload
				:label="t('Import Excel file||Importer Excel-fil')"
				:interactive="false"
				:description="t('Download the template and have everyone fill it out, then upload it.||Download skabelonen og lad alle udfylde den. Upload den derefter.')"
				icon="lucide:file-spreadsheet"
				accept=".xlsx"
				layout="list"
				v-model="fileInput"
				v-on:update:model-value="importExcelFile()"
			>
				<template #actions="{open}">
					<UButton
						:label="t('Upload file||Upload fil')"
						icon="lucide:upload"
						@click="open()"
						color="neutral"
						variant="outline"
					></UButton>
					<UButton
						:label="t('Download template||Download skabelon')"
						icon="lucide:file-down"
						color="neutral"
						variant="outline"
						:to="`/tiamate/template_${language.language}.xlsx`"
						:download="`tiamate_template_${language.language}.xlsx`"
						external
					></UButton>
				</template>
			</UFileUpload>
		</div>
		<UTable v-if="tiamate.students.length > 0" :data="tiamate.students">
			<template #name-cell="{cell}">
				<div class="flex gap-1">
					<UIcon name="lucide:circle-user" class=" size-5"></UIcon>
					{{ cell.renderValue() }}
				</div>
			</template>
			<template #gender-cell="{cell}">
				{{ t(cell.getValue() as string|undefined) }}
			</template>
			<template #belbinRoles-cell="{cell}">
				<div class="flex gap-1">
					<UPopover
							v-for="belbinRole in (cell.getValue() as [BelbinRole, number][])"
							:label="t(belbinRoles.find(({id}) => id == belbinRole[0])?.name)"
							class=" cursor-help"
							arrow
						>
						<UBadge
							:label="`${belbinRole[1] * 100}%`"
							variant="soft"
							:icon="belbinRoles.find(({id}) => id == belbinRole[0])?.icon"
						></UBadge>
						<template #content>
							<PopoverContainer>
								<div class="flex flex-col">
									<span class=" font-bold">{{ t(belbinRoles.find(({id}) => id == belbinRole[0])?.name) }}</span>
									<p>{{ t(belbinRoles.find(({id}) => id == belbinRole[0])?.description) }}</p>
								</div>
							</PopoverContainer>
						</template>
					</UPopover>
				</div>
			</template>
		</UTable>
	</div>
</template>