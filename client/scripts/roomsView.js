var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    //event handler that add a new room when clicked
    RoomsView.$button.on('click', RoomsView.handleAddButton);
    //event handler that changes message display based on the room selected
    RoomsView.$select.on('change', RoomsView.selectRoom);
  },

  handleAddButton: function() {
    //the new roomname is the input of the prompt
    var roomname = prompt('Enter a new room')
    Rooms.add(roomname);
    Rooms.submitNewRoom(roomname);
    //change select value to the new room
    //render messages in this new room
    RoomsView.$select.val(roomname);
    RoomsView.selectRoom();
  },

  selectRoom: function() {
    //when a room is selected
    //fetch data from server
    //render only messages with the selected roomname
    Parse.readAll((data) => {
      RoomsView.renderRoom(RoomsView.$select.val(), data)
    });
  },

  renderRoom: function(roomname, data) {
    //first clear all children div in #chats
    //if Lobby is selected, display all messages
    //if a roomname is selected, display messages with the selected roomname
    $('#chats').empty();
    if(roomname === 'Lobby') {
      for(var i=0; i<data.results.length; i++) {
        MessagesView.renderMessage(data.results[i]);
      }
    } else {
      for(var i=0; i<data.results.length; i++){
        if(data.results[i].roomname === roomname) {
          MessagesView.renderMessage(data.results[i]);
        }
      }
    }
  }

};
