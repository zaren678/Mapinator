var shell = require('shelljs');
var fs = require('fs');
var path = require('path');


var XPLANET_DEBUG=true;

//This should return a url to an xplanet image
function generateXplanetImage( timeout, callback ){

  var theXplanetFolder = '../../xplanet/'
  var theXplanetExec = theXplanetFolder + '/build/bin/xplanet';
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
  theCloudCmd = theXplanetFolder + 'xplanet_cloud.sh'
  console.log( "Cloud cmd: " + theCloudCmd )

  //The Shell cmd to generate xplanet
  var theXplanetFunc = function(){
    shell.exec( theCmd, function( code, output ) {
      if( code == 0 ){
        callback( true, theReturnPath );
      } else {
        callback( false );
      }
    });
  }

  var theCloudAndXplanetFunc = function(){
    shell.exec( theXplanetFolder + 'xplanet_cloud.sh', function( code, output ){
      theXplanetFunc();
    } );
  }

  //make sure settings dir exists
  var theSettingsFolder = './.settings'
  var theClouldSettingsFile = theSettingsFolder + '/clouds.jsn'
  var shouldGetClouds = true
  fs.stat( theSettingsFolder, function( err, stat ) {
      if( err != null && err.code == 'ENOENT' ) {
          console.log( 'Creating settings dir' )
          fs.mkdirSync( theSettingsFolder )
      }

      fs.stat( theClouldSettingsFile, function( err, stat ) {
          if( err == null ) {
            //read the file... set should get clouds to true if greater than 4 hours since last clouds
          }

          if( shouldGetClouds ){
            theCloudAndXplanetFunc();
          } else {
            theXplanetFunc();
          }
      });
  });
}

module.exports = generateXplanetImage;
