<?php

require_once 'autoload.php';

use MoLottery\Controller\Controller;
use MoLottery\Exception\NotFoundException;
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

// handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// routing / controller
try {
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($_GET['action']) {
        case 'games':
            if ($method === 'GET') {
                $response = new Response(200, $controller->getGames());
            }
            if ($method === 'POST') {
                $response = new Response(405);
            }
            break;
        case 'draws':
            if ($method === 'GET') {
                $response = new Response(200, $controller->getDraws($_GET['game'], $_GET['year']));
            }
            if ($method === 'POST') {
                $response = new Response(405);
            }
            break;
        case 'parses':
            if ($method === 'GET') {
                $response = new Response(200, $controller->getParses($_GET['game'], $_GET['year']));
            }
            if ($method === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $controller->createParse(
                    $_GET['game'],
                    $_GET['year'],
                    $data['url'],
                    $data['draws']
                );
                $response = new Response(201, []);
            }
            break;
        default:
            $response = new Response(404);
    }
} catch (NotFoundException $exception) {
    $response = new Response(404);
} catch (Exception $exception) {
    $response = new Response(500, array('error' => $exception->getMessage()));
}

$response->render();