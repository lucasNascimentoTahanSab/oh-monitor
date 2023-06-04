/**
 * @file Módulo responsável pela normalização do objeto UserTab retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Tab from '../Tab.js';
import UserSection from './UserSection.js';
import Util from '../../util/Util.js';

export default class UserTab extends Tab {
  constructor(tab, state) {
    super(tab);

    this.current = state?.current ?? this.current;
    this.solved = state?.solved ?? this.solved;
    this.sections = this._getUserSections(tab?.attributes?.sections?.data ?? tab?.sections, state?.sections);
  }

  _getUserSections(sections, state) {
    if (!sections?.length) { return []; }

    return sections.map(section => new UserSection(section, Util.getItemByUid(state, section.uid)));
  }
}