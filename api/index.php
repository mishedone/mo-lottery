<?php

require_once 'autoload.php';

use MoLottery\Controller\Controller;
use MoLottery\Exception\NotFoundException;
use MoLottery\Exception\ParseException;
use MoLottery\Http\Response;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\ProviderRepository;

$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data';

// build services
$response = new Response();
$managerRepository = new ManagerRepository($dataPath);
$providerRepository = new ProviderRepository($managerRepository);
$controller = new Controller($providerRepository);

// routing / controller
try {
    switch ($_GET['action']) {
        case 'games':
            $response->renderJson($controller->getGames());
    
            break;
        case 'years':
            $response->renderJson($controller->getYears($_GET['game']));
    
            break;
        case 'draws':
            $response->renderJson($controller->getDraws($_GET['game'], $_GET['year']));
    
            break;
        default:
            $response->render404();
    }
} catch (NotFoundException $exception) {
    $response->render404();
} catch (ParseException $exception) {
    $response->renderJsonServerError($exception->getMessage());
}