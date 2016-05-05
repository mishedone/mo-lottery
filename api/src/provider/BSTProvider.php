<?php

namespace MoLottery\Provider;

use MoLottery\Manager\EditionManager;
use MoLottery\Provider\Parser\BSTArchiveYearParser;
use MoLottery\Provider\Parser\BSTCurrentYearParser;

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
     */
    public function __construct(EditionManager $editionManager)
    {
        $this->editionManager = $editionManager;
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
    public function getYearEditions($year)
    {
        // unsupported year
        if (!$this->hasYear($year)) {
            return array();
        }

        // current year vs archive year
        if (date('Y') == $year) {
            // TODO: skip edition loading if latest has been already loaded
            $this->editionManager->updateEditions($year, $this->currentYearParser->parse());
        } else {
            $archiveIsLoaded = $this->editionManager->hasEditions($year);

            // load archive editions if missing
            if (!$archiveIsLoaded) {
                $this->editionManager->updateEditions($year, $this->archiveYearParser->parse($year));
            }
        }

        // save not persisted changes
        $this->editionManager->saveEditions();

        return $this->editionManager->getEditions($year);
    }
}