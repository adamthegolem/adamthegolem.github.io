<script setup lang="ts">
import { stringify as toYaml } from 'yaml'
const inputCode = ref("")
function testJSON(strJson: string) {
  try {
    const parsed = JSON.parse(strJson)
    if (parsed && typeof parsed === "object") {
      return parsed
    }
  } catch { return {} }
  return {}
}
const bookend = "```"
const sizes = new Map<string, string>([
  ["G", "Gargantuan"],
  ["M", "Medium"],
  ["S", "Small"],
  ["T", "Tiny"],
  ["L", "Large"],
])
const alignments = new Map<string, string>([
  ["A", "Any Alignment"],
  ["L", "Lawful"],
  ["N", "Neutral"],
  ["C", "Chaotic"],
  ["G", "Good"],
  ["E", "Evil"],
])
const sources = new Map<string, string>([
  ["MM", "Monster Manual (2014)"],
  ["XGE", "Xanathar's Guide to Everything"],
  ["VGM", "Volo's Guide to Monsters"],
  ["TCE", "Tasha's Cauldron of Everything"],
  ["SCC", "Strixhaven: A Curriculum of Chaos"],
  ["FTD", "Fizban's Treasury of Dragons"],
])
const attacks = new Map<string, string>([
  ["mw", "Melee Weapon Attack"]
])
const recharges = new Map<string, string>([
  ["5", "5-6"]
])
interface IItem {
  name?: string,
  entries: (string | {
    type?: string,
    items?: {
      type?: string,
      name?: string,
      entry?: string,
    }
  })[],
}
interface IItemEntries {
  name: string,
  entries: [string]
}
interface IInputObject {
  name?: string,
  source?: string,
  size?: string[],
  type?: string | {
    type?: string,
    tags?: string[]
  },
  alignment?: string[],
  ac?: {
    ac?: number,
  }[],
  hp?: {
    average?: number,
    formula?: string,
  },
  speed?: {
    walk?: number,
    fly?: number,
    swim?: number,
    burrow?: number,
    climb?: number,
  },
  str?: number,
  dex?: number,
	con?: number,
	int?: number,
	wis?: number,
	cha?: number,
  save?: {
    str?: string,
    dex?: string,
    con?: string,
    int?: string,
    wis?: string,
    cha?: string,
  },
  skill?: {
    acrobatics?: string;
    "animal handling"?: string;
    arcana?: string;
    athletics?: string;
    deception?: string;
    history?: string;
    insight?: string;
    intimidation?: string;
    investigation?: string;
    medicine?: string;
    nature?: string;
    perception?: string;
    performance?: string;
    persuasion?: string;
    religion?: string;
    "sleight of hand"?: string;
    stealth?: string;
    survival?: string;
  },
  bonus?: IItem[],
  senses?: string[],
  passive?: number,
  immune?: string[],
  vulnerable?: string[],
  resist?: (string | {
    resist?: string[],
    note?: string,
  })[],
  conditionImmune?: string[],
  languages?: string[],
  cr?: number|{
    cr?: number
  },
  trait?: IItemEntries[],
  action?: IItemEntries[],
  legendary?: IItem[],

}
function deplus(str: string|undefined) {
  if (str == undefined) return undefined
  return Number(str.slice(1))
}
function entry(input: string) {
  const re = /\s*(\{[0-9]+\})\s*/g
  const parts = input.split(/[{}]/)
  console.log(parts)
  const editedParts = parts.reduce<string[]>((prev, curr) => {
    if (curr.at(0) == "@") {
      const split = curr.split(" ")
      const start = split.shift()
      const rest = split.join(" ")
      switch (start) {
        case "@h":
          prev.push("Hit: ")
          break
        case "@atk":
          prev.push(`${attacks.get(rest)||""}:`)
          break
        case "@hit":
          prev.push(`+${rest}`)
          break
        case "@damage":
          prev.push(`${rest}`)
          break
        case "@recharge":
          prev.push(`(Recharge ${rest ? rest + "-" : ""}6)`)
          break
      }
    } else {
      prev.push(curr)
    }
    return prev
  }, [])
  return editedParts.join("")
}
function convertItems(items: ({
  name: string,
  entries: [string]
}[]) | undefined) {
  return items ? items.map(item => {
    return {
      name: entry(item.name),
      desc: entry(item.entries[0])
    }
  }) : undefined
}
const outputCode = computed(() => {
  const i: IInputObject = testJSON(inputCode.value)
  const editedOutput = {
    name: i.name,
    source: i.source ? sources.get(i.source) || i.source : undefined,
    stats: i.str ? [i.str, i.dex, i.con, i.int, i.wis, i.cha] : undefined,
    size: sizes.get((i.size||['']).at(0)||''),
    type: (typeof i.type == "string") ? i.type : i.type?.type,
    subtype: (typeof i.type == "string" || i.type == undefined) ? undefined : `(${i.type?.tags?.join(' ')})`,
    alignment: i.alignment ? i.alignment.map(a => alignments.get(a)).join(" ") : undefined,
    ac: i.ac ? ((i.ac?.length == 0) ? undefined : i.ac[0]?.ac) : undefined,
    hp: i.hp?.average,
    hit_dice: i.hp?.formula,
    speed: i.speed == undefined ? undefined : Object.entries(i.speed).map(e => {
      return `${(e[0] != "walk") ? e[0] + " " : ""}${e[1]} ft.`
    }).join(", "),
    cr: (typeof i.cr == "object") ? Number(i.cr.cr) : i.cr,
    saves: i.save ? {
      strength: deplus(i.save.str),
      dexterity: deplus(i.save.dex),
      constitution: deplus(i.save.con),
      intelligence: deplus(i.save.int),
      wisdom: deplus(i.save.wis),
      charisma: deplus(i.save.cha),
    } : undefined,
    skillsaves: i.skill ? Object.fromEntries(Object.entries(i.skill).map(e => [e[0], deplus(e[1])])) : undefined,
    damage_vulnerabilities: i.vulnerable ? i.vulnerable.join(", ") : undefined,
    damage_resistances: i.resist ? (() => {
      let normal: string[] = []
      let added = ""
      i.resist.forEach(x => {
        if (typeof x == "string") {
          normal.push(x)
        } else {
          // added += "; " + x.resist?.join(", ") + " " + x.note
          added += `; ${x.resist?.join(", ")} ${x.note}`
        }
      })
      return normal.join(", ") + added
    })() : undefined,
    languages: i.languages?.join(", "),
    senses: i.senses || i.passive ? [...i.senses||[], `passive Perception ${i.passive}`].join(", ") : undefined,
    traits: convertItems(i.trait),
    actions: convertItems(i.action),
  }
  return toYaml(editedOutput)
})
</script>
<template>
  <UPageSection>
    <div class="grid grid-cols-2 items-start gap-6">
      <UTextarea
        v-model="inputCode"
        :ui="{
          base: 'font-mono my-5 h-200'
        }"
      >
      </UTextarea>
      <MDC
        :value="`${bookend}yaml
${outputCode}`"
      ></MDC>
      <!-- <UTextarea
        v-model=""
      >

      </UTextarea> -->
    </div>
    <!-- <MDC :value="`${bookend}json
${inputCode}`"
    ></MDC> -->
  </UPageSection>
</template>