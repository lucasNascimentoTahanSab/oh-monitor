/**
 * @file Módulo responsável pela normalização do objeto UserSubject retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Subject from '../Subject.js';
import UserTab from './UserTab.js';
import Util from '../../util/Util.js';

export default class UserSubject extends Subject {
  constructor(subject, state) {
    super(subject);

    this.tabs = this._getUserTabs(this.tabs, state?.tabs);
  }

  _getUserTabs(tabs, state) {
    if (!tabs?.length) { return []; }

    return tabs.map(tab => new UserTab(tab, Util.getItemByUid(state, tab.uid)));
  }
}