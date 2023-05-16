import Element from './Element';

export default class Snippet extends Element {
  constructor(snippet, content) {
    super(snippet);

    this.content = snippet?.content ?? content ?? null;
    this.commands = snippet?.commands ?? [];
  }
}