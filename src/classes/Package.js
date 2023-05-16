export default class Package {
  constructor(currentPackage, files) {
    this.files = currentPackage?.files ?? files ?? new Map();
    this.uuid = currentPackage?.uuid ?? null
    this.commands = currentPackage?.commands ?? [];
    this.output = currentPackage?.output ?? [];
    this.input = currentPackage?.input ?? [];
  }
}