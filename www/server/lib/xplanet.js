var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var moment = require('moment')


var XPLANET_DEBUG=true;
var lastCloudDownloadTime;
var CLOUD_UPDATE_INTERVAL_HOURS = 4;

//This should return a url to an xplanet image
function generateXplanetImage( timeout, callback ){

  var theXplanetFolder = '../xplanet/'
  var theXplanetExec = theXplanetFolder + 'build/bin/xplanet';
  var theSourceDataPath = theXplanetFolder + 'sourceData';
  var theConfFile = theXplanetFolder + 'xplanet.conf';
  var theServerPath = 'img/'
  var theOutputFilePath = '../client/public/' + theServerPath;
  var theOutputFileName = 'earth.png'
  var theOutputFile = theOutputFilePath + theOutputFileName;

  var theReturnPath = theServerPath + theOutputFileName;

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

  theCloudCmd = theXplanetFolder + 'xplanet_cloud.sh';

  //The Shell cmd to generate xplanet
  var theXplanetFunc = function(){
    console.log( "Running xplanet in working dir: " + shell.pwd() );
    console.log( "Xplanet cmd is: " + theCmd );
    shell.exec( theCmd, function( code, output ) {
      if( code == 0 ){
        console.log( "Xplanet successful" );
        callback( true, theReturnPath );
      } else {
        console.log( "Xplanet failed" );
        callback( false );
      }
    });
  }

  var theCloudAndXplanetFunc = function(){
    shell.pushd( theXplanetFolder );
    console.log( "Running cloud cmd in working dir: " + shell.pwd() );
    console.log( "Cloud cmd is: " + theCloudCmd );
    shell.exec( theCloudCmd, function( code, output ){
      console.log( "Cloud command complete" );
      shell.popd();
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
      console.log( "Getting clouds because it has been " + CLOUD_UPDATE_INTERVAL_HOURS + " hours since last update" )
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
