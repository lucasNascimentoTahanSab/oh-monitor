import Answer from "./answer";

export default class Exercise {
  constructor(exercise) {
    this.uuid = exercise?.attributes?.uuid ?? null;
    this.statement = exercise?.attributes?.statement ?? null;
    this.answers = this._getAnswers(exercise);
  }

  _getAnswers(exercise) {
    if (!exercise?.attributes?.answers?.data?.length) { return []; }

    return exercise.attributes.answers.data.map(answer => new Answer(answer));
  }
}