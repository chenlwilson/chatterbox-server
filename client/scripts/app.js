var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',
  rooms: {},
  room: '',

  update: function() {
    $.get(Parse.server, function(data) {
      App.startSpinner();
      //$("#chats").html(data);
      App.fetch(App.stopSpinner);
      //window.setTimeout(update, 10000);
    });
  },

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    App.room = RoomsView.$select.val();
    
    App.update();
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      $('#chats').empty();
      
      for (var i = 0; i < data.results.length; i++) {
        var roomName = _.escape(data.results[i].roomname);
        // place each item into Room
        if (roomName) {
          if (!this.rooms[roomName]) {
            RoomsView.renderRoom(roomName);
            this.rooms[roomName] = roomName;
          }
        }
          
        if (this.room === roomName) {
          var text = {};
          text.username = _.escape(data.results[i].username);
          text.text = _.escape(data.results[i].text);
          MessagesView.renderMessage(text);
        }
      }
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

};
