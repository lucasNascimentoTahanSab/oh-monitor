import Code from "./strapi/Code";

export default class File extends Code {
  constructor(file, content) {
    super(file);

    this.content = content ?? null;
    this.output = [];
    this.input = [];
    this.commands = [];
  }
}