#!/bin/bash

# What does this need to do?
# 1. delete www folder on server if it exists (/var/www)
# 2. git clone server
# 3. install nodejs
# 4. build xplanet
# 5. install server startup in init.d
# 6. start server (nodemon or node optionally)

# future enhancements
# 7. build the wifi ap stuff
# 8. install startup stuff for wifi ap
# 9. start the wifi ap stuff

#Get the path to this script, this will follow symlinks
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

#########################
# The command line help #
#########################
display_help() {
    echo "Usage: $0 [option...] {url}" >&2
    echo "The url must be of the form user@url, it will be passed to the ssh command"
    echo
    echo "   -p password to login to server, required"
    echo
    # echo some stuff here for the -a or --add-options
    exit 1
}

cd $DIR
echo `pwd`

# Do work here
#Get options
getopt --test > /dev/null
echo $?
if [[ $? != 0 ]]; then
    echo "I’m sorry, `getopt --test` failed in this environment."
    exit 1
fi

SHORT=:p:

while getopts $SHORT opt; do
  case $opt in
    p)
      password=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      display_help
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      display_help
      exit 1
      ;;
  esac
done
shift "$((OPTIND-1))" # Shift off the options and optional --.

if [ $# != 1 ]; then
  echo "$0: A url is required."
  exit 4
fi

url=${@:0}

echo "url: $url"

theServerDirName="Mapinator"
theServerDir="/var/www/${theServerDirName}"
theBranch="node_server"

#Now that we've collected the args, do the work
# 1. delete the www folder if it exists
theCmd="rm -rv ${theServerDir};"

# 2. git clone server
theCmd="${theCmd}cd /var/www;git clone -b ${theBranch} https://github.com/zaren678/Mapinator.git ${theServerDirName};"
# 3. make sure node is installed
theCmd="${theCmd}curl -sLS https://apt.adafruit.com/add | sudo bash;"
theCmd="${theCmd}sudo apt-get -y install node;"

# 4. build xplanet
#make sure we automake tools
theCmd="${theCmd}sudo apt-get -y install automake autoconf libtools cmake;"
theCmd="${theCmd}cd ${theServerDir}/www/xplanet;./build_xplanet.sh;"

# 5. install server startup in init.d TODO
# 6. start server (nodemon or node optionally)
theCmd="${theCmd}cd ${theServerDir}/www/server;node index.js;"


echo "ssh ${url} ${theCmd}"
ssh $url $theCmd

exit 0
