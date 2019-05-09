'use strict';

const store = (function() {

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  function addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
  }

  function toggleAddNew() {
    this.addingNew = !this.addingNew;
  }

  function changeRatingFilter(rating) {
    this.ratingFilter = rating;
  }

  function updateError(error) {
    this.error = error;
  }

  return {
    bookmarks: [],
    addingNew: false,
    ratingFilter: 0,
    error: null,

    addBookmark,
    toggleAddNew,
    changeRatingFilter,
    updateError,
    findAndDelete,
  };
})();