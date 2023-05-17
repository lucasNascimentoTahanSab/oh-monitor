/**
 * @file Módulo responsável pela normalização do objeto Navigation retornado em integração.
 * @copyright Lucas N. T. Sab 2023
 */
import NavigationItem from './NavigationItem.js';

export default class Navigation {
  constructor(navigation) {
    this.id = navigation?.id ?? null;
    this.uid = navigation?.attributes?.uid ?? navigation?.uid ?? null;
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