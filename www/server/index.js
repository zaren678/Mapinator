var Hapi = require('hapi');
var scanWifiNetworks = require('./lib/wifiScan');

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
        reply();
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
