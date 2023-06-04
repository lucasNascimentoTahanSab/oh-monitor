/**
 * @file Módulo responsável pela normalização do objeto UserSection retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Section from '../Section.js';
import UserElement from './UserElement.js';
import Util from '../../util/Util.js';

export default class UserSection extends Section {
  constructor(section, state) {
    super(section);

    this.sections = this._getUserSections(section?.attributes?.sections?.data ?? section?.sections, state?.sections);
    this.elements = this._getUserElements(section?.attributes?.elements?.data ?? section?.elements, state?.elements);
  }

  _getUserElements(elements, state) {
    if (!elements?.length) { return []; }

    return elements.map(element => new UserElement(element, Util.getItemByUid(state, element.uid)));
  }

  _getUserSections(sections, state) {
    if (!sections?.length) { return []; }

    return sections.map(section => new UserSection(section, Util.getItemByUid(state, section.uid)));
  }
}