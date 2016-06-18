<?php

namespace MoLottery\Provider;

use MoLottery\Manager\EditionManager;
use MoLottery\Manager\LastParseManager;
use MoLottery\Provider\Parser\BSTArchiveYearParser;
use MoLottery\Provider\Parser\BSTCurrentYearParser;

/**
 * Bulgarian Sport Totalizator data provider.
 */
class BSTProvider
{
    /**
     * @const CURRENT_YEAR_LAST_PARSE_KEY Key for storing last parse date.
     */
    const CURRENT_YEAR_LAST_PARSE_KEY = 'bst-provider-current-year';

    /**
     * @var EditionManager
     */
    private $editionManager;

    /**
     * @var LastParseManager
     */
    private $lastParseManager;

    /**
     * @var BSTArchiveYearParser
     */
    private $archiveYearParser;

    /**
     * @var BSTCurrentYearParser
     */
    private $currentYearParser;

    /**
     * @var array
     */
    private $years = array();

    /**
     * @param EditionManager $editionManager
     * @param LastParseManager $lastParseManager
     */
    public function __construct(EditionManager $editionManager, LastParseManager $lastParseManager)
    {
        $this->editionManager = $editionManager;
        $this->lastParseManager = $lastParseManager;

        // initialize parsers
        $this->archiveYearParser = new BSTArchiveYearParser();
        $this->currentYearParser = new BSTCurrentYearParser();

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
    public function getEditions($year)
    {
        // unsupported year
        if (!$this->hasYear($year)) {
            return array();
        }

        // current year vs archive year
        if (date('Y') == $year) {
            if (!$this->lastParseManager->hasLastParseToday(static::CURRENT_YEAR_LAST_PARSE_KEY)) {
                $this->editionManager->updateEditions($year, $this->currentYearParser->parse());
                $this->lastParseManager->setLastParse(static::CURRENT_YEAR_LAST_PARSE_KEY, new \DateTime());
            }
        } else {
            $archiveIsLoaded = $this->editionManager->hasEditions($year);

            // load archive editions if missing
            if (!$archiveIsLoaded) {
                $this->editionManager->updateEditions($year, $this->archiveYearParser->parse($year));
            }
        }

        return $this->editionManager->getEditions($year);
    }
}