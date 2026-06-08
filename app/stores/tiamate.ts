import readXlsxFile from "read-excel-file"
import { belbinRoles, genders, Student } from "../classes/tiamate/student"
import { Team } from "../classes/tiamate/team"
import type { DropdownMenuItem } from "@nuxt/ui"
import type { Package } from "../classes/tiamate/package"
import { Walkthrough } from "../classes/walkthrough"
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
  const students = ref<Student[]>([])
  const teams = ref<Team[]>([])
  const packages = ref<Package[]>([])
  let currentSemester = ref(1)
  let classicCompassLayout = ref(true)
  const separator: DropdownMenuItem = {
    type: 'separator',
  }
  const { t } = useLanguageStore()
  const util = useUtilStore()
  function availableStudents() {
    return students.value.filter(student => {
      return teams.value.every(team => !team.members.includes(student))
    }) || []
  }
  // function studentDropdownItems(student: Student, include: ("great")[], ) {
    
  //   const nameItem = {
  //     label: student.name,
  //     type: 'label',
  //     icon: genders.get(student.gender)?.icon,
  //     color: genders.get(student.gender)?.baseColor
  //   }
  //   const belbinRolesItems: DropdownMenuItem[] = [
  //     separator as DropdownMenuItem,
  //     {
  //       type: 'label',
  //       label: t('Belbin roles||Belbin-roller')
  //     },
  //     ...(student.belbinRolesExtended.map(role => ({
  //       label: `${t(role.name)}: ${role.percentage}`,
  //       type: 'label',
  //       icon: role.icon,
  //       slot: 'label2' as const,
  //     })) as DropdownMenuItem[]),
  //   ]
  //   const teamsItems: DropdownMenuItem[] = [
  //     separator,
  //     {
  //       label: t('Add to team||Tilføj til gruppe'),
  //       type: 'label',
  //     },
  //     ...(teams.map((team, index) => ({
  //       label: `${t('Team||Gruppe')} ${index + 1}`,
  //       icon: 'lucide:users',
  //       onSelect: () => {
  //         team.members.push(student)
  //       },
  //       slot: 'team' as const,
  //       team: team,
  //       disabled: team.members.length >= team.seats,
  //     }))),
  //   ]
  //   const previousMembers: DropdownMenuItem[] = props.comemberPool?.filter(student => student.previousTeams.some(team => props.student.previousTeams.includes(team))).filter(student => student != props.student).map(member => ({
  //     label: member.name,
  //     type: 'label',
  //     slot: 'label2',
  //     icon: 'lucide:circle-user',
  //   })) || []
  //   const previousTeamMembersItems: DropdownMenuItem[] = [
  //     separator,
  //     {
  //       label: `${t('Previous team members||Tidligere gruppemedlemmer')} (${previousMembers.length})`,
  //       type: 'label',
  //     },
  //     ...previousMembers
  //   ]
  // }
  function allPreviousTeams(inputStudents: Student[]) {
    const initArray: string[] = []
    inputStudents.forEach(member => initArray.push(...member.previousTeams))
    return [...new Set(initArray)]
  }
  function teamConnectionCount(inputStudents: Student[]) {
    let count = 0
    allPreviousTeams(inputStudents).forEach(team => {
      const members = inputStudents.filter(member => member.previousTeams.includes(team))
      for (let i = 0; i < members.length; i++) {
        members.slice(i + 1, members.length).forEach(member => {
          count++
        })
      }
    })
    return count
  }
  function highestConnectionCount(inputStudents: Student[]) {
    return inputStudents.reduce((prev, curr, i) => prev + inputStudents.slice(i + 1, inputStudents.length).length, 0)
  }
  function calculateRoleScore(inputStudents: Student[]) {
    if (inputStudents.length == 0) return NaN 
    return util.calculateBalanceScore(belbinRoles.map(role => {
      const members = inputStudents.filter(member => member.belbinRoles.has(role.id))
      const sum = members.reduce((prev, curr) => prev + (curr.belbinRoles.get(role.id) || 0), 0)
      return sum
    }))
  }
  function calculateGenderScore(inputStudents: Student[]) {
    if (inputStudents.length == 1) return NaN 
    const comparisons = Array.from(genders.keys()).map(gender => {
      const members = inputStudents.length
      const membersOfGender = inputStudents.filter(member => member.gender == gender).length
      const studentsOfGender = students.value.filter(student => student.gender == gender).length
      return util.fourNumberComparison(membersOfGender / members, studentsOfGender / students.value.length, 0, 1)
    }).filter(x => !Number.isNaN(x))
    return comparisons.reduce((prev, curr) => prev + curr, 0) / comparisons.length
  }
  function calculatePreviousTeamMembersScore(inputStudents: Student[]) {
    if (currentSemester.value == 1) return NaN
    return util.threeNumberComparison(teamConnectionCount(inputStudents), highestConnectionCount(inputStudents) * (currentSemester.value - 1), 0)
  }
  const roleScoreWeight = ref(1)
  const genderScoreWeight = ref(1)
  const previousTeamMembersScoreWeight = ref(1)
  function calculateAverageScore(inputStudents: Student[]) {
    const wrapper = (score: number, weight: number) => !Number.isNaN(score) ? util.multiplyToArray(score, weight * 10) : []
    const scores = [
      ...wrapper(calculateRoleScore(inputStudents), roleScoreWeight.value),
      ...wrapper(calculateGenderScore(inputStudents), genderScoreWeight.value),
      ...wrapper(calculatePreviousTeamMembersScore(inputStudents), previousTeamMembersScoreWeight.value),
    ]
    return scores.reduce((prev, curr) => prev + curr, 0) / scores.length
  }
  function calculateOverallBalanceScore(inputStudents: Student[]) {
    const wrapper = (score: number, weight: number) => !Number.isNaN(score) ? util.multiplyToArray(score, weight * 10) : []
    const scores = [
      ...wrapper(calculateRoleScore(inputStudents), roleScoreWeight.value),
      ...wrapper(calculateGenderScore(inputStudents), genderScoreWeight.value),
      ...wrapper(calculatePreviousTeamMembersScore(inputStudents), previousTeamMembersScoreWeight.value),
    ]
    return util.calculateBalanceScore(scores)
  }
  async function generateTeams(iterationCount?: number) {
    if (teams.value.length == 0) return false

    let scores: number[] = []
    const scoreSum = (array: Team[]) => array.reduce((prev, curr) => prev + calculateAverageScore(curr.combinedMembers()), 0)
    const copyTeams = (teamsToCopy: Team[]) => {
      return teamsToCopy.map((team) => {
        const newTeam = new Team({seats: team.seats})
        newTeam.members = team.members
        return newTeam
      })
    }
    // let teamsCopy: Team[] = copyTeams(teams.value)
    // for (let i = 0; i < (iterationCount || 1000); i++) {
    //   const oldTeamsCopy: Team[] = copyTeams(teamsCopy)
    //   teamsCopy = copyTeams(teams.value)
    //   const randomizedStudents: Student[] = availableStudents().toSorted(() => Math.random() - 0.5)
    //   randomizedStudents.forEach(student => {
    //     const scoreIncreases = teamsCopy.filter(team => team.combinedMembers().length < team.seats).map((team, index) => {
    //       return {
    //         scoreIncrease: calculateAverageScore([...team.combinedMembers(), student]) - calculateAverageScore(team.combinedMembers()),
    //         team,
    //       }
    //     }).sort((a, b) => a.scoreIncrease - b.scoreIncrease)
    //     scoreIncreases[0]?.team.proposedMembers.push(student)
    //     // console.log(teams.value[(scoreIncreases[0]?.index as number)])
    //   })
    //   console.log(scoreSum(teamsCopy))
    //   if (scoreSum(oldTeamsCopy) > scoreSum(teamsCopy)) {
    //     teamsCopy = oldTeamsCopy
    //   }
    //   scores.push(scoreSum(teamsCopy))
    // }
    const shuffle = <T>(array: T[]) => array.toSorted(() => Math.random() - 0.5)
    let teamsCopy: Team[] = []
    for (let i = 0; i < (iterationCount || 1000); i++) {
      const newTeamsCopy: Team[] = copyTeams(teams.value)
      const randomizedStudents: Student[] = shuffle(availableStudents())
      randomizedStudents.forEach(student => {
        const scoreIncreases = newTeamsCopy.filter(team => team.combinedMembers().length < team.seats).map((team, index) => {
          return {
            scoreIncrease: calculateAverageScore([...team.combinedMembers(), student]) - calculateAverageScore(team.combinedMembers()),
            team,
          }
        }).sort((a, b) => a.scoreIncrease - b.scoreIncrease)
        scoreIncreases[0]?.team.proposedMembers.push(student)
        // console.log(teams.value[(scoreIncreases[0]?.index as number)])
      })
      // console.log(scoreSum(teamsCopy))
      if (scoreSum(newTeamsCopy) > scoreSum(teamsCopy)) {
        teamsCopy = newTeamsCopy
      }
      scores.push(scoreSum(teamsCopy))
    }
    console.log("One: ", scores)
    scores = []
    // teams.value = teamsCopy
    // console.log(teams.value)


    // Distribute teams
    const availableTeams = () => teamsCopy.filter(team => team.combinedMembers().length < team.seats)
    const mutableTeams = () => teamsCopy.filter(team => team.proposedMembers.length > 0)
    // const scoreSum = (array: Team[]) => array.reduce((prev, curr) => prev + calculateAverageScore(curr.combinedMembers()), 0)
    shuffle(availableStudents()).forEach(student => {
      const teams = shuffle(availableTeams())
      if (teams.length > 0) {
        (teams[0] as Team).proposedMembers.push(student)
      }
    })
    // console.log(teams.value)
    let temp = 100
    const getBalanceScore = (teams: Team[]) => {
      const teamScores = teams.map(t => calculateAverageScore(t.combinedMembers()))
      const mean = teamScores.reduce((a, b) => a + b, 0) / teamScores.length
      const variance = teamScores.reduce((sq, s) => sq + Math.pow(s - mean, 2), 0) / teamScores.length
      return Math.sqrt(variance)
    }
    const coolingRate = 0.995
    for (let i = 0; i < (10000); i++) {
      const currentScore = getBalanceScore(teamsCopy)
      scores.push(currentScore)
      const _teams = mutableTeams()
      if (_teams.length < 2) break
      const indexA = Math.round((_teams.length - 1) * Math.random())
      let indexB = Math.round((_teams.length - 1) * Math.random())
      while (indexB == indexA) {
        indexB = Math.round((_teams.length - 1) * Math.random())
      }
      const teamA = _teams[indexA] as Team
      const teamB = _teams[indexB] as Team

      // const doo = ([teamA, teamB]).map(x => ({
      //   team: x,
      //   swapMember: shuffle(x.proposedMembers)[0] as Student,
      //   savedProposedMembers: x.proposedMembers,
      // }))

      const memberA = shuffle(teamA.proposedMembers)[0] as Student
      const memberB = shuffle(teamB.proposedMembers)[0] as Student

      const savedTeamAProposedMembers = [...teamA.proposedMembers]
      const savedTeamBProposedMembers = [...teamB.proposedMembers]

      teamA.proposedMembers.splice(teamA.proposedMembers.indexOf(memberA), 1, memberB)
      teamB.proposedMembers.splice(teamB.proposedMembers.indexOf(memberB), 1, memberA)

      const newScore = getBalanceScore(teamsCopy)
      const delta = newScore - currentScore 

      if (!(delta < 0 || Math.random() < Math.exp(-delta / temp))) {
        teamA.proposedMembers = savedTeamAProposedMembers
        teamB.proposedMembers = savedTeamBProposedMembers
      }
      temp *= coolingRate

    }
    console.log("Two: ", scores)


    teamsCopy.forEach((team, index) => {
      (teams.value[index] as Team).members = team.combinedMembers()
      // team.proposedMembers = []
    })
    console.log(teamsCopy)
    // teams.value = teamsCopy
    console.log(teams.value)
    // return true

    // await new Promise(resolve => setTimeout(resolve, 2000));
    return true
  }
  const teamsWalkthrough = ref(new Walkthrough([
    "students",
    "filter",
    "add-teams",
    "total-seats",
    "team-card",
    "automatic",
  ]))
  return {
    students,
    teams,
    packages,
    availableStudents,
    currentSemester,
    classicCompassLayout,
    allPreviousTeams,
    calculateRoleScore,
    calculateGenderScore,
    calculatePreviousTeamMembersScore,
    roleScoreWeight,
    genderScoreWeight,
    previousTeamMembersScoreWeight,
    calculateAverageScore,
    generateTeams,
    teamsWalkthrough,
  }
})

