import Element from './Element.js';

export default class Section {
  constructor(section) {
    this.id = section?.id ?? null;
    this.title = section?.attributes?.title ?? section?.title ?? null;
    this.createdAt = section?.attributes?.createdAt ?? section?.createdAt ?? null;
    this.updatedAt = section?.attributes?.updatedAt ?? section?.updatedAt ?? null;
    this.publishedAt = section?.attributes?.publishedAt ?? section?.publishedAt ?? null;
    this.uuid = section?.attributes?.uuid ?? section?.uuid ?? null;
    this.sections = this._getSections(section?.attributes?.sections?.data ?? section?.sections);
    this.elements = this._getElements(section?.attributes?.elements?.data ?? section?.elements);
  }

  _getElements(elements) {
    if (!elements?.length) { return []; }

    return elements.map(element => new Element(element));
  }

  _getSections(sections) {
    if (!sections?.length) { return []; }

    return sections.map(section => new Section(section));
  }
}