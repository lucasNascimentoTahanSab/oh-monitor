/**
 * @file Módulo responsável pela montagem dos elementos descritos em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import { createElement } from 'react';
import CodeSnippet from '../../components/CodeComponents/CodeSnippet/CodeSnippet';
import CodeEditor from '../../components/CodeComponents/CodeEditor/CodeEditor';

export default class Builder {
  /**
   * Método responsável pela montagem do elemento recebido em ReactElement para posterior
   * exibição em tela.
   * 
   * @param {object} element 
   * @returns {ReactElement}
   */
  static getElement(element) {
    switch (element?.type) {
      case 'p':
        return Builder._getInlineElement(element);
      case 'li':
        return Builder._getInlineElement(element);
      case 'ol':
        return Builder._getBlockElement(element);
      case 'ul':
        return Builder._getBlockElement(element);
      case 'snippet':
        return Builder._getCodeSnippet(element);
      case 'code':
        return Builder._getCodeEditor(element);
      default:
        break;
    }
  }

  static _getCodeEditor(element) {
    return createElement(CodeEditor, { key: element.uuid, element });
  }

  static _getCodeSnippet(element) {
    return createElement(CodeSnippet, { key: element.uuid, element });
  }

  static _getBlockElement(element) {
    return createElement(element.type, { key: element.uuid, id: element.uuid }, Builder._getBlockElementInnerHTML(element));
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
    return createElement(element.type, { key: element.uuid, id: element.uuid }, element.value);
  }
}