/**
 * @file Módulo responsável pela normalização do objeto Subject retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import Tab from './Tab.js';

export default class Subject {
  constructor(subject) {
    this.id = subject?.attributes?.id ?? subject?.id ?? null;
    this.title = subject?.attributes?.title ?? subject?.title ?? null;
    this.description = subject?.attributes?.description ?? subject?.description ?? null;
    this.createdAt = subject?.attributes?.createdAt ?? subject?.createdAt ?? null;
    this.updatedAt = subject?.attributes?.updatedAt ?? subject?.updatedAt ?? null;
    this.publishedAt = subject?.attributes?.publishedAt ?? subject?.publishedAt ?? null;
    this.uid = subject?.attributes?.uid ?? subject?.uid ?? null;
    this.tabs = this._getTabs(subject?.attributes?.tabs?.data ?? subject?.tabs);
  }

  _getTabs(tabs) {
    if (!tabs?.length) { return []; }

    return tabs.map(tab => new Tab(tab));
  }
}