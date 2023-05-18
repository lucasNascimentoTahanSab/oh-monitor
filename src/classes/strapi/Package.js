export default class Package {
  constructor(currentPackage, codes) {
    this.codes = currentPackage?.codes ?? codes ?? new Map();
    this.uid = currentPackage?.uid ?? null
    this.commands = currentPackage?.commands ?? [];
    this.output = currentPackage?.output ?? [];
    this.input = currentPackage?.input ?? [];
  }
}