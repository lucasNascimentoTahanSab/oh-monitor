export default class Package {
  constructor(files) {
    this.files = files ?? new Map();
    this.output = [];
    this.input = [];
    this.commands = [];
  }
}