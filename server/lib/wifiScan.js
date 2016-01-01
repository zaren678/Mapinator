var wifiscanner = require('node-wifiscanner');
var q = require('q');

function scanWifiNetworks(){
  var def = q.defer();
  wifiscanner.scan(function(err, data){
    if (err) {
        console.log("Error : " + err);
        def.reject();
        return;
    }

    console.log(data);

    var result = [];
    data.forEach(function(ap) {
        result.push( ap );
    });

    def.resolve( result );
  } );

  return def.promise;
}

module.exports = scanWifiNetworks;
