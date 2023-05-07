import { createElement } from 'react';
import Tree from './tree.js';
import Node from './node.js';

const trees = new Map();
const snapshots = [];
const status = { origin: false, destiny: false };

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
      snapshot();
      break;
    case 'insert':
      insertObject(command);
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
  const tree = trees.get(command.structure);

  tree.root = walkthroughTreeRecursively(tree.root, command);

  trees.set(command.structure, tree);

  clearStatus();
}

function clearStatus() {
  status.origin = false;
  status.destiny = false;
}

function walkthroughTreeRecursively(node, command) {
  if (!node) { return node; }

  if (node.value === command.origin) { node = originFound(node); }
  if (node.value === command.destiny) { node = destinyFound(node); }

  if (!status.origin && command.origin !== null) { node = findOrigin(node, command); }
  if (!status.destiny && command.destiny !== null) { node = findDestiny(node, command); }

  return node;
}

function findDestiny(node, command) {
  if (command.destiny < node.value) { node.left = walkthroughTreeRecursively(node.left, command); }
  else if (command.destiny > node.value) { node.right = walkthroughTreeRecursively(node.right, command); }

  return node;
}

function findOrigin(node, command) {
  if (command.origin < node.value) { node.left = walkthroughTreeRecursively(node.left, command); }
  else if (command.origin > node.value) { node.right = walkthroughTreeRecursively(node.right, command); }

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
  node.focus = true;

  return node;
}

function unfocusNode(node) {
  node.focus = false;

  return node;
}

function insertObject(command) {
  const tree = trees.get(command.structure);

  tree.root = insertObjectRecursively(tree.root, command);

  trees.set(command.structure, tree);
}

function insertObjectRecursively(node, command) {
  if (!node) { return new Node(command); }

  if (command.value < node.value) { node.left = insertObjectRecursively(node.left, command); }
  else if (command.value > node.value) { node.right = insertObjectRecursively(node.right, command); }

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
  return createElement(
    'div',
    { key: tree.address, id: `_${tree.address}`, className: 'animation-engine__tree' },
    createNodeElement(tree.root),
    createChildrenElement(tree.root)
  );
}

function createChildrenElement(node) {
  if (!node?.left && !node?.right) { return null; }

  return createElement(
    'div',
    { key: `${node.address}-children`, id: `_${node.address}-children`, className: 'animation-engine__children' },
    createLeftChildElement(node),
    createRightChildElement(node)
  );
}

function createRightChildElement(node) {
  if (!node?.right) { return null; }

  return createElement(
    'div',
    { key: `${node.right.address}-subtree`, id: `_${node.right.address}-subtree`, className: 'animation-engine__subtree animation-engine__subtree--right' },
    createNodeElement(node.right),
    createChildrenElement(node.right)
  );
}

function createLeftChildElement(node) {
  if (!node?.left) { return null; }

  return createElement(
    'div',
    { key: `${node.left.address}-subtree`, id: `_${node.left.address}-subtree`, className: 'animation-engine__subtree animation-engine__subtree--left' },
    createNodeElement(node.left),
    createChildrenElement(node.left)
  );
}

function createNodeElement(node) {
  if (!node) { return null; }

  return createElement('span', { key: node.address, id: `_${node.address}`, className: `animation-engine__node ${getFocusOn(node)}` }, node.value);
}

function getFocusOn(node) {
  return node.focus ? 'animation-engine__node--focus' : '';
}

const animation = { parse };

export default animation;