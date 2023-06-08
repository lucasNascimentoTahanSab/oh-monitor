/**
 * @file Módulo responsável por registrar estado do nó da BST
 * @copyright Lucas N. T. Sab 2023
 */
export default class NodeState {
  constructor(state) {
    this.focus = state?.focus ?? true;
    this.found = state?.found ?? false;
    this.delete = state?.delete ?? false;
  }
}