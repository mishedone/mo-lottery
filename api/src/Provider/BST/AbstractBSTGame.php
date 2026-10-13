<?php

namespace MoLottery\Provider\BST;

use MoLottery\Exception\NotFoundException;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\AbstractGame;
use MoLottery\Provider\BST\Parser\ArchiveYearParser;
use MoLottery\Provider\BST\Parser\CurrentYearParser;

/**
 * Define common tasks for the BST games.
 */
abstract class AbstractBSTGame extends AbstractGame
{
    /**
     * @return AbstractParserConfig
     */
    abstract public function getParserConfig();

    /**
     * @var ArchiveYearParser
     */
    protected $archiveYearParser;

    /**
     * @var CurrentYearParser
     */
    protected $currentYearParser;

    /**
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($year)
    {
        $draws = parent::getDraws($year);

        // parse archive year if missing
        $currentYear = date('Y');
        if ($year != $currentYear) {
            $drawManager = ManagerRepository::get()->getDrawManager(
                $this->getId(), $year
            );

            if (!$drawManager->has()) {
                $draws = $this->archiveYearParser->parse($year);
                $drawManager->set($draws);
            }
        }

        return $draws;
    }

    /**
     * Builds parsers.
     */
    public function __construct()
    {
        $this->archiveYearParser = new ArchiveYearParser($this);
        $this->currentYearParser = new CurrentYearParser($this);
    }
}
