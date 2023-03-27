export default class ClassroomSidebarItem {
  label;
  selected;

  constructor(sidebarItem) {
    this.label = sidebarItem?.label ?? '';
    this.selected = sidebarItem?.selected ?? false;
  }
}