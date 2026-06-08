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
  /**
   * Calculates the balance score of a set of numbers based on a fixed total sum.
   * 100% = Perfectly even distribution.
   * 0% = All points are in a single slot (maximum imbalance).
   * 
   * @param numbers - The array of values to evaluate
   * @returns The balance percentage as a number between 0 and 100
   */
  function calculateBalanceScore(numbers: number[]): number {
    if (numbers.length <= 1) return 100;

    const totalSum = numbers.reduce((acc, val) => acc + val, 0);
    
    // If the sum is 0, they are technically "even"
    if (totalSum === 0) return 100;

    const n = numbers.length;
    const target = totalSum / n;

    // 1. Calculate Total Error (Sum of absolute differences from the target)
    let totalError = 0;
    for (const x of numbers) {
      totalError += Math.abs(x - target);
    }

    // 2. Calculate the Maximum Possible Error
    // This occurs when all points are in one slot and the rest are zero.
    // Max Error = (Error of the one full slot) + (Error of the n-1 empty slots)
    // Max Error = (totalSum - target) + ((n - 1) * target)
    const maxError = (totalSum - target) + ((n - 1) * target);

    // 3. Calculate Balance
    const balance = (1 - totalError / maxError);
    return balance
    // Round to 2 decimal places for clean output
    // return Math.round(balance * 100) / 100;
  }

  function genderRatio(students: Student[]) {
    const women = students.filter(member => member.gender == Gender.Woman)
    const men = students.filter(member => member.gender == Gender.Man)
    return Math.min(women.length, men.length) / Math.max(women.length, men.length)
  }
  function multiplyToArray<T>(item: T, multiplier: number) {
    return Array.from({length: multiplier}, () => item)
  }
  function average(numbers: number[]) {
    return numbers.reduce((prev, curr) => prev + curr, 0) / numbers.length
  }
  return {
    stringKeySorter,
    numberComparison,
    threeNumberComparison,
    fourNumberComparison,
    calculateBalanceScore,
    genderRatio,
    multiplyToArray,
    average,
  }
})