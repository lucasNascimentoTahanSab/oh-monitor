/**
 * @file Módulo responsável por registrar estado do nó da BST
 * @copyright Lucas N. T. Sab 2023
 */
export default class NodeState {
  constructor(state) {
    this.focus = state?.focus ?? false;
    this.found = state?.found ?? false;
    this.insert = state?.insert ?? false;
    this.update = state?.update ?? false;
    this.delete = state?.delete ?? false;
  }
}