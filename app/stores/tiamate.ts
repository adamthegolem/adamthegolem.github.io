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
export enum BelbinRole {
  Coordinator = "coordinator",
  Teamworker = "teamworker",
  ResourceInvestigator = "resourceInvestigator",
  Shaper = "shaper",
  CompleterFinisher = "completerFinisher",
  Specialist = "specialist",
  Plant = "plant",
  MonitorEvaluator = "monitorEvaluator",
  Implementer = "implementer",
}
export interface IBelbinRole {
  id: BelbinRole,
  name: string,
  icon: string,
  description: string,
  number?: number,
  percentage?: string,
}
export const belbinRoles: IBelbinRole[] = [
  {
    id: BelbinRole.Coordinator,
    name: "Co-ordinator||Koordinator",
    icon: "lucide:megaphone",
    description: "Needed to focus on the team's objectives, draw out team members and delegate work appropriately.||Nødvendig for at fokusere på teamets mål, trække teammedlemmer ud og uddelegere arbejde på passende vis.",
  },
  {
    id: BelbinRole.Teamworker,
    name: "Teamworker||Formidler",
    icon: "lucide:heart-handshake",
    description: "Helps the team to gel, using their versatility to identify the work required and complete it on behalf of the team.||Hjælper teamet med at spille sammen ved at bruge deres alsidighed til at identificere det nødvendige arbejde og fuldføre det på vegne af teamet.",
  },
  {
    id: BelbinRole.ResourceInvestigator,
    name: "Resource Investigator||Kontaktskaber",
    icon: "lucide:phone",
    description: "Uses their inquisitive nature to find ideas to bring back to the team.||Bruger deres nysgerrige natur til at finde ideer til at bringe tilbage til teamet.",
  },
  {
    id: BelbinRole.Shaper,
    name: "Shaper||Opstarter",
    icon: "lucide:rocket",
    description: "Provides the necessary drive to ensure that the team keeps moving and does not lose focus or momentum.||Giver det nødvendige drive for at sikre, at teamet bliver ved med at bevæge sig og ikke mister fokus eller fremdrift.",
  },
  {
    id: BelbinRole.CompleterFinisher,
    name: "Completer Finisher||Afslutter",
    icon: "lucide:wrench",
    description: "Most effectively used at the end of tasks to polish and scrutinise the work for errors, subjecting it to the highest standards of quality control.||Anvendes mest effektivt i slutningen af ​​opgaver til at polere og undersøge arbejdet for fejl og underkaste det de højeste standarder for kvalitetskontrol.",
  },
  {
    id: BelbinRole.Specialist,
    name: "Specialist",
    icon: "lucide-lab:crosshair-2",
    description: "Brings in-depth knowledge of a key area to the team.||Tilfører teamet dybdegående viden om et nøgleområde.",
  },
  {
    id: BelbinRole.Plant,
    name: "Plant||Idémand",
    icon: "lucide:lightbulb",
    description: "Tends to be highly creative and good at solving problems in unconventional ways.||Har tendens til at være yderst kreativ og god til at løse problemer på utraditionelle måder.",
  },
  {
    id: BelbinRole.MonitorEvaluator,
    name: "Monitor Evaluator||Analysator",
    icon: "lucide:microscope",
    description: "Provides a logical eye, making impartial judgements where required and weighs up the team's options in a dispassionate way.||Giver et logisk blik, foretager upartiske vurderinger, hvor det er nødvendigt, og afvejer teamets muligheder på en lidenskabsløs måde.",
  },
  {
    id: BelbinRole.Implementer,
    name: "Implementer||Organisator",
    icon: "lucide:cog",
    description: "Needed to plan a workable strategy and carry it out as efficiently as possible.||Nødvendig for at planlægge en brugbar strategi og udføre den så effektivt som muligt.",
  },
]
export const useTiamateStore = defineStore("tiamateStore", () => {
  const students: Student[] = []  
  const teams: Team[] = []
  const { t } = useLanguageStore()
  
  return {
    students,
    teams,
  }
})

