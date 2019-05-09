
'use strict';

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/dustin/bookmarks';

  function getBookmarks(){
    return fetch(BASE_URL)
      .then(res => res.json);
  }
  
  function createBookmark(newBookmark) {
    const options ={
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark,
    };
    return fetch(BASE_URL, options);
  }

  function deleteBookmark(id) {
    const options = {
      method: 'DELETE'
    };
    fetch(`${BASE_URL}/${id}`, options);
  }

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
})();