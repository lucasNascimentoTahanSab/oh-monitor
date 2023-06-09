/**
 * @file Módulo responsável por desenhar BST em quadros para animação.
 * @copyright Lucas N. T. Sab 2023
 */
import { createElement } from 'react';
import BSTComponent from '../../components/StructureComponents/BSTComponents/BSTComponent/BSTComponent.js';
import Drawing from './Drawing.js';
import Tree from '../tree/Tree.js';
import Node from '../tree/Node.js';
import NodeState from '../tree/NodeState.js';

export default class DrawingBST extends Drawing {
  constructor() {
    super();

    this._trees = new Map();
  }

  /**
   * Método responsável pela interpretação dos comandos recebidos e retorno dos quadros
   * a serem exibidos em animação para BST.
   * 
   * @param {array} commands 
   * @returns {array}
   */
  parse(commands) {
    super.parse();

    this._trees.clear();

    commands.forEach(this._initializeTrees.bind(this));

    return this._snapshots;
  }

  /**
   * Método responsável pela inicialização das árvores binárias de busca de acordo
   * com comandos recebidos.
   * 
   * @param {object} command 
   */
  _initializeTrees(command) {
    switch (command.operation) {
      case 'initialize':
        this._initializeTree(command);
        break;
      case 'insert':
        this._insertObject(command);
        this._snapshot();
        break;
      case 'delete':
        this._deleteObject(command);
        this._snapshot();
        break;
      case 'update':
        this._updateObject(command);
        this._snapshot();
        break;
      case 'walk':
        this._walkthroughTree(command);
        this._snapshot();
        break;
      case 'markDelete':
        this._markDelete(command);
        this._snapshot();
        break;
      case 'found':
        this._found(command);
        this._snapshot();
        break;
      case 'exitFound':
        this._exitFound(command);
        this._snapshot();
        break;
      default:
        break;
    }
  }

  /**
   * Método responsável por encerar abertura de buscar em BST.
   */
  _exitFound(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._exitFoundRecursively(new Node(tree.root));

    this._trees.set(command.structure, tree);
  }

  _exitFoundRecursively(node) {
    if (!node) { return node; }

    node.left = this._exitFoundRecursively(node.left ? new Node(node.left) : null);

    node = new Node({ ...node, state: { ...node.state, found: false } });

    node.right = this._exitFoundRecursively(node.right ? new Node(node.right) : null);

    return new Node(node);
  }

  /**
   * Método responsável por marcar o elemento como encontrado.
   * 
   * @param {object} command 
   */
  _found(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._foundRecursively(tree.root ? new Node(tree.root) : null, command);

    this._trees.set(command.structure, tree);
  }

  _foundRecursively(node, command) {
    if (command.value < node.value) { node.left = this._foundRecursively(new Node(node.left), command); }
    else if (command.value > node.value) { node.right = this._foundRecursively(new Node(node.right), command); }
    else { node = new Node({ ...node, state: { found: true } }); }

    return node;
  }

  /**
   * Método responsável por marcar para remoção o elemento indicado no comando
   * recebido.
   * 
   * @param {object} command 
   */
  _markDelete(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._markDeleteRecursively(tree.root ? new Node(tree.root) : null, command);

    this._trees.set(command.structure, tree);
  }

  _markDeleteRecursively(node, command) {
    if (!node) { return node; }

    if (command.value < node.value) { node.left = this._markDeleteRecursively(new Node(node.left), command); }
    else if (command.value > node.value) { node.right = this._markDeleteRecursively(new Node(node.right), command); }
    else if (command.value === node.value && command.address !== node.address) { node.right = this._markDeleteRecursively(new Node(node.right), command); }
    else { return new Node({ ...node, state: { delete: true } }); }

    return node;
  }

  /**
   * Método responsável pelo registro de um novo quadro a partir do estado atual das
   * árvores binárias de busca.
   */
  _snapshot() {
    this._snapshots.push(this._build());
  }

  _build() {
    return Array.from(this._trees.values()).map(this._createTreeElement);
  }

  _createTreeElement(tree) {
    return createElement(BSTComponent, { key: `_${tree.address}`, tree });
  }

  /**
   * Método responsável por construir quadro em caminho pela árvore binária de busca.
   * 
   * @param {object} command 
   */
  _walkthroughTree(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._walkthroughTreeRecursively(tree.root ? new Node(tree.root) : null, command);

    this._trees.set(command.structure, tree);

    this._clearStatus();
  }

  _clearStatus() {
    this._status.origin = false;
    this._status.destiny = false;
  }

  /**
   * Método responsável pela atualização dos nós de origem e destino em caminho pela
   * árvore binária de busca.
   * 
   * @param {object} node 
   * @param {object} command 
   * @returns {object}
   */
  _walkthroughTreeRecursively(node, command) {
    if (!node) { return node; }

    if (node.value === command.origin) { node = this._originFound(new Node(node)); }
    if (node.value === command.destiny) { node = this._destinyFound(new Node(node)); }

    if (!this._status.origin && command.origin !== null) { node = this._findOrigin(new Node(node), command); }
    if (!this._status.destiny && command.destiny !== null) { node = this._findDestiny(new Node(node), command); }

    return node;
  }

  /**
   * Método responsável pela atualização do nó de destino em caminho por árvore binária
   * de busca.
   * 
   * @param {object} node 
   * @param {object} command 
   * @returns {object}
   */
  _findDestiny(node, command) {
    if (command.destiny < node.value) { node.left = this._walkthroughTreeRecursively(new Node(node.left), command); }
    else if (command.destiny > node.value) { node.right = this._walkthroughTreeRecursively(new Node(node.right), command); }

    return node;
  }

  /**
   * Método responsável pela atualização do nó de origem em caminho por árvore binária
   * de busca.
   * 
   * @param {object} node 
   * @param {object} command 
   * @returns {object}
   */
  _findOrigin(node, command) {
    if (command.origin < node.value) { node.left = this._walkthroughTreeRecursively(new Node(node.left), command); }
    else if (command.origin > node.value) { node.right = this._walkthroughTreeRecursively(new Node(node.right), command); }

    return node;
  }

  _destinyFound(node) {
    this._status.destiny = true;

    return this._focusNode(node);
  }

  _originFound(node) {
    this._status.origin = true;

    return this._removeNodeState(node);
  }

  _focusNode(node) {
    return new Node({ ...node, state: { delete: node.state.delete, found: node.state.found, focus: true } });
  }

  _removeNodeState(node) {
    return new Node({ ...node, state: { delete: node.state.delete, found: node.state.found, focus: false } });
  }

  /**
   * Método responsável pela atualização de um objeto na árvore binária de busca de
   * acordo com o comando recebido.
   * 
   * @param {object} command 
   */
  _updateObject(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._updateObjectRecursively(tree.root ? new Node(tree.root) : null, command);

    this._trees.set(command.structure, tree);
  }

  _updateObjectRecursively(node, command) {
    if (command.old < node.value) { node.left = this._updateObjectRecursively(new Node(node.left), command); }
    else if (command.old > node.value) { node.right = this._updateObjectRecursively(new Node(node.right), command); }
    else { node = new Node({ ...node, value: command.new, state: { update: true } }); }

    return node;
  }

  /**
   * Método responsável pela remoção de um objeto da árvore binária de busca de acordo 
   * com o comando recebido.
   * 
   * @param {object} command 
   */
  _deleteObject(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._deleteObjectRecursively(tree.root ? new Node(tree.root) : null, command);

    this._trees.set(command.structure, tree);
  }

  _deleteObjectRecursively(node, command) {
    if (!node) { return node; }

    if (command.value < node.value) { node.left = this._deleteObjectRecursively(new Node(node.left), command); }
    else if (command.value > node.value) { node.right = this._deleteObjectRecursively(new Node(node.right), command); }
    else if (command.value === node.value && command.address !== node.address) { node.right = this._deleteObjectRecursively(new Node(node.right), command); }
    else {
      if (!node.left) { return node.right; }
      if (!node.right) { return node.left; }
    }

    return node;
  }

  /**
   * Método responsável pela inserção de um objeto na árvore binária de busca de acordo 
   * com o comando recebido.
   * 
   * @param {object} command 
   */
  _insertObject(command) {
    const tree = new Tree(this._trees.get(command.structure));

    tree.root = this._insertObjectRecursively(tree.root, command);

    this._trees.set(command.structure, tree);
  }

  _insertObjectRecursively(node, command) {
    if (!node) { return new Node({ ...command, state: { insert: true } }); }

    if (command.value < node.value) { node.left = this._insertObjectRecursively(node.left ? new Node(node.left) : null, command); }
    else if (command.value > node.value) { node.right = this._insertObjectRecursively(node.right ? new Node(node.right) : null, command); }

    return node;
  }

  /**
   * Método responsável pela inicialização de uma nova árvore de acordo com comando 
   * recebido.
   * 
   * @param {object} command 
   */
  _initializeTree(command) {
    this._trees.set(command.address, new Tree(command));
  }
}