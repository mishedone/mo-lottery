<?php

$url = 'http://www.toto.bg/files/tiraji/649_58.txt';
file_put_contents('data/649-1958.txt', file_get_contents($url));