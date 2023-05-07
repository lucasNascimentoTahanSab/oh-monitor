export default class Node {
  constructor(node) {
    this.address = node?.address ?? null;
    this.parent = node?.parent ?? null;
    this.value = node?.value ?? null;
    this.left = node?.left ?? null;
    this.right = node?.right ?? null;
    this.focus = true;
  }
}