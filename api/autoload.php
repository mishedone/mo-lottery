<?php

// utilities
require_once 'src/Tool/Clean.php';
require_once 'src/Tool/Curl.php';
require_once 'src/Tool/GameHash.php';
require_once 'src/Exception/NotFoundException.php';
require_once 'src/Exception/ParseException.php';
require_once 'src/Http/Response.php';

// managers
require_once 'src/Manager/AbstractManager.php';
require_once 'src/Manager/LastParseManager.php';
require_once 'src/Manager/DrawManager.php';
require_once 'src/Manager/ManagerRepository.php';

// providers
require_once 'src/Provider/AbstractGame.php';
require_once 'src/Provider/AbstractProvider.php';
require_once 'src/Provider/BST/Parser/ArchiveYearParser.php';
require_once 'src/Provider/BST/Parser/CurrentYearParser.php';
require_once 'src/Provider/BST/Game535.php';
require_once 'src/Provider/BST/Game642.php';
require_once 'src/Provider/BST/Game649.php';
require_once 'src/Provider/BST/BSTProvider.php';
require_once 'src/Provider/ProviderRepository.php';

// controllers
require_once 'src/Controller/Controller.php';