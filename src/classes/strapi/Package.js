export default class Package {
  constructor(currentPackage, files) {
    this.files = currentPackage?.files ?? files ?? new Map();
    this.uid = currentPackage?.uid ?? null
    this.commands = currentPackage?.commands ?? [];
    this.output = currentPackage?.output ?? [];
    this.input = currentPackage?.input ?? [];
  }
}