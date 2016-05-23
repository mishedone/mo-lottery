<?php

require_once 'autoload.php';

use MoLottery\Exception\Exception;
use MoLottery\Http\Response;
use MoLottery\Manager\EditionManager;
use MoLottery\Manager\LastParseManager;
use MoLottery\Provider\BSTProvider;

$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data';

// build services
$response = new Response();
$editionManager = new EditionManager($dataPath);
$lastParseManager = new LastParseManager($dataPath);
$provider = new BSTProvider($editionManager, $lastParseManager);

// routing
switch ($_GET['action']) {
    case 'years':
        $years = $provider->getYears();
        $response->renderJson($years);

        break;
    case 'year':
        $year = $_GET['year'];
        if (!$provider->hasYear($year)) {
            $response->render404();
        }

        // ok - we have data for the requested year - return it
        try {
            $editions = $provider->getYearEditions($year);
            $response->renderJson($editions);
        } catch (Exception $error) {
            $response->renderJsonServerError($error->getMessage());
        }

        break;
    default:
        $response->render404();
}
