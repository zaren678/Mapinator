#!/bin/bash

function build_one
{
echo "Building xPlanet into folder $PREFIX"
cd ./xplanet-1.3.0/
./configure \
    --prefix=$PREFIX \
    --with-gif\
    --with-jpeg\
    --with-png\
    --with-freetype\
    $ADDITIONAL_CONFIGURE_FLAG
make distclean
make clean
#make -j3
#make install
cd ..
}

PREFIX=$(pwd)
build_one
