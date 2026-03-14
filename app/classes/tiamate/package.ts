import { Team } from "./team";

export class Package {
  public teams: PackageTeam[] = []
  constructor(teams: Team[]) {
    this.teams = teams.map(team => new PackageTeam(team))
  }
}
export class PackageTeam extends Team {
  constructor(team: Team) {
    super({
      seats: team.seats
    })
    this.members = [...team.members]
  }
}