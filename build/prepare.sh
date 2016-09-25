#!/usr/bin/env bash

year=`date +%Y`

curl -s "http://127.0.0.1/api/draws/bst-535/$year" > /dev/null
curl -s "http://127.0.0.1/api/draws/bst-642/$year" > /dev/null
curl -s "http://127.0.0.1/api/draws/bst-649/$year" > /dev/null