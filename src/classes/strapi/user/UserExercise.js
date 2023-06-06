/**
 * @file Módulo responsável pela normalização do objeto UserExercise retornado em integração.
 * @copyright Lucas N. T. Sab 2023
*/
import Exercise from '../Exercise.js';
import UserCode from './UserCode.js';
import UserChoice from './UserChoice.js';
import Util from '../../util/Util.js';

export default class UserExercise extends Exercise {
  constructor(exercise, state) {
    super(exercise);

    this.codes = this._getUserCodes(this.codes, state?.codes);
    this.choices = this._getUserChoices(this.choices, state?.choices);
    this.result = state?.result ?? this.result;
    this.commands = state?.commands ?? this.commands;
    this.output = state?.output ?? this.output;
    this.input = state?.input ?? this.input;
  }

  _getUserChoices(choices, state) {
    if (!choices?.length) { return []; }

    return choices.map(choice => new UserChoice(choice, Util.getItemByUid(state, choice.uid)));
  }

  _getUserCodes(codes, state) {
    if (!codes?.length) { return []; }

    return codes.map(code => new UserCode(code, Util.getItemByUid(state, code.uid)));
  }
}