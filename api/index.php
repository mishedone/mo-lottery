<?php

require_once 'src/tool/Clean.php';
require_once 'src/tool/Curl.php';
require_once 'src/http/Response.php';
require_once 'src/manager/EditionManager.php';
require_once 'src/provider/BSTProvider.php';

use MoLottery\Http\Response;
use MoLottery\Manager\EditionManager;
use MoLottery\Provider\BSTProvider;

// build services
$response = new Response();
$editionManager = new EditionManager(__DIR__ . DIRECTORY_SEPARATOR . 'data');
$provider = new BSTProvider($editionManager);

// routing
switch ($_GET['action']) {
    case 'available-years':
        $availableYears = $provider->getYears();
        $response->renderJson($availableYears);

        break;
    case 'year':
        $year = $_GET['year'];
        if (!$provider->hasYear($year)) {
            $response->render404();
        }

        // ok - we have data for the requested year - return it
        $yearEditions = $provider->getYearEditions($year);
        $response->renderJson($yearEditions);

        break;
    default:
        $response->render404();
}
