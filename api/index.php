<?php

require_once 'autoload.php';

use MoLottery\Exception\Exception;
use MoLottery\Http\Response;
use MoLottery\Manager\DrawManager;
use MoLottery\Manager\LastParseManager;
use MoLottery\Provider\BSTProvider;

$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data';

// build services
$response = new Response();
$drawManager = new DrawManager($dataPath);
$lastParseManager = new LastParseManager($dataPath);
$provider = new BSTProvider($drawManager, $lastParseManager);

// routing
switch ($_GET['action']) {
    case 'years':
        $years = $provider->getYears();
        $response->renderJson(['years' => $years]);

        break;
    case 'draws':
        $year = $_GET['year'];
        if (!$provider->hasYear($year)) {
            $response->render404();
        }

        // ok - we have data for the requested year - return it
        try {
            $draws = $provider->getDraws($year);
            $response->renderJson(['draws' => $draws]);
        } catch (Exception $error) {
            $response->renderJsonServerError($error->getMessage());
        }

        break;
    default:
        $response->render404();
}
