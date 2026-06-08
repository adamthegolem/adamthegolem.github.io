import { Gender, Student } from "./student";

export class Team {
  public members: Student[] = []
  public proposedMembers: Student[] = []
  public seats: number
  constructor(params?: {
    seats?: number,
  }) {
    this.seats = params?.seats || 5
  }
  public combinedMembers() {
    return this.members.concat(this.proposedMembers)
  }
}