/**
 * @file Módulo responsável por armazenar os quadros gerados para construção da animação 
 * em estruturas de dados distintas.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Drawing {
  constructor() {
    this._snapshots = [];
    this._status = { origin: false, destiny: false };
  }

  /**
   * Método responsável por reiniciar quadros a serem exibidos em animação previamente
   * à interpretação de novos comandos e geração de novos quadros.
   */
  parse() {
    this._snapshots.splice(0, this._snapshots.length);
  }
}