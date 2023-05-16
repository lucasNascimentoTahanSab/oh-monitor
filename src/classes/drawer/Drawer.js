/**
 * @file Módulo responsável por direcionar comandos à estrutura de dados que se
 * deseja animar.
 * @copyright Lucas N. T. Sab 2023
 */
import DrawingBST from '../drawing/DrawingBST';

const STRUCTURES = {
  'BST': commands => (new DrawingBST()).parse(commands)
};

export default class Drawer {
  /**
   * Método responsável por desenhar quadros para exibição de animação da estrutura
   * desejada.
   * 
   * @param {string} structure 
   * @returns {array}
   */
  static draw(structure) {
    return { with: commands => STRUCTURES[structure]?.(commands) };
  }
}