/*global $, bookmark, api, store*/

'use strict';

function main() {
  bookmark.bindEventListeners();
  api.getBookmarks()
    .then(res => {
      res.forEach(bookmark => store.addBookmark(bookmark));
      bookmark.render();
    });
}

$(main);