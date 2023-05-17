/**
 * @file Módulo responsável pela normalização do objeto NavigationItem retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
export default class NavigationItem {
  constructor(navigationItem) {
    this.id = navigationItem?.id ?? null;
    this.title = navigationItem?.attributes?.title ?? navigationItem?.title ?? null;
    this.uid = navigationItem?.attributes?.uid ?? navigationItem?.uid ?? null;
    this.createdAt = navigationItem?.attributes?.createdAt ?? navigationItem?.createdAt ?? null;
    this.updatedAt = navigationItem?.attributes?.updatedAt ?? navigationItem?.updatedAt ?? null;
    this.publishedAt = navigationItem?.attributes?.publishedAt ?? navigationItem?.publishedAt ?? null;
    this.uidParent = navigationItem?.attributes?.uidParent ?? navigationItem?.uidParent ?? null;
    this.uidParentNavigationItem = navigationItem?.attributes?.uidParentNavigationItem ?? navigationItem?.uidParentNavigationItem ?? null;
    this.current = navigationItem?.attributes?.current ?? navigationItem?.current ?? false;
    this.open = navigationItem?.attributes?.open ?? navigationItem?.open ?? false;
    this.navigationItems = this._getNavigationItems(navigationItem?.attributes?.navigationItems?.data ?? navigationItem?.navigationItems);
  }

  _getNavigationItems(navigationItems) {
    if (!navigationItems?.length) { return []; }

    return navigationItems.map(navigationItem => new NavigationItem(navigationItem));
  }
}