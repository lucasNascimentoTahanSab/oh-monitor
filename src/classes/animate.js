import { createElement } from 'react';
import Tree from './tree.js';
import Node from './node.js';
import anime from 'animejs/lib/anime.es.js';

const trees = new Map();
const elements = [];

export function execute(commands) {
  if (!commands?.length) { return; }

  trees.clear();
  elements.splice(0, elements.length);

  commands.forEach(initializeTrees);

  build();
}

function build() {
  Array.from(trees.values()).forEach(tree => elements.push(createTreeElement(tree)));
}

function createTreeElement(tree) {
  return createElement(
    'div',
    { key: tree.address, id: tree.address, className: 'animation-engine__tree' },
    createNodeElement(tree.root),
    createChildrenElement(tree.root)
  );
}

function createChildrenElement(node) {
  if (!node?.left && !node?.right) { return null; }

  return createElement(
    'div',
    { key: `${node.address}-children`, id: `${node.address}-children`, className: 'animation-engine__children' },
    createLeftChildElement(node),
    createRightChildElement(node)
  );
}

function createRightChildElement(node) {
  if (!node?.right) { return null; }

  return createElement(
    'div',
    { key: `${node.right.address}-subtree`, id: `${node.right.address}-subtree`, className: 'animation-engine__subtree animation-engine__subtree--right' },
    createNodeElement(node.right),
    createChildrenElement(node.right)
  );
}

function createLeftChildElement(node) {
  if (!node?.left) { return null; }

  return createElement(
    'div',
    { key: `${node.left.address}-subtree`, id: `${node.left.address}-subtree`, className: 'animation-engine__subtree animation-engine__subtree--left' },
    createNodeElement(node.left),
    createChildrenElement(node.left)
  );
}

function createNodeElement(node) {
  if (!node) { return null; }

  return createElement('span', { key: node.address, id: node.address, className: 'animation-engine__node' }, node.value);
}

function initializeTrees(command) {
  switch (command.operation) {
    case 'initialize':
      initializeTree(command);
      break;
    case 'insert':
      insertObject(command);
      break;
    default:
      break;
  }
}

function insertObject(command) {
  const tree = trees.get(command.structure);

  tree.root = insertObjectRecursively(tree.root, command);

  trees.set(command.structure, tree);
}

function insertObjectRecursively(node, command) {
  if (!node) { return new Node(command); }

  if (command.value < node.value) { node.left = insertObjectRecursively(node.left, command); }
  else { node.right = insertObjectRecursively(node.right, command); }

  return node;
}

function initializeTree(command) {
  trees.set(command.address, new Tree(command));
}

const animate = { execute, elements };

export default animate;