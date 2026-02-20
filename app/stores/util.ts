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
  function threeNumberComparison(n: number, floor: number, ceiling: number) {
    return (n - floor) / (ceiling - floor)
  }
  function fourNumberComparison(n: number, target: number, floor: number, ceiling: number) {
    let result: number;
    if (n <= target) {
      result = threeNumberComparison(n, floor, target)
    }
    else {
      result = (ceiling - n) / (ceiling - target)
    }
    return Math.max(0, result)
  }
  function genderRatio(students: Student[]) {
    const women = students.filter(member => member.gender == Gender.Woman)
    const men = students.filter(member => member.gender == Gender.Man)
    return Math.min(women.length, men.length) / Math.max(women.length, men.length)
  }
  return {
    stringKeySorter,
    numberComparison,
    threeNumberComparison,
    fourNumberComparison,
    genderRatio,
  }
})