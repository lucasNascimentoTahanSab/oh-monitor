import Exercise from './exercise'

const util = {
  getMainTab(subject) {
    if (!subject?.attributes?.tabs?.data?.length) { return null; }

    return subject.attributes.tabs.data.find(tab => tab.attributes?.main);
  },
  getExercises(tab) {
    if (!tab?.attributes?.exercises?.data?.length) { return []; }

    return tab.attributes.exercises.data.map(exercise => new Exercise(exercise));
  },
  getLetterByIndex(index) {
    if (typeof index !== 'number') { return String.fromCharCode(65); }

    return String.fromCharCode(index + 65);
  },
  getCurrentItem: items => {
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
      unselectCurrentFile();
      selectFileByUuid(uuid);

      setItems([...items]);

      function selectFileByUuid(uuid) {
        const newFile = util.getItemByUuid(items, uuid);

        if (!newFile) { return; }

        newFile.current = true;
      }

      function unselectCurrentFile() {
        const currentFile = util.getCurrentItem(items);

        if (!currentFile) { return; }

        currentFile.current = false;
      }
    }
  },
  updateItem(items, setItems) {
    return function (item, setItem) {
      if (!items.length) { return; }

      updateItems(item);
      setItem(item);

      function updateItems(item) {
        const index = util.getItemIndexByUuid(items, item.uuid);

        if (index === -1) { return; }

        items[index] = item;

        setItems(items);
      }
    }
  }
};

export default util;