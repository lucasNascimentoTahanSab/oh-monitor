export default class Command {
  constructor(command) {
    this.address = command?.[1] ?? null;
    this.value = command?.[2] ?? null;
    this.operation = command?.[3] ?? null;
  }
}