var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();
    Friends.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    //auto refresh every 60 sec
    setInterval(function() {
      location.reload();
    }, 60000);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log(data);
      // examine the response from the server request:
      //use for loop to parse message

      //Call Rooms.uniqRooms to created
      //an array of unique roomnames based on the fetched data
      //Add Lobby as index[0]
      var uniqRooms = Rooms.uniqRooms(data.results);
      uniqRooms.unshift('Lobby');

      //Call Rooms.add to add all unique roomnames into select dropdown
      //Lobby is always the first option (for display all messages)
      uniqRooms.forEach(function(room) {
        Rooms.add(room);
      });

      for(var i=0; i<data.results.length; i++){
        //Call renderMessage to display all messages from the fetched data
        //the initial state is showing Lobby and displaying all messages
        MessagesView.renderMessage(data.results[i]);
      };

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

  //escaping solution
  escape: function(string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

};
