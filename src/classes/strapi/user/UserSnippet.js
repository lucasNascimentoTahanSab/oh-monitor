/**
 * @file Módulo responsável pela definição de um objeto UserSnippet para armazenamento de código 
 * recuperado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Snippet from "../Snippet";
import UserCode from "./UserCode";
import Util from '../../util/Util.js';

export default class UserSnippet extends Snippet {
  constructor(snippet, state) {
    super(snippet);

    this.codes = this._getUserCodes(this.codes, state?.codes);
    this.result = state?.result ?? this.result;
    this.commands = state?.commands ?? this.commands;
    this.output = state?.output ?? this.output;
    this.input = state?.input ?? this.input;
  }

  _getUserCodes(codes, state) {
    if (!codes?.length) { return []; }

    return codes.map(code => new UserCode(code, Util.getItemByUid(state, code.uid)));
  }
}