<?php

// utilities
require_once 'src/Tool/Clean.php';
require_once 'src/Tool/Curl.php';
require_once 'src/Exception/NotFoundException.php';
require_once 'src/Exception/ParseException.php';
require_once 'src/Http/Response.php';

// managers
require_once 'src/Manager/AbstractManager.php';
require_once 'src/Manager/LastParseManager.php';
require_once 'src/Manager/DrawManager.php';
require_once 'src/Manager/ManagerRepository.php';

// old providers - keep them until new provider schema starts working
require_once 'src/Provider/parser/BSTArchiveYearParser.php';
require_once 'src/Provider/parser/BSTCurrentYearParser.php';
require_once 'src/Provider/BSTProvider.php';

// new provider structure
require_once 'src/Provider/AbstractGame.php';
require_once 'src/Provider/AbstractProvider.php';
require_once 'src/Provider/BST/Game649/Game649.php';
require_once 'src/Provider/BST/BSTProvider.php';
require_once 'src/Provider/ProviderRepository.php';