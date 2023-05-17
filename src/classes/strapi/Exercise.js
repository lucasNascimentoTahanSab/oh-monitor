/**
 * @file Módulo responsável pela normalização do objeto Exercise retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Code from './Code.js';
import Choice from './Choice.js';

export default class Exercise {
  constructor(exercise) {
    this.uid = exercise?.attributes?.uid ?? exercise?.uid ?? null;
    this.createdAt = exercise?.attributes?.createdAt ?? exercise?.createdAt ?? null;
    this.updatedAt = exercise?.attributes?.updatedAt ?? exercise?.updatedAt ?? null;
    this.publishedAt = exercise?.attributes?.publishedAt ?? exercise?.publishedAt ?? null;
    this.type = exercise?.attributes?.type ?? exercise?.type ?? null;
    this.answer = exercise?.attributes?.answer ?? exercise?.answer ?? null;
    this.statement = exercise?.attributes?.statement ?? exercise?.statement ?? null;
    this.codes = this._getCodes(exercise?.attributes?.codes?.data ?? exercise?.codes);
    this.choices = this._getChoices(exercise?.attributes?.choices?.data ?? exercise?.choices);
    this.result = exercise?.result ?? null;
    this.commands = exercise?.commands ?? [];
    this.output = exercise?.output ?? [];
    this.input = exercise?.input ?? [];
  }

  _getChoices(choices) {
    if (!choices?.length) { return []; }

    return choices.map(choice => new Choice(choice));
  }

  _getCodes(codes) {
    if (!codes?.length) { return []; }

    return codes.map(code => new Code(code));
  }
}