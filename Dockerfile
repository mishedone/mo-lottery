FROM php:8-apache-bullseye
COPY . /var/www/html
WORKDIR /var/www/html

# Enable apache2 mod rewrite so .htaccess can work.
RUN a2enmod rewrite
