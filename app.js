var express = require('express');
var sockjs  = require('sockjs');
var http = require('http');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

console.log('environment: ' + app.get('env'));

if ('production' == app.get('env')) {
  app.use(express.static(__dirname + '/dist'));
} else if ('development' == app.get('env')) {
  app.use(express.static(__dirname + '/app'));
  app.use(express.errorHandler());
}

var clients = {};
var clientCount = 0;

var gaugeValue = 40;

function broadcast() {
  gaugeValue += Math.random() * 10 - 5;
  gaugeValue = gaugeValue < 0 ? 0 : gaugeValue > 100 ? 100 : gaugeValue;

  for (var key in clients) {
    if(clients.hasOwnProperty(key)) {
      clients[key].write(JSON.stringify({ value: Math.floor(gaugeValue) }));
    }
  }
}

function startBroadcast () {
  setInterval(broadcast, 1000);
}

var sockjsServer = sockjs.createServer();

sockjsServer.on('connection', function(conn) {
  clientCount++;
  if (clientCount === 1) {
    startBroadcast();
  }

  clients[conn.id] = conn;

  conn.on('close', function() {
    clientCount--;
    delete clients[conn.id];
  });
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

sockjsServer.installHandlers(server, { prefix: '/sockjs' });