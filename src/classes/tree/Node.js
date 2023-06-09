import NodeState from "./NodeState";

/**
 * @file Módulo responsável pela construção de um nó em BST.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Node {
  constructor(node) {
    this.address = node?.address ?? null;
    this.value = node?.value ?? null;
    this.left = node?.left ?? null;
    this.right = node?.right ?? null;
    this.state = node?.state ? new NodeState(node.state) : new NodeState();
  }
}