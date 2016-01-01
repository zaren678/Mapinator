var Hapi = require('hapi');
var Path = require('path');
var scanWifiNetworks = require('./lib/wifiScan');
var generateXplanetImage = require('./lib/xplanet');
var wifiJoin = require('./lib/wifiJoin')

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
    path: '/join-access-point',
    handler: function (request, reply) {
        console.log('You requested:', request.payload);
        theApObject = JSON.parse( request.payload );
        wifiJoin( theApObject.ssid, theApObject.password, function( success ){
          if( success ){
            reply();
          } else {
            reply( "Failed to join network" ).code( 500 );
          }
        });
    }
});

server.route({
    method: 'GET',
    path: '/planetImage',
    handler: function (request, reply) {
        generateXplanetImage( 100, function( success, filePath ) {
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
    path: '/img/earth.png',
    handler: function ( request, reply ) {
        reply.file( '../client/public/img/earth.png' ).header('Cache-control', 'no-store, no-cache, must-revalidate');
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
