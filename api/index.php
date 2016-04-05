<?php

$url = 'http://www.toto.bg/files/tiraji/649_58.txt';

$urlContent = file_get_contents($url);
$editions = array();
foreach (explode("\n", $urlContent) as $rawEdition) {
    $towing = explode(',', $rawEdition);
    unset($towing[0]);

    $editions[] = array_values($towing);
}

header('Content-Type: application/json');
echo json_encode($editions);