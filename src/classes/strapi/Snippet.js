/**
 * @file Módulo responsável pela definição de um objeto Snippet para armazenamento de código 
 * recuperado em integração.
 * @copyright Lucas N. T. Sab 2023
 */

import Code from "./Code.js";

export default class Snippet {
  constructor(snippet) {
    this.uid = snippet?.attributes?.uid ?? snippet?.uid ?? null;
    this.createdAt = snippet?.attributes?.createdAt ?? snippet?.createdAt ?? null;
    this.updatedAt = snippet?.attributes?.updatedAt ?? snippet?.updatedAt ?? null;
    this.publishedAt = snippet?.attributes?.publishedAt ?? snippet?.publishedAt ?? null;
    this.codes = this._getCodes(snippet?.attributes?.codes?.data ?? snippet?.codes);
    this.result = snippet?.result ?? null;
    this.commands = snippet?.commands ?? [];
    this.output = snippet?.output ?? [];
    this.input = snippet?.input ?? [];
  }

  _getCodes(codes) {
    if (!codes?.length) { return []; }

    return codes.map(code => new Code(code));
  }
}