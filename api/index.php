<?php

require_once 'autoload.php';

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

// routing
try {
    switch ($_GET['action']) {
        case 'providers':
            $response->renderJson([
                'providers' => $providerRepository->getProvidersData()
            ]);
    
            break;
        case 'years':
            $response->renderJson([
                'years' => $providerRepository->getYears(
                    $_GET['provider'],
                    $_GET['game']
                )
            ]);
    
            break;
        case 'draws':
            $response->renderJson([
                'draws' => $providerRepository->getDraws(
                    $_GET['provider'],
                    $_GET['game'],
                    $_GET['year']
                )
            ]);
    
            break;
        default:
            $response->render404();
    }
} catch (NotFoundException $exception) {
    $response->render404();
} catch (ParseException $exception) {
    $response->renderJsonServerError($exception->getMessage());
}