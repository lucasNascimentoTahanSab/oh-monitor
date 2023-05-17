/**
 * @file Módulo responsável pela definição de um objeto Snippet para armazenamento de código 
 * recuperado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Element from './Element.js';

export default class Snippet extends Element {
  constructor(snippet, content) {
    super(snippet);

    this.content = snippet?.content ?? content ?? null;
    this.commands = snippet?.commands ?? [];
  }
}