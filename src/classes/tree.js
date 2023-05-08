import Node from './node';

export default class Tree {
  constructor(tree) {
    this.address = tree?.address ?? null;
    this.root = tree?.root ?? null;
  }
}