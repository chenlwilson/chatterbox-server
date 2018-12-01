var Rooms = {

    add: function(roomname) {
      //add a new room option to the select dropdown
      var template = _.template(`
        <option value ='<%= roomname %>'><%= roomname %></option>
      `);
      RoomsView.$select.append(template({roomname: roomname}));
    },

    submitNewRoom: function(roomname) {
      //when a new room is created
      //send the new room name to the server
      //send the first message created in this room
      //render messages in this room
      Parse.create({
        username: App.username,
        text: 'This is a brand new room!',
        roomname: roomname
      });
      RoomsView.selectRoom(roomname);
    },

    uniqRooms: function(data) {
      //create a list of unique rooms for rendering in the select dropdown
      return _.uniq(_.map(data, function(message) {
        return message.roomname;
      }));
    }

};
