/**
 * @file Módulo responsável pela montagem dos elementos descritos em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import { createElement } from 'react';
import CodeSnippet from '../../components/CodeComponents/CodeSnippet/CodeSnippet.js';
import Exercises from '../../components/ExerciseComponents/Exercises/Exercises.js';

const ELEMENTS = {
  'p': element => Builder._getInlineElement(element),
  'li': element => Builder._getInlineElement(element),
  'ol': element => Builder._getBlockElement(element),
  'ul': element => Builder._getBlockElement(element),
  'snippet': element => Builder._getCodeSnippet(element),
  'exercise': element => Builder._getExercise(element)
};

export default class Builder {
  /**
   * Método responsável pela montagem do elemento recebido em ReactElement para posterior
   * exibição em tela.
   * 
   * @param {object} element 
   * @returns {ReactElement}
   */
  static getElement(element) {
    return ELEMENTS[element?.type]?.(element);
  }

  static _getExercise(element) {
    return createElement(Exercises, { key: element.uid, element });
  }

  static _getCodeSnippet(element) {
    return createElement(CodeSnippet, { key: element.uid, element });
  }

  static _getBlockElement(element) {
    return createElement(element.type, { key: element.uid, id: element.uid }, Builder._getBlockElementInnerHTML(element));
  }

  /**
   * Método responsável pela montagem de elementos internos.
   * 
   * @param {object} element 
   * @returns {array}
   */
  static _getBlockElementInnerHTML(element) {
    if (!element.elements?.length) { return; }

    return element.elements.map(innerElement => Builder.getElement(innerElement));
  }

  static _getInlineElement(element) {
    return createElement(element.type, { key: element.uid, id: element.uid }, element.value);
  }
}