#!/bin/bash

platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
   platform='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
   platform='mac'
fi

path=./sourceData/images/ # destination de destination of the downloaded image
tmp=$path"tmp_clouds_800.jpg" # temporary file name
downsize=$path"temp.jpg"
img=$path"clouds_800.jpg"     # name of the final file

rm $tmp # delete the old temporary file

wget -O $tmp https://raw.githubusercontent.com/apollo-ng/cloudmap/master/global.jpg # t�download the picture

if [ -f $tmp ] ; then # if the file has been downloaded ...
 # sudo mogrify -resize 800x508 $tmp # redimenssionne limage téléchar
   if [[ platform == 'linux' ]]; then
     epeg -w 800 -h 508 -q 100 $tmp $downsize
     sudo mv $downsize $img # remplace l'ancienne image par la nouvelle
     chown -R pi:www-data $path && chmod -R 775 $path # change les droits sur le fichier
   else
     epeg -w 800 -h 508 $tmp $downsize
     mv $downsize $img
   fi

fi
