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
        for ($year = 1958; $year <= 2015; $year++) {
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
            'http://www.toto.bg/files/tiraji/649_%s.txt',
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
            // skip empty rows
            if (preg_match('/^\s*$/', $rawEdition)) {
                continue;
            }

            // fix spaces after commas, remove leading nonsense, trim
            $rawEdition = trim($rawEdition);
            $rawEdition = preg_replace('/,\s{1,}/', ',', $rawEdition);
            $rawEdition = preg_replace('/^.*?[,\-\s]/', '', $rawEdition);
            $rawEdition = trim($rawEdition);

            // split row into sections of numbers
            $sections = preg_split('/\s{1,}/', $rawEdition);
            foreach ($sections as $section) {
                $numbers = explode(',', $section);
                if (count($numbers) != 6) {
                    // TODO: throw proper exception in here
                }

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