#!/bin/bash

#exit if any command fails
set -e
set -o pipefail

function build_zlib
{
echo ""
echo "************************************************"
echo "Building zlib into folder $PREFIX"
cd ./src/zlib-1.2.8/
./configure \
    --prefix=$PREFIX
make clean
make -j3
make install
cd ../..
}

function build_libpng
{
echo ""
echo "************************************************"
echo "Building libppng into folder $PREFIX"
cd ./src/libpng-1.6.18/
./configure \
    --prefix=$PREFIX \
    --with-zlib-prefix=$PREFIX
make clean
make -j3
make install
cd ../..
}

function build_libjpeg
{
echo ""
echo "************************************************"
echo "Building libjpeg into folder $PREFIX"
cd ./src/jpeg-9a/
./configure \
    --prefix=$PREFIX
make clean
make -j3
make install
cd ../..
}

function build_libfreetype
{
echo ""
echo "************************************************"
echo "Building libfreetype into folder $PREFIX"
cd ./src/freetype-2.6/
./configure \
    --prefix=$PREFIX
make clean
make -j3
make install
cd ../..
}

function build_xplanet
{
echo ""
echo "************************************************"
echo "Building xPlanet into folder $PREFIX"

export FREETYPE_CONFIG=$PREFIX/bin/freetype-config

cd ./src/xplanet-1.3.0/
./configure \
    --prefix=$PREFIX \
    --with-png\
    --with-jpeg\
    --with-freetype\
    $ADDITIONAL_CONFIGURE_FLAG
make clean
make -j3
make install
cd ../..
}

set OLD_CFLAGS = $CFLAGS
export CFLAGS=-I$PREFIX/include

set OLD_CPPFLAGS = $CPPFLAGS
export CPPFLAGS=-I$PREFIX/include

set OLD_LDFLAGS = $LDFLAGS
export LDFLAGS=-L$PREFIX/lib

PREFIX=$(pwd)/build
#build_zlib
#build_libpng
build_libjpeg
#build_libfreetype
#build_xplanet

export CFLAGS $OLD_CFLAGS
export CPPFLAGS $OLD_CPPFLAGS
export LDFLAGS $OLD_LDFLAGS
