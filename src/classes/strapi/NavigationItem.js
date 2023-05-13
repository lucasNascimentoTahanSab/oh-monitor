export default class NavigationItem {
  constructor(navigationItem) {
    this.id = navigationItem?.id ?? null;
    this.title = navigationItem?.attributes?.title ?? navigationItem?.title ?? null;
    this.uuid = navigationItem?.attributes?.uuid ?? navigationItem?.uuid ?? null;
    this.createdAt = navigationItem?.attributes?.createdAt ?? navigationItem?.createdAt ?? null;
    this.updatedAt = navigationItem?.attributes?.updatedAt ?? navigationItem?.updatedAt ?? null;
    this.publishedAt = navigationItem?.attributes?.publishedAt ?? navigationItem?.publishedAt ?? null;
    this.uuidParent = navigationItem?.attributes?.uuidParent ?? navigationItem?.uuidParent ?? null;
    this.navigationItems = this._getNavigationItems(navigationItem?.attributes?.navigationItems?.data ?? navigationItem?.navigationItems);
  }

  _getNavigationItems(navigationItems) {
    if (!navigationItems?.length) { return []; }

    return navigationItems.map(navigationItem => new NavigationItem(navigationItem));
  }
}