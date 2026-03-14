export class Walkthrough {
  public items: string[]
  public index = -2
  constructor(items: string[]) {
    this.items = items
  }
  public next() {
    this.index++
  }
  public back() {
    this.index--
  }
  public reset() {
    this.index = -2
  }
  public start() {
    this.index = 0
  }
  public isCurrent(id: string) {
    return this.items.indexOf(id) == this.index
  }
}