/**
 * @file Módulo responsável pela normalização do objeto UserChoice retornado em integração.
 * @copyright Lucas N. T. Sab 2023
*/
import Choice from "../Choice";

export default class UserChoice extends Choice {
  constructor(answer, state) {
    super(answer);

    this.current = state?.current ?? this.current;
    this.correct = state?.correct ?? this.correct;
    this.wrong = state?.wrong ?? this.wrong;
  }
}