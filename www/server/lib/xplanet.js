var shell = require('shelljs');

//This should return a url to an xplanet image
function generateXplanetImage( callback ){

  var theXplanetExec = '../../xplanet/build/bin/xplanet';
  var theSourceDataPath = '../../xplanet/sourceData';
  var theConfFile = '../../xplanet/xplanet.conf';
  var theOutputFilePath = '../client/public/img/';
  var theOutputFileName = 'earth.png'
  var theOutputFile = theOutputFilePath + theOutputFileName;

  var theReturnPath = 'img/' + theOutputFileName;

  console.log( "Current Pwd is: " + shell.pwd() );

  shell.mkdir( '-p', theOutputFilePath );

  var theCmd = theXplanetExec
    + ' -searchdir=' + theSourceDataPath
    + ' -config=' + theConfFile
    + ' -output=' + theOutputFile
    + ' -num_times=1';

  shell.exec( theCmd , function( code, output ) {
    if( code == 0 ){
      callback( true, theReturnPath );
    } else {
      callback( false );
    }
  });
}

module.exports = generateXplanetImage;
