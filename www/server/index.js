var Hapi = require('hapi');
var Path = require('path');
var scanWifiNetworks = require('./lib/wifiScan');
var generateXplanetImage = require('./lib/xplanet');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/access-points',
    handler: function (request, reply) {
      scanWifiNetworks()
        .then(reply)
        .fail( console.error )
        .done();
    }
});

server.route({
    method: 'POST',
    path: '/access-point',
    handler: function (request, reply) {
        console.log('You requested:', request.payload);
        //TODO add wifi network to conf file
        reply();
    }
});

server.route({
    method: 'GET',
    path: '/planetImage',
    handler: function (request, reply) {
        console.log('You requested:', request.payload);

        generateXplanetImage( function( success, filePath ) {
          if( success ){
            reply( filePath );
          } else {
            reply( "Failed to Generate image" ).code( 500 );
          }
        });
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '../client/public'
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
