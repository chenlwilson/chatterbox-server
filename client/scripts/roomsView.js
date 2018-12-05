var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),


  initialize: function() {
    RoomsView.$select.on('change', RoomsView.render);
    RoomsView.$button.on('click', Rooms.add);
  },

  render: function() {
    App.room = RoomsView.$select.val();
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  renderRoom: function(room) {
    
    $( this.$select ).append(`<option value="${room}">${room}</option>`);
  },

  // do we need to have a object that is a function
  // checks for a room
  // returns true false
  
};
