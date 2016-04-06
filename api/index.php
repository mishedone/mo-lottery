<?php

$db = array();
if (file_exists('data/editions.json')) {
    $db = json_decode(file_get_contents('data/editions.json'), true);
}

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

            if (count($towing)) {
                $editions[] = array_values($towing);
            }
        }

        $db[$year] = $editions;

        $update = true;
    }
}

if ($update) {
    file_put_contents('data/editions.json', json_encode($db));
} else {
    header('Content-Type: application/json');
    echo json_encode($db);
}
