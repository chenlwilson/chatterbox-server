var FormView = {

  $form: $('form'),
  //get form element

  initialize: function() {
    //event handler for form submit
    FormView.$form.on('submit', this.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from auto submitting the form
    event.preventDefault();
    var message = {
      //compose message format for form submit
      username: App.username,
      text: $( 'input[type=text]').val(),
      roomname: $('select').val()
    };


    //send message to server
    //upon submit, re-render messages in the room of form submit event
    //clear form
    Parse.create(message);
    RoomsView.selectRoom();
    FormView.$form.trigger('reset');

    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    //attr can be toggled? from active to not active?
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
