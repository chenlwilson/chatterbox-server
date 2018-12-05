var Rooms = {
  add: function() {
    var promptDisplay = prompt('What room?');
    RoomsView.renderRoom(promptDisplay);
  }
};