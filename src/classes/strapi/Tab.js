import Navigation from './Navigation.js';
import Section from './Section.js';

export default class Tab {
  constructor(tab) {
    this.id = tab?.id ?? null;
    this.title = tab?.attributes?.title ?? tab?.title ?? null;
    this.uuid = tab?.attributes?.uuid ?? tab?.uuid ?? null;
    this.createdAt = tab?.attributes?.createdAt ?? tab?.createdAt ?? null;
    this.updatedAt = tab?.attributes?.updatedAt ?? tab?.updatedAt ?? null;
    this.publishedAt = tab?.attributes?.publishedAt ?? tab?.publishedAt ?? null;
    this.current = tab?.attributes?.current ?? tab?.current ?? false;
    this.sections = this._getSections(tab?.attributes?.sections?.data ?? tab?.sections);
    this.navigation = tab?.attributes?.navigation?.data ? new Navigation(tab.attributes.navigation.data)
      : tab?.navigation ? new Navigation(tab.navigation)
        : null;
  }

  _getSections(sections) {
    if (!sections?.length) { return []; }

    return sections.map(section => new Section(section));
  }
}