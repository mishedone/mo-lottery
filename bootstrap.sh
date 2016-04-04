#!/usr/bin/env bash

# add repositories
add-apt-repository ppa:ondrej/php
apt-get update

# setup apache
apt-get install -y apache2
if ! [ -L /var/www/html ]; then
    rm -rf /var/www/html
    ln -fs /vagrant /var/www/html
fi

# setup php
apt-get install -y python-software-properties
apt-get install -y php7.0 php7.0-fpm
apt-get install -y libapache2-mod-php7.0

# clean up
apt-get --purge -y autoremove