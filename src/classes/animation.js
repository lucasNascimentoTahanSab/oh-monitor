import { createElement } from 'react';
import Tree from './tree.js';
import Node from './node.js';
import TreeComponent from '../components/TreeComponents/TreeComponent/TreeComponent.js';

const trees = new Map();
const snapshots = [];
const status = { origin: false, destiny: false };
let focus = null;

function parse(commands) {
  trees.clear();
  snapshots.splice(0, snapshots.length);

  commands.forEach(initializeTrees);

  return snapshots;
}

function initializeTrees(command) {
  switch (command.operation) {
    case 'initialize':
      initializeTree(command);
      break;
    case 'insert':
      insertObject(command);
      snapshot();
      break;
    case 'delete':
      deleteObject(command);
      snapshot();
      break;
    case 'update':
      updateObject(command);
      snapshot();
      break;
    case 'walk':
      walkthroughTree(command);
      snapshot();
      break;
    default:
      break;
  }
}

function walkthroughTree(command) {
  const tree = new Tree(trees.get(command.structure));

  tree.root = walkthroughTreeRecursively(new Node(tree.root), command);

  trees.set(command.structure, tree);

  clearStatus();
}

function clearStatus() {
  status.origin = false;
  status.destiny = false;
}

function walkthroughTreeRecursively(node, command) {
  if (!node) { return node; }

  if (node.value === command.origin) { node = originFound(new Node(node)); }
  if (node.value === command.destiny) { node = destinyFound(new Node(node)); }

  if (!status.origin && command.origin !== null) { node = findOrigin(new Node(node), command); }
  if (!status.destiny && command.destiny !== null) { node = findDestiny(new Node(node), command); }

  return node;
}

function findDestiny(node, command) {
  if (command.destiny < node.value) { node.left = walkthroughTreeRecursively(new Node(node.left), command); }
  else if (command.destiny > node.value) { node.right = walkthroughTreeRecursively(new Node(node.right), command); }

  return node;
}

function findOrigin(node, command) {
  if (command.origin < node.value) { node.left = walkthroughTreeRecursively(new Node(node.left), command); }
  else if (command.origin > node.value) { node.right = walkthroughTreeRecursively(new Node(node.right), command); }

  return node;
}

function destinyFound(node) {
  status.destiny = true;

  return focusNode(node);
}

function originFound(node) {
  status.origin = true;

  return unfocusNode(node);
}

function focusNode(node) {
  return new Node({ ...node, focus: true });
}

function unfocusNode(node) {
  return new Node({ ...node, focus: false });
}

function updateObject(command) {
  const tree = new Tree(trees.get(command.structure));

  tree.root = updateObjectRecursively(new Node(tree.root), command);

  trees.set(command.structure, tree);
}

function updateObjectRecursively(node, command) {
  if (command.old < node.value) { node.left = updateObjectRecursively(new Node(node.left), command); }
  else if (command.old > node.value) { node.right = updateObjectRecursively(new Node(node.right), command); }
  else { node = new Node({ ...node, value: command.new, focus: true }); }

  return node;
}

function deleteObject(command) {
  const tree = new Tree(trees.get(command.structure));

  tree.root = deleteObjectRecursively(new Node(tree.root), command);

  trees.set(command.structure, tree);
}

function deleteObjectRecursively(node, command) {
  if (!node) { return node; }

  if (command.value < node.value) { node.left = deleteObjectRecursively(new Node(node.left), command); }
  else if (command.value > node.value) { node.right = deleteObjectRecursively(new Node(node.right), command); }
  else if (command.value === node.value && command.address !== node.address) { node.right = deleteObjectRecursively(new Node(node.right), command); }
  else {
    if (!node.left) { return node.right; }
    if (!node.right) { return node.left; }
  }

  return node;
}

function insertObject(command) {
  const tree = new Tree(trees.get(command.structure));

  tree.root = insertObjectRecursively(tree.root, command);

  trees.set(command.structure, tree);
}

function insertObjectRecursively(node, command) {
  if (!node) { return new Node(command); }

  if (command.value < node.value) { node.left = insertObjectRecursively(node.left ? new Node(node.left) : null, command); }
  else if (command.value > node.value) { node.right = insertObjectRecursively(node.right ? new Node(node.right) : null, command); }

  return node;
}

function initializeTree(command) {
  trees.set(command.address, new Tree(command));
}

function snapshot() {
  snapshots.push(build());
}

function build() {
  return Array.from(trees.values()).map(tree => createTreeElement(tree));
}

function createTreeElement(tree) {
  return createElement(TreeComponent, { key: `_${tree.address}`, tree });
}

const animation = { parse };

export default animation;