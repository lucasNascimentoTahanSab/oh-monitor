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
  getCurrentFile(files) {
    if (!files?.length) { return null; }

    return files.find(file => file.current);
  }
};