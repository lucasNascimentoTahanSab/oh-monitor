import Exercise from './exercise'

export const util = {
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
  }
};