var shell = require('shelljs');

var XPLANET_DEBUG=true;

//This should return a url to an xplanet image
function generateXplanetImage( callback ){

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
    + ' -num_times=1';

  if( XPLANET_DEBUG ){
    theCmd += ' -label';
  }

  shell.exec( theCmd , function( code, output ) {
    if( code == 0 ){
      callback( true, theReturnPath );
    } else {
      callback( false );
    }
  });
}

module.exports = generateXplanetImage;
