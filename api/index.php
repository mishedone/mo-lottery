<?php

require_once 'autoload.php';

use MoLottery\Controller\Controller;
use MoLottery\Exception\NotFoundException;
use MoLottery\Exception\ParseException;
use MoLottery\Http\Response;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\GameRepository;

// configure manager repository singleton
$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data';
ManagerRepository::setDataPath($dataPath);

// build services
$response = new Response();
$gameRepository = new GameRepository();
$controller = new Controller($gameRepository);

// routing / controller
try {
    switch ($_GET['action']) {
        case 'games':
            $response->renderJson($controller->getGames());
    
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