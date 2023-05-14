import Element from "./strapi/Element";

export default class Snippet extends Element {
  constructor(snippet, content) {
    super(snippet);

    this.content = content ?? null;
    this.commands = [];
  }
}