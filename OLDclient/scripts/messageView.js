var MessageView = {
//template function that renders message to html
// ex) $( ".inner" ).append( "<p>Test</p>" );

//underscore _.template syntax:
//var compiled = _.template("hello: <%= name %>");
// compiled({name: 'moe'});
// => "hello: moe"

//input is an object
//key is the variable name, value is the arg passed
//e.g: _.template({username: 'anonymous'})

  render: _.template(`
      <div class="chat">
        <div class="username <%= username %>"><%= username %></div>
        <div class="text"><%= text %></div>
        <div></div>
      </div>
    `)
};
