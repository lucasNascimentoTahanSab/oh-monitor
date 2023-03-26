import { createElement } from 'react';
import CodeSnippet from '../components/CodeSnippet/CodeSnippet';

export function getElement(element) {
  switch (element?.attributes?.type) {
    case 'p':
      return getInlineElement(element);
    case 'li':
      return getInlineElement(element);
    case 'ol':
      return getBlockElement(element);
    case 'ul':
      return getBlockElement(element);
    case 'snippet':
      return getCodeSnippet(element);
    default:
      break;
  }
}

function getCodeSnippet(element) {
  return createElement(CodeSnippet, { key: element.id, displayAnimationScreen: element.attributes.displayAnimationScreen });
}

function getBlockElement(element) {
  return createElement(element.attributes.type, { key: element.id }, getBlockElementInnetHTML(element));
}

function getBlockElementInnetHTML(element) {
  if (!Array.isArray(element.attributes?.elements?.data)) { return; }

  return element.attributes.elements.data.map(innerElement => getElement(innerElement));
}

function getInlineElement(element) {
  return createElement(element.attributes.type, { key: element.id }, element.attributes.value);
}