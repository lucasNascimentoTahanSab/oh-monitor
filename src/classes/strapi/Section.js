import Code from "./Code";
import Element from "./Element";

export default class Section {
  constructor(section) {
    this.id = section?.id ?? null;
    this.title = section?.attributes?.title ?? section?.title ?? null;
    this.createdAt = section?.attributes?.createdAt ?? section?.createdAt ?? null;
    this.updatedAt = section?.attributes?.updatedAt ?? section?.updatedAt ?? null;
    this.publishedAt = section?.attributes?.publishedAt ?? section?.publishedAt ?? null;
    this.uuid = section?.attributes?.uuid ?? section?.uuid ?? null;
    this.elements = this._getElements(section?.attributes?.elements?.data ?? section?.elements);
    this.codes = this._getCodes(section?.attributes?.codes?.data ?? section?.codes);
  }

  _getCodes(codes) {
    if (!codes?.length) { return []; }

    return codes.map(code => new Code(code));
  }

  _getElements(elements) {
    if (!elements?.length) { return []; }

    return elements.map(element => new Element(element));
  }
}