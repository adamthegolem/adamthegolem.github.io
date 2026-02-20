import type { DropdownMenuItem } from "@nuxt/ui";
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
  angle: number,
}
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
export const belbinRoles: IBelbinRole[] = [
  {
    id: BelbinRole.Coordinator,
    name: "Co-ordinator||Koordinator",
    icon: "lucide:megaphone",
    description: "Needed to focus on the team's objectives, draw out team members and delegate work appropriately.||Nødvendig for at fokusere på teamets mål, trække teammedlemmer ud og uddelegere arbejde på passende vis.",
    angle: 285,
  },
  {
    id: BelbinRole.Teamworker,
    name: "Teamworker||Formidler",
    icon: "lucide:heart-handshake",
    description: "Helps the team to gel, using their versatility to identify the work required and complete it on behalf of the team.||Hjælper teamet med at spille sammen ved at bruge deres alsidighed til at identificere det nødvendige arbejde og fuldføre det på vegne af teamet.",
    angle: 315,
  },
  {
    id: BelbinRole.ResourceInvestigator,
    name: "Resource Investigator||Kontaktskaber",
    icon: "lucide:phone",
    description: "Uses their inquisitive nature to find ideas to bring back to the team.||Bruger deres nysgerrige natur til at finde ideer til at bringe tilbage til teamet.",
    angle: 345,
  },
  {
    id: BelbinRole.Shaper,
    name: "Shaper||Opstarter",
    icon: "lucide:rocket",
    description: "Provides the necessary drive to ensure that the team keeps moving and does not lose focus or momentum.||Giver det nødvendige drive for at sikre, at teamet bliver ved med at bevæge sig og ikke mister fokus eller fremdrift.",
    angle: 45,
  },
  {
    id: BelbinRole.CompleterFinisher,
    name: "Completer Finisher||Afslutter",
    icon: "lucide:wrench",
    description: "Most effectively used at the end of tasks to polish and scrutinise the work for errors, subjecting it to the highest standards of quality control.||Anvendes mest effektivt i slutningen af ​​opgaver til at polere og undersøge arbejdet for fejl og underkaste det de højeste standarder for kvalitetskontrol.",
    angle: 105,
  },
  {
    id: BelbinRole.Specialist,
    name: "Specialist",
    icon: "lucide-lab:crosshair-2",
    description: "Brings in-depth knowledge of a key area to the team.||Tilfører teamet dybdegående viden om et nøgleområde.",
    angle: 135,
  },
  {
    id: BelbinRole.Plant,
    name: "Plant||Idémand",
    icon: "lucide:lightbulb",
    description: "Tends to be highly creative and good at solving problems in unconventional ways.||Har tendens til at være yderst kreativ og god til at løse problemer på utraditionelle måder.",
    angle: 165,
  },
  {
    id: BelbinRole.MonitorEvaluator,
    name: "Monitor Evaluator||Analysator",
    icon: "lucide:microscope",
    description: "Provides a logical eye, making impartial judgements where required and weighs up the team's options in a dispassionate way.||Giver et logisk blik, foretager upartiske vurderinger, hvor det er nødvendigt, og afvejer teamets muligheder på en lidenskabsløs måde.",
    angle: 180 + 45 / 2,
  },
  {
    id: BelbinRole.Implementer,
    name: "Implementer||Organisator",
    icon: "lucide:cog",
    description: "Needed to plan a workable strategy and carry it out as efficiently as possible.||Nødvendig for at planlægge en brugbar strategi og udføre den så effektivt som muligt.",
    angle: 270 - 45 / 2,
  },
]
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