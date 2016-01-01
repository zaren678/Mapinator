#!/bin/bash
wget https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz

sudo mv node-v4.2.4-linux-armv6l.tar.gz /opt

cd /opt

sudo tar -xzf node-v4.2.4-linux-armv6l.tar.gz

sudo mv node-v4.2.4-linux-armv6l nodejs

sudo rm node-v4.2.4-linux-armv6l.tar.gz

sudo ln -s /opt/nodejs/bin/node /usr/bin/node

sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
