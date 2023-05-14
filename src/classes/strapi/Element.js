import Code from "./Code";

export default class Element {
  constructor(element) {
    this.id = element?.id ?? null;
    this.type = element?.attributes?.type ?? element?.type ?? null;
    this.value = element?.attributes?.value ?? element?.value ?? null;
    this.createdAt = element?.attributes?.createdAt ?? element?.createdAt ?? null;
    this.updatedAt = element?.attributes?.updatedAt ?? element?.updatedAt ?? null;
    this.publishedAt = element?.attributes?.publishedAt ?? element?.publishedAt ?? null;
    this.displayAnimationScreen = element?.attributes?.displayAnimationScreen ?? element?.displayAnimationScreen ?? false;
    this.uuid = element?.attributes?.uuid ?? element?.uuid ?? null;
    this.elements = this._getElements(element?.attributes?.elements?.data ?? element?.elements);
    this.codes = this._getCodes(element?.attributes?.codes?.data ?? element?.codes);
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