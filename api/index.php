<?php

require_once 'autoload.php';

use MoLottery\Exception\NotFoundException;
use MoLottery\Exception\ParseException;
use MoLottery\Http\Response;
use MoLottery\Manager\DrawManager;
use MoLottery\Manager\LastParseManager;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\BSTProvider;
use MoLottery\Provider\ProviderRepository;

$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data';

// build services
$response = new Response();
$drawManager = new DrawManager($dataPath);
$lastParseManager = new LastParseManager($dataPath);
$providerBST = new BSTProvider($drawManager, $lastParseManager);

// new provider stuff in here
$managerRepository = new ManagerRepository($dataPath);
$providerRepository = new ProviderRepository($managerRepository);

// routing
try {
    switch ($_GET['action']) {
        case 'providers':
            $providers = [];
    
            // build response data for the providers with their games
            foreach ($providerRepository->getProviders() as $provider) {
                $games = [];
                foreach ($provider->getGames() as $game) {
                    $games[] = [
                        'id' => $game->getId(),
                        'name' => $game->getName()
                    ];
                }
    
                $providers[] = [
                    'id' => $provider->getId(),
                    'name' => $provider->getName(),
                    'games' => $games
                ];
            }
            $response->renderJson(['providers' => $providers]);
    
            break;
        case 'years':
    
            $years = $provider->getYears();
            $response->renderJson(['years' => $years]);
    
            break;
        case 'draws':
            $year = $_GET['year'];
            if (!$providerBST->hasYear($year)) {
                $response->render404();
            }
    
            // ok - we have data for the requested year - return it
            $draws = $providerBST->getDraws($year);
            $response->renderJson(['draws' => $draws]);
    
            break;
        default:
            $response->render404();
    }
} catch (NotFoundException $exception) {
    $response->render404();
} catch (ParseException $exception) {
    $response->renderJsonServerError($exception->getMessage());
}