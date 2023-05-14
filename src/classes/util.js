const util = {
  getCurrentTab(subject) {
    if (!subject?.tabs?.length) { return null; }

    return subject.tabs.find(tab => tab?.current);
  },
  matchObjects(origin, destiny) {
    if (typeof origin !== 'object') { return; }
    if (typeof destiny !== 'object') { return; }

    Array.from(Object.keys(origin)).forEach(key => destiny[key] = origin[key]);

    return destiny;
  },
  getLetterByIndex(index) {
    if (typeof index !== 'number') { return String.fromCharCode(65); }

    return String.fromCharCode(index + 65);
  },
  getCurrentItem(items) {
    if (!items?.length) { return null; }

    return items.find(item => item.current);
  },
  getItemByUuid(items, uuid) {
    if (!items?.length) { return null; }

    return items.find(item => item.uuid === uuid);
  },
  getItemIndexByUuid(items, uuid) {
    if (!items?.length) { return null; }

    return items.map(item => item.uuid).indexOf(uuid);
  },
  handle(method, ...params) {
    if (typeof method !== 'function') { return; }

    method(...params);
  },
  setCurrentItem(items, setItems) {
    return function (uuid) {
      unselectCurrentItem();
      selectItemByUuid(uuid);
      setItems(items);

      function selectItemByUuid(uuid) {
        const newItem = util.getItemByUuid(items, uuid);

        if (newItem) { newItem.current = true; }
      }

      function unselectCurrentItem() {
        const currentItem = util.getCurrentItem(items);

        if (currentItem) { currentItem.current = false; }
      }
    }
  },
  updateItem(items, setItems) {
    return function (item, setItem) {
      if (!items.length) { return; }

      updateItems(item);
      setItem(item);
      setItems(items);

      function updateItems(item) {
        const index = util.getItemIndexByUuid(items, item.uuid);

        if (index === -1) { return; }

        items[index] = item;
      }
    }
  },
  match(origin, destiny) {
    if (typeof origin !== 'object') { return; }
    if (typeof destiny !== 'object') { return; }

    Array.from(Object.keys(origin)).forEach(key => destiny[key] = origin[key]);
  },
  toggleOpen(items, setItems) {
    return function (uuid) {
      openItemByUuid(uuid);
      setItems(items);

      function openItemByUuid(uuid) {
        const item = util.getItemByUuid(items, uuid);

        if (item) { item.open = !item.open; }
      }
    }
  }
};

export default util;