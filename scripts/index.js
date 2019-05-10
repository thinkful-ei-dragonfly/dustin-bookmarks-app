/*global $, bookmark, api, store*/

'use strict';

function main() {
  bookmark.bindEventListeners();
  api.getBookmarks()
    .then(res=> res.json())
    .then(res => {
      console.log('got my objects suckas!');
      res.forEach(bookmark => store.addBookmark(bookmark));
      bookmark.render();
    });
}

$(main);