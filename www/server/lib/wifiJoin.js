var os = require('os');
var shell = require('shelljs');

function joinWifiNetwork( ssid, password, callback ){
  if( os.platform().toLowerCase() == 'darwin' ){
    return joinWifiNetworkMac( ssid, password, callback );
  } else {
    return false;
  }
}

function joinWifiNetworkMac( ssid, password, callback ){
  //This requires sudo or a password prompt will show up
  var theCmd = 'networksetup'
    + ' -setairportnetwork'
    + ' en0 ' + ssid + ' ' + password;

    shell.exec( theCmd , function( code, output ) {
      if( code == 0 ){
        callback( true );
      } else {
        callback( false );
      }
    });
}

module.exports = joinWifiNetwork;
