var shell = require('shelljs');

var XPLANET_DEBUG=true;

//This should return a url to an xplanet image
function generateXplanetImage( timeout, callback ){

  var theXplanetExec = '../../xplanet/build/bin/xplanet';
  var theSourceDataPath = '../../xplanet/sourceData';
  var theConfFile = '../../xplanet/xplanet.conf';
  var theServerPath = '/img/'
  var theOutputFilePath = '../client/public/' + theServerPath;
  var theOutputFileName = 'earth.png'
  var theOutputFile = theOutputFilePath + theOutputFileName;

  var theReturnPath = theServerPath + theOutputFileName;

  console.log( "Current Pwd is: " + shell.pwd() );

  shell.mkdir( '-p', theOutputFilePath );

  var theCmd = theXplanetExec
    + ' -searchdir=' + theSourceDataPath
    + ' -config=' + theConfFile
    + ' -output=' + theOutputFile
    + ' -body earth'
    + ' -latitude 0'
    + ' -longitude -112'
    + ' -geometry 800x508'
    + ' -projection rectangular'
    + ' -num_times=1';

  if( XPLANET_DEBUG ){
    theCmd += ' -label';
  }

  //TODO get cloud map every 4 hours
  //timeout isn't a feature on shelljs right now... hopefully soon
  shell.exec( theCmd, function( code, output ) {
    if( code == 0 ){
      callback( true, theReturnPath );
    } else {
      callback( false );
    }
  });
}

module.exports = generateXplanetImage;
