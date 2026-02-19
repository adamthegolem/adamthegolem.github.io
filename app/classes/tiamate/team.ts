import { Student } from "./student";

export class Team {
  public members: Student[] = []
  public seats: number
  constructor(params?: {
    seats?: number,
  }) {
    this.seats = params?.seats || 5
  }
}