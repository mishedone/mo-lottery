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
sed -i "s|DocumentRoot /var/www/html|DocumentRoot /var/www/html\\
\\
        <Directory /var/www/html>\\
                Options -Indexes +FollowSymLinks\\
                AllowOverride All\\
        </Directory>|" /etc/apache2/sites-available/000-default.conf
a2enmod rewrite

# setup php
apt-get install -y python-software-properties
apt-get install -y php7.0 php7.0-fpm php7.0-curl
apt-get install -y libapache2-mod-php7.0
sed -i "s|display_errors = Off|display_errors = On|" /etc/php/7.0/apache2/php.ini
sed -i "s|APACHE_RUN_USER=www-data|APACHE_RUN_USER=vagrant|" /etc/apache2/envvars
sed -i "s|APACHE_RUN_GROUP=www-data|APACHE_RUN_GROUP=vagrant|" /etc/apache2/envvars
service apache2 restart

# clean up
apt-get --purge -y autoremove