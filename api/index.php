<?php

require_once 'src/manager/EditionManager.php';

use MoLottery\Manager\EditionManager;

$editionManager = new EditionManager(__DIR__ . DIRECTORY_SEPARATOR . 'data');

$db = $editionManager->getEditions();

$update = false;
for ($year = 1958; $year <= 1965; $year++) {
    if (!isset($db[$year])) {
        echo sprintf('Reloading db for %d year...' . "\r\n", $year);

        $urlYear = ($year < 2005) ? substr($year, 2) : $year;
        $url = sprintf('http://www.toto.bg/files/tiraji/649_%d.txt', $urlYear);
        $urlContent = file_get_contents($url);

        $editions = array();
        foreach (explode("\n", $urlContent) as $rawEdition) {
            $towing = explode(',', $rawEdition);
            unset($towing[0]);

            if (count($towing) > 6) {
                echo 'Wrong format!';
                var_dump($urlContent);
                die();
            }

            if (count($towing)) {
                $editions[] = array_values($towing);
            }
        }

        $editionManager->updateEditions($year, $editions);
        $update = true;
    }
}

if ($update) {
    $editionManager->saveEditions();
} else {
    header('Content-Type: application/json');
    echo json_encode($db);
}
