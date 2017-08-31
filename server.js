var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
	
	if( request.method == "GET" && url.parse(request.url).pathname == '/listings' ){
		response.statusCode = 200;
		response.write(listingData);
	}
	//is the URL properly requested? AYYYYYY
	else{
		response.statusCode = 404;
		response.write("Bad gateway error");
	}
	//if the URL doesn't exist, throw a 404 
	response.end();

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path (check). Otherwise, it should send a 404 error (check). 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  listingData = data;
  serverOnline();
  //copy the data, go to the server boot up
  /*
    This callback function should save the data in the listingData variable (check), 
    then start the server (check). 
   */
});

function serverOnline(){
	server = http.createServer(requestHandler);
	server.listen(port, function() {
        console.log("Server listening on: http://127.0.0.1:" + port);
	});
	//similar to example given 
}