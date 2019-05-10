/*global $, store, api*/
'use strict';

//this file is for all my event listeners as well as my render function

//AND INTEGRATE THE API CALLS INTO MY (POST) ADD ITEM AND (GET) RENDER.
//ALSO NEED TO WORK ON GETTING THE ID FROM EACH ELEMENT ON A DELETE CLICK AND ADDING A DELETE BUTTON


const bookmark = (function() {

  function generateBookmarkElement(newBookmark){

    let expandedInfo= '';
    let visitSite = '';

    if(newBookmark.fullView){
      expandedInfo = `<div class = 'bookmark-desc'><span>Description: ${newBookmark.desc}</span></div>`
                      
      visitSite = `<div class ='bookmark-url'><form action= ${newBookmark.url}>
                      <input type="submit" value="Visit Site"/>
                      </form></div>`;
    }

    return `<li class ='bookmark-display'>
      <div class = 'js-bookmark' data-book-id = ${newBookmark.id}>
        <div class = 'bookmark-title'><span>Title: ${newBookmark.title}</span></div>
        <div class = 'bookmark-rating'><span>Rating: ${newBookmark.rating}</span></div>
        ${expandedInfo}
      </div>
      <div class = 'bookmark-buttons'>
      ${visitSite}
      <button class='js-delete-button'>Delete</button>
      </div>
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

  function handleDeleteBookmark() {
    $('#js-bookmark-list').on('click', '.js-delete-button',e =>{
      const id = $(e.currentTarget).closest('.bookmark-display').find('.js-bookmark').attr('data-book-id');
      console.log(id);
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        });
    });
  }

  //This is adding to the api and the store now
  function handleAddBookmarkSubmit() {
    $('#js-add-new-bookmark').submit(e => {
      e.preventDefault();

      const title = $('#js-title-input').val();
      $('#js-title-input').val('');
      const url = $('#js-url-input').val();
      $('#js-url-input').val('');
      const desc = $('#js-description-input').val();
      $('#js-description-input').val('');
      const rating = $('#js-rating-input').val();
      $('#js-rating-input').val('');

      const bookmark = {
        title,
        desc,
        url,
        rating,
      };

      api.createBookmark(bookmark)
        //.then(res => res.json())
        .then(res => {
          store.addBookmark(res);
          render();
        });

      store.toggleAddNew();
    });
  }

  function handleExpandBookmark() {
    $('#js-bookmark-list').on('click', '.js-bookmark', e => {
      const id = $(e.currentTarget).attr('data-book-id');
      store.toggleBookmarkFullView(id);
      render();
    });
  }
  

  function handleFiltering() {
    $('#js-rating-filter').change(e => {
      const rating = $(e.currentTarget).val();
      store.changeRatingFilter(rating);
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

    const filteredList = bookmarks.filter(book => book.rating >= store.ratingFilter);

    const html = generateBookmarkElementsString(filteredList);

    $('#js-bookmark-list').html(html);
  }

  

  function bindEventListeners() {
    handleOpenAddForm();
    handleAddBookmarkSubmit();
    handleAddBookmarkCancel();
    handleExpandBookmark();
    handleFiltering();
    handleDeleteBookmark();
  }


  return{
    bindEventListeners,
    render,
  };

})();