<?php

namespace MoLottery\Provider;

use MoLottery\Manager\DrawManager;
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
     * @var DrawManager
     */
    private $drawManager;

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
     * @param DrawManager $drawManager
     * @param LastParseManager $lastParseManager
     */
    public function __construct(DrawManager $drawManager, LastParseManager $lastParseManager)
    {
        $this->drawManager = $drawManager;
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
    public function getDraws($year)
    {
        // unsupported year
        if (!$this->hasYear($year)) {
            return array();
        }

        // current year vs archive year
        if (date('Y') == $year) {
            if (!$this->lastParseManager->hasLastParseToday(static::CURRENT_YEAR_LAST_PARSE_KEY)) {
                $this->drawManager->updateDraws($year, $this->currentYearParser->parse());
                $this->lastParseManager->setLastParse(static::CURRENT_YEAR_LAST_PARSE_KEY, new \DateTime());
            }
        } else {
            $archiveIsLoaded = $this->drawManager->hasDraws($year);

            // load archive editions if missing
            if (!$archiveIsLoaded) {
                $this->drawManager->updateDraws($year, $this->archiveYearParser->parse($year));
            }
        }

        return $this->drawManager->getDraws($year);
    }
}