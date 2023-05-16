/**
 * @file Módulo responsável pela construção de uma BST.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Tree {
  constructor(tree) {
    this.address = tree?.address ?? null;
    this.root = tree?.root ?? null;
  }
}