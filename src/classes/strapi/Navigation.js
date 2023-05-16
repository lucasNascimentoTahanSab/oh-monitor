import NavigationItem from './NavigationItem.js';

export default class Navigation {
  constructor(navigation) {
    this.id = navigation?.id ?? null;
    this.uuid = navigation?.attributes?.uuid ?? navigation?.uuid ?? null;
    this.createdAt = navigation?.attributes?.createdAt ?? navigation?.createdAt ?? null;
    this.updatedAt = navigation?.attributes?.updatedAt ?? navigation?.updatedAt ?? null;
    this.publishedAt = navigation?.attributes?.publishedAt ?? navigation?.publishedAt ?? null;
    this.navigationItems = this._getNavigationItems(navigation?.attributes?.navigationItems?.data ?? navigation?.navigationItems);
  }

  _getNavigationItems(navigationItems) {
    if (!navigationItems?.length) { return []; }

    return navigationItems.map(navigationItem => new NavigationItem(navigationItem));
  }
}