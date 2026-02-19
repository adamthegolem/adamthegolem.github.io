import { Gender, type Student } from "../classes/tiamate/student";

export const useUtilStore = defineStore("utilStore", () => {
  function stringKeySorter(a: string, b: string) {
    const stringA = a.toUpperCase(); // ignore upper and lowercase
    const stringB = b.toUpperCase(); // ignore upper and lowercase
    if (stringA < stringB) {
      return -1;
    }
    if (stringA > stringB) {
      return 1;
    }
    
    // names must be equal
    return 0;
  }
  function numberComparison(x: number, y: number): number {
    return Math.max(1 - Math.abs(x - y) / x, 0)
  }
  function genderRatio(students: Student[]) {
    const women = students.filter(member => member.gender == Gender.Woman)
    const men = students.filter(member => member.gender == Gender.Man)
    return women.length / men.length
  }
  return {
    stringKeySorter,
    numberComparison,
    genderRatio,
  }
})