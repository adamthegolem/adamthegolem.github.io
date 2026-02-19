import type { DropdownMenuItem } from "@nuxt/ui";
import type { IBelbinRole } from "../../stores/tiamate";
import type { Belbin } from "./belbin";
export enum Gender {
  Man = "Man||Mand",
  Woman = "Woman||Kvinde",
  NonBinary = "Non-binary||Ikke-binær",
}
const genderMap = new Map<String, Gender>([
  [
    "Man",
    Gender.Man,
  ],
  [
    "Mand",
    Gender.Man,
  ],
  [
    "Woman",
    Gender.Woman,
  ],
  [
    "Kvinde",
    Gender.Woman,
  ],
  [
    "Non-binary",
    Gender.NonBinary,
  ],
  [
    "Ikke-binær",
    Gender.NonBinary,
  ],
])
export const genders = new Map<Gender|undefined, {
  baseColor: "info" | "error" | "tertiary" | "neutral" | "primary" | "secondary" | "success" | "warning",
  textColor: string,
  icon: string,
}>([
  [
    Gender.Man,
    {
      baseColor: "info",
      textColor: "text-info",
      icon: "lucide:mars",
    }
  ],
  [
    Gender.Woman,
    {
      baseColor: "tertiary",
      textColor: "text-tertiary",
      icon: "lucide:venus",
    }
  ],
  [
    Gender.NonBinary,
    {
      baseColor: "secondary",
      textColor: "text-secondary",
      icon: "lucide:non-binary",
    }
  ],
  [
    undefined,
    {
      baseColor: "primary",
      textColor: "text-primary",
      icon: "lucide:circle-small"
    }
  ]
])
export class Student {
  public name: string
  public gender: Gender | undefined
  public belbinRoles: Map<Belbin, number>
  public belbinRolesExtended: IBelbinRole[]
  public previousTeams: string[]
  constructor(input: XlsxStudent) {
    this.name = input.name
    this.gender = genderMap.get(input.gender)
    this.belbinRoles = new Map<Belbin, number>(Object.entries(input.initialRoles).filter(x => x[1]).sort((a, b) => b[1] - a[1]))
    this.belbinRolesExtended = Array.from((this.belbinRoles)).map(role => ({
      ...(belbinRoles.find(({id}) => id == role[0]) as IBelbinRole),
      number: role[1],
      percentage: `${role[1] * 100}%`
    }))
    this.previousTeams = input.initialPreviousTeams.split(', ')
  }
}