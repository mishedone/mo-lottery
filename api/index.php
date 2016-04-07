<?php

require_once 'src/manager/EditionManager.php';
require_once 'src/provider/BSTProvider.php';

use MoLottery\Manager\EditionManager;
use MoLottery\Provider\BSTProvider;

// build services
$editionManager = new EditionManager(__DIR__ . DIRECTORY_SEPARATOR . 'data');
$provider = new BSTProvider($editionManager);

// process data
$provider->sync();

header('Content-Type: application/json');
echo json_encode($editionManager->getEditions());
