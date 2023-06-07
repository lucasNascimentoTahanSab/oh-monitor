/**
 * @file Módulo responsável pela normalização do objeto UserCode retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Code from "../Code.js";

export default class UserCode extends Code {
  constructor(code, state) {
    super(code);

    this.current = state?.current ?? this.current;
    this.content = this.disabled ? this.content : state?.content;
  }
}