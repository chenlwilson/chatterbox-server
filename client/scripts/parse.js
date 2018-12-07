var Parse = {
  //server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
  server: 'http://127.0.0.1:3000/classes/messages',
  create: function(message, successCB, errorCB = null) {
    // save a message to the server
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      // crossDomain: true,
      // headers: { 'Accept': 'application/json'},
      success: successCB,
      // error: errorCB || function(error) {
      //   console.error('chatterbox: Failed to send message', error);
      // }
    });
  },
  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }
};