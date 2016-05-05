<?php

namespace MoLottery\Provider;

use MoLottery\Manager\EditionManager;
use MoLottery\Tool\Clean;
use MoLottery\Tool\Curl;

/**
 * Bulgarian Sport Totalizator data provider.
 */
class BSTProvider
{
    use Clean, Curl;

    /**
     * @const EDITION_PAGE_URL Url of the page listing editions for the current year.
     */
    const EDITION_PAGE_URL = 'http://www.toto.bg/index.php?lang=1&pid=32&sid=50';

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
        for ($year = 1958; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }
    }

    /**
     * @param int $year
     * @return bool
     */
    public function hasYear($year)
    {
        return in_array((int) $year, $this->years);
    }

    /**
     * @return array
     */
    public function getYears()
    {
        return $this->years;
    }

    /**
     * @param int $year
     * @return array
     */
    public function getYearEditions($year)
    {
        // unsupported year
        if (!$this->hasYear($year)) {
            return array();
        }

        // current year vs archive year
        if (date('Y') == $year) {
            // TODO: skip edition loading if latest has been already loaded
            $this->editionManager->updateEditions($year, $this->parseEditions());
        } else {
            $archiveIsLoaded = $this->editionManager->hasEditions($year);

            // load archive editions if missing
            if (!$archiveIsLoaded) {
                $this->editionManager->updateEditions($year, $this->parseArchiveEditions($year));
            }
        }

        // save not persisted changes
        $this->editionManager->saveEditions();

        return $this->editionManager->getEditions($year);
    }

    /**
     * Loads and parses all editions for a certain archived year.
     *
     * @param int $year
     * @return array
     */
    private function parseArchiveEditions($year)
    {
        $archiveEditions = file_get_contents(sprintf(
            'http://www.toto.bg/files/tiraji/649_%s.txt',
            ($year < 2005) ? substr($year, 2) : $year
        ));

        $editions = array();
        foreach (explode("\n", $archiveEditions) as $rawEdition) {
            $rawEdition = trim($rawEdition);

            // skip empty rows
            if (empty($rawEdition)) {
                continue;
            }

            // remove spaces after commas, remove leading nonsense, trim
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

                $editions[] = $this->cleanNumbers($numbers);
            }
        }

        return $editions;
    }

    /**
     * Loads the content of an html page and parses all available edition names for the current year.
     *
     * @return array
     */
    private function parseEditionNames()
    {
        $html = $this->curlPost(static::EDITION_PAGE_URL, array(
            'tir' => date('YEAR') . '/1'
        ));

        $selectOptions = array();
        preg_match('/<select id="tir".*?>(?<options>.*)<\/select>/s', $html, $selectOptions);

        $editionNames = array();
        preg_match_all('/value="(?<names>.*?)"/s', $selectOptions['options'], $editionNames);

        // reorder matched edition names in ascending order
        $editionNames = $editionNames['names'];
        krsort($editionNames);

        return array_values($editionNames);
    }

    /**
     * Loads the content of an html page and extracts the numbers in a certain edition.
     *
     * @param string $name
     * @return array
     */
    private function parseEdition($name)
    {
        $html = $this->curlPost(static::EDITION_PAGE_URL, array(
            'tir' => $name
        ));

        $numbers = array();
        preg_match_all('/images\/balls\/_(?<numbers>\d*)\./s', $html, $numbers);

        $numbers = $numbers['numbers'];
        if (count($numbers) != 6) {
            // TODO: throw proper exception in here
        }

        return $this->cleanNumbers($numbers);
    }

    /**
     * Parses all editions for the current year.
     *
     * @return array
     */
    private function parseEditions()
    {
        $editions = array();
        foreach ($this->parseEditionNames() as $name) {
            $editions[] = $this->parseEdition($name);
        }

        return $editions;
    }
}