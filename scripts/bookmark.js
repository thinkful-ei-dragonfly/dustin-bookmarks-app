/*global $, store*/
'use strict';

//this file is for all my event listeners as well as my render function

//NEED TO ADD THE ABILITY TO EXPAND THE LIST WITHIN THE FUNCTION 
//AND INTEGRATE THE API CALLS INTO MY (POST) ADD ITEM AND (GET) RENDER.
//ALSO NEED TO WORK ON GETTING THE ID FROM EACH ELEMENT ON A DELETE CLICK AND ADDING A DELETE BUTTON
//NEED TO GET INTO THE FILTER FUNCTIONALITY ON THE DOM WITH RENDER.

const bookmark = (function() {

  function generateBookmarkElement(newBookmark){

    let expandedInfo= '';

    if(newBookmark.fullView){
      expandedInfo = `<li>Description: ${newBookmark.desc}</li>
                      <li>url: ${newBookmark.url}</li>`;
    }

    return `<li class ='bookmark-display'>
      <ul>
        <li>Title: ${newBookmark.title}</li>
        <li>Rating: ${newBookmark.rating}</li>
        ${expandedInfo}
      </ul>
    </li>`;
  }

  function generateBookmarkElementsString(bookmarkArray){
    return bookmarkArray.map(book => generateBookmarkElement(book)).join('');
  }

  function handleOpenAddForm() {
    $('#js-add-button').click(function(e){
      e.preventDefault();
      store.toggleAddNew();
      render();
    });
  }

  function handleAddBookmarkCancel() {
    $('#js-add-cancel').click(e => {
      e.preventDefault();
      store.toggleAddNew();
      render();
    });
  }

  function handleAddBookmarkSubmit() {
    $('#js-add-new-bookmark').submit(e => {
      e.preventDefault();

      const title = $('#js-title-input').val();
      const url = $('#js-url-input').val();
      const desc = $('#js-description-input').val();
      const rating = $('#js-rating-input').val();

      const bookmark = {
        title,
        desc,
        url,
        rating,
        fullView: false,
      };

      store.toggleAddNew();
      store.addBookmark(bookmark);
      render();

    });
  }
  



  function render() {
    if(store.addingNew) {
      $('#js-add-new-bookmark').removeClass('hidden');
    }
    else {
      $('#js-add-new-bookmark').addClass('hidden');
    }

    let bookmarks = [...store.bookmarks]; 

    const html = generateBookmarkElementsString(bookmarks);

    $('#js-bookmark-list').html(html);


  }

  function bindEventListeners() {
    handleOpenAddForm();
    handleAddBookmarkSubmit();
    handleAddBookmarkCancel();
  }

  return{
    bindEventListeners,
    render,
  };

})();