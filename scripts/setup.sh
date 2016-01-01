#!/bin/bash

#Get the path to this script, this will follow symlinks
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd $DIR
echo `pwd`

# 3. make sure node is installed
cd $DIR/../scripts
./install_node.sh

sudo npm install forever -g

# 4. build xplanet
#make sure we automake tools
sudo apt-get -y install automake autoconf libtools cmake
cd $DIR/../xplanet
./build_xplanet.sh

# 5. install server startup in init.d TODO
# 6. start server (nodemon or node optionally)
cd $DIR/../server
node index.js
