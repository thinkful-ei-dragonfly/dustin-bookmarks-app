'use strict';

const store = (function() {

  function addBookmark(bookmark) {
    // let bookmark = {
    //   title, 
    //   desc,
    //   rating, 
    //   url,
    //   fullView: false,
    // };
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
  };
})();