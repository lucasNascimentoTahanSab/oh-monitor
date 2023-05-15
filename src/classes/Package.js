import { createElement } from "react";
import { ReactComponent as Right } from '../svg/right.svg';

export default class Package {
  constructor(currentPackage, files) {
    this.files = currentPackage?.files ?? files ?? new Map();
    this.uuid = currentPackage?.uuid ?? null
    this.commands = currentPackage?.commands ?? [];
    this.output = currentPackage?.output ?? [this._getInitialOutputContent()];
    this.input = currentPackage?.input ?? [this._getInitialInputContent()];
  }

  _getInitialInputContent() {
    return createElement(
      Right,
      {
        key: `${this.uuid}-input-right-0`,
        style: { height: '1rem', width: '1rem', minHeight: '1rem' },
        alt: 'Arrow pointing to the right.'
      }
    );
  }

  _getInitialOutputContent() {
    return createElement(
      Right,
      {
        key: `${this.uuid}-output-right-0`,
        style: { height: '1rem', width: '1rem', minHeight: '1rem' },
        alt: 'Arrow pointing to the right.'
      }
    );
  }
}