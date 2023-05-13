import Answer from "./Answer";

export default class Exercise {
  constructor(exercise) {
    this.id = exercise?.id ?? null;
    this.statement = exercise?.attributes?.statement ?? exercise?.statement ?? null;
    this.createdAt = exercise?.attributes?.createdAt ?? exercise?.createdAt ?? null;
    this.updatedAt = exercise?.attributes?.updatedAt ?? exercise?.updatedAt ?? null;
    this.publishedAt = exercise?.attributes?.publishedAt ?? exercise?.publishedAt ?? null;
    this.uuid = exercise?.attributes?.uuid ?? exercise?.uuid ?? null;
    this.answers = this._getAnswers(exercise?.attributes?.answers?.data ?? exercise?.answers);
  }

  _getAnswers(answers) {
    if (!answers?.length) { return []; }

    return answers.map(answer => new Answer(answer));
  }
}