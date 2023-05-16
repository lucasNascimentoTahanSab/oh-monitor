import Code from './Code.js';

export default class File extends Code {
  constructor(file, content) {
    super(file);

    this.content = file?.content ?? content ?? null;
  }
}