/**
 * @file Módulo responsável pela definição de um objeto File para armazenamento de código 
 * recuperado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Code from './Code.js';

export default class File extends Code {
  constructor(file, content) {
    super(file);

    this.content = file?.content ?? content ?? null;
  }
}