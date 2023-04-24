import { createElement } from "react";

const objects = new Map();

export function execute(command) {
  switch (command.operation) {
    case 'insert':
      insertObject(command);
      break;
    case 'delete':
      deleteObject(command);
      break;
    default:
      break;
  }
}

function deleteObject(command) {
  objects.delete(command.address);
}

function insertObject(command) {
  objects.set(command.address, createElement('div', { className: 'animate-object', key: command.address }, command.value));
}

const animate = { execute, objects };

export default animate;