import Element from './Element.js';

export default class Snippet extends Element {
  constructor(snippet, content) {
    super(snippet);

    this.content = snippet?.content ?? content ?? null;
    this.commands = snippet?.commands ?? [];
  }
}