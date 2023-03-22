export default class SidebarItem {
  label;
  selected;

  constructor(sidebarItem) {
    this.label = sidebarItem?.label ?? '';
    this.selected = sidebarItem?.selected ?? false;
  }
}