<?php

require_once 'autoload.php';

use MoLottery\Exception\Exception;
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
        try {
            $yearEditions = $provider->getYearEditions($year);
            $response->renderJson($yearEditions);
        } catch (Exception $error) {
            $response->renderJsonServerError($error->getMessage());
        }

        break;
    default:
        $response->render404();
}
