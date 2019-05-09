/*global $, store*/
'use strict';

//this file is for all my event listeners as well as my render function

const bookmark = (function() {

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
      console.log(title);
      const url = $('#js-url-input').val();
      const description = $('#js-description-input').val();
      const rating = $('#js-rating-input').val();

      const bookmark = {
        title,
        description,
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
    if(!store.addingNew){
      $('#js-add-new-bookmark').addClass('hidden');
    }


  }

  function bindEventListeners() {
    handleOpenAddForm();
    handleAddBookmarkSubmit();
    handleAddBookmarkCancel();
  }








  return{
    bindEventListeners,
    render,
  }

})();