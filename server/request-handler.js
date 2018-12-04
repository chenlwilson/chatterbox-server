/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var messages = [];

var requestHandler = function (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end(JSON.stringify('Hello, World!'));


  var getIndexBelowMaxForKey = function (str, max) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    return hash % max;
  };

  //if request.method is GET
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify({ results: messages }));
      //{results: []}
      //{objectId: "39yFDtvEGC", username: "-", roomname: "lobby", text: "-", createdAt: "2018-12-03T00:24:07.325Z"}
    } else if (request.method === 'POST') {
      //if request.method is POST
      // receive data
      // create hash of data for objectid where data = {username: "-", roomname: "lobby", text: "-"}
      // get current date/time to seconds in format 2018-12-03T00:24:07.325Z
      // take above three and combine into a single object, perhaps using Object.assign(destObj, obj1, obj2, objn)
      // push this into the messages array
      var data = '';
      request.on('data', function (chunk) {
        data += chunk;
      });
      request.on('end', function () {
        console.log("DATA IS: " + data);
        var parsedData = JSON.parse(data);
        var textStr = parsedData.text;
        var newMessage = Object.assign(JSON.parse(data), { objectId: getIndexBelowMaxForKey(textStr, 10) }, { createdAt: Date() });
        messages.push(newMessage);
        // somehow we need to write messages to the following directory
        // /classes/messages.txt
        //console.log("MESSAGES []: ", messages)
        // if (data.length > 1e7) {
        //   response.writeHead(413, headers);
        //   response.end();
        // }
      });
      response.writeHead(201, headers);
      response.end();
    }
  } else {
    response.writeHead(404,headers);
    response.end();
  }

  //if request.method is OPTIONS
  //if request.method is anything else, respond with 405



};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;