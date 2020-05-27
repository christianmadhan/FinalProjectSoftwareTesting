module.exports = {
  // sort by save date
  sortByDate: function (note_array) {
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
  },

  // sort by length
  sortByLength: function (note_array) {
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
  },

  // sort by title
  sortByTitle: function (note_array) {
    let sortedarray = note_array.sort(function (a, b) {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return sortedarray;
  }
}