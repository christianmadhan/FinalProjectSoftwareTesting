// sort by save date
  export function sortByDate (note_array) {
    let sortedarray = note_array.sort(function (first, second) {
      let firstDate = first.date;
      let secondDate = second.date;

      if (firstDate < secondDate) {
        return -1;
      }
      if (firstDate > secondDate) {
        return 1;
      }
      // dates are equal
      return 0;
    });
    return sortedarray;
  }

  // sort by length
  export function sortByLength(note_array) {
    let sortedarray = note_array.sort(function (first, second) {
      let firstLength = first.notelength;
      let secondLength = second.notelength;

      if (firstLength > secondLength) {
        return -1;
      }
      if (firstLength < secondLength) {
        return 1;
      }
      // notes length are equal
      return 0;
    });
    return sortedarray;
  }

  // sort by title
  export function sortByTitle(note_array) {
    let sortedarray = note_array.sort(function (first, second) {
      let titleA = first.title.toUpperCase();
      let titleB = second.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      // title must be equal
      return 0;
    });
    return sortedarray;
  }
