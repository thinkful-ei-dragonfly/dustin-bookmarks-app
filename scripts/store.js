'use strict';

const store = (function() {

function addBookmark(title, rating, desc, url) {
    let bookmark = {
      title, 
      desc,
      rating, 
      url,
    };

    this.bookmarks.push(bookmark);
  }

  function addNew() {
    this.addingNew = true;
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
    addNew,
    changeRatingFilter,
    updateError,
  };
})();