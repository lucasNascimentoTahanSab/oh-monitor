export default class Answer {
  constructor(answer) {
    this.uuid = answer?.attributes?.uuid ?? null;
    this.statement = answer?.attributes?.statement ?? null;
    this.selected = false;
  }
}