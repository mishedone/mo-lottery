<?php

namespace MoLottery\Provider;

use MoLottery\Manager\EditionManager;

/**
 * Bulgarian Sport Totalizator data provider.
 */
class BSTProvider
{
    /**
     * @var EditionManager
     */
    private $editionManager;

    /**
     * @var array
     */
    private $years = array();

    /**
     * @param EditionManager $editionManager
     */
    public function __construct(EditionManager $editionManager)
    {
        $this->editionManager = $editionManager;

        // build available years
        for ($year = 1958; $year <= 1965; $year++) {
            $this->years[] = $year;
        }
    }

    /**
     * @param int $year
     * @return string
     */
    private function loadProviderEditions($year)
    {
        $url = sprintf(
            'http://www.toto.bg/files/tiraji/649_%d.txt',
            ($year < 2005) ? substr($year, 2) : $year
        );

        return file_get_contents($url);
    }

    /**
     * @param string $providerEditions
     * @return array
     */
    private function parseProviderEditions($providerEditions)
    {
        $parsedEditions = array();
        foreach (explode("\n", $providerEditions) as $rawEdition) {
            $numbers = explode(',', $rawEdition);
            unset($numbers[0]);

            if (count($numbers) > 6) {
                echo 'Wrong format!';
                var_dump($providerEditions);
                die();
            }

            // skip empty rows
            if (count($numbers)) {
                $parsedEditions[] = array_values($numbers);
            }
        }

        return $parsedEditions;
    }

    /**
     * Adds editions for all years that are missing in the editions database.
     */
    public function sync()
    {
        $existingEditions = $this->editionManager->getEditions();

        foreach ($this->years as $year) {
            $yearAlreadyLoaded = isset($existingEditions[$year]);

            if (!$yearAlreadyLoaded) {
                $providerEditions = $this->loadProviderEditions($year);
                $parsedEditions = $this->parseProviderEditions($providerEditions);

                $this->editionManager->updateEditions($year, $parsedEditions);
            }
        }

        $this->editionManager->saveEditions();
    }
}