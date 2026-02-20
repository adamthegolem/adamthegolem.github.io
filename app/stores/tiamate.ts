import readXlsxFile from "read-excel-file"
import { genders, type Student } from "../classes/tiamate/student"
import type { Team } from "../classes/tiamate/team"
import type { DropdownMenuItem } from "@nuxt/ui"
export interface XlsxStudent {
  name: string,
  gender: "Mand" | "Kvinde" | "Ikke-binær" | "Man" | "Woman" | "Non-binary",
  initialPreviousTeams: string,
  previousTeams: string
  initialRoles: {
    [k: string]: number
  }
  // roles?: Belbin[]
}

export const useTiamateStore = defineStore("tiamateStore", () => {
  const students: Student[] = []  
  const teams: Team[] = []
  let currentSemester = 1
  const { t } = useLanguageStore()
  function availableStudents() {
    return students.filter(student => {
      return teams.every(team => !team.members.includes(student))
    }) || []
  }
  return {
    students,
    teams,
    availableStudents,
    currentSemester,
  }
})

