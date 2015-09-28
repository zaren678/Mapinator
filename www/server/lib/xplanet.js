var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var moment = require('moment')


var XPLANET_DEBUG=true;
var lastCloudDownloadTime;
var CLOUD_UPDATE_INTERVAL_HOURS = 4;

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
      lastCloudDownloadTime = moment();
      theXplanetFunc();
    } );
  }

  var shouldGetClouds = false
  if( lastCloudDownloadTime == null ){
    console.log( "Getting clouds for the first time" )
    shouldGetClouds = true
  } else {
    var theDiff = moment().subtract( lastCloudDownloadTime ).minutes()
    if( theDiff >= ( CLOUD_UPDATE_INTERVAL_HOURS * 60 ) ){
      console.log( "Getting clouds because it has been 4 hours since last update" )
      shouldGetClouds = true
    } else {
      console.log( "Not getting clouds because it has only been " + theDiff + " minutes since last update" )
    }
  }

  if( shouldGetClouds ){
    theCloudAndXplanetFunc();
  } else {
    theXplanetFunc();
  }
}

module.exports = generateXplanetImage;
