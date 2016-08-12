<?php

namespace MoLottery\Provider\BST\Game649;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;
use MoLottery\Provider\BST\Parser\ArchiveYearParser;
use MoLottery\Provider\BST\Parser\CurrentYearParser;

/**
 * Bulgarian Sport Totalizator - 6/49 game.
 */
class Game649 extends AbstractGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return '649';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return '6/49';
    }

    /**
     * @return int
     */
    public function getDrawSize()
    {
        return 6;
    }
    
    /**
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($year)
    {
        $this->validateYear($year);

        // current year vs archive year
        if (date('Y') == $year) {
            return $this->currentYearParser->parse();
        } else {
            return $this->archiveYearParser->parse($year);
        }
    }

    /**
     * @return int
     */
    public function getPossibleDraws()
    {
        return 113983816;
    }
    
    /**
     * @var ArchiveYearParser
     */
    private $archiveYearParser;

    /**
     * @var CurrentYearParser
     */
    private $currentYearParser;

    /**
     * Builds years, numbers and parsers.
     */
    public function __construct()
    {
        // initialize parsers
        $this->archiveYearParser = new ArchiveYearParser($this);
        $this->currentYearParser = new CurrentYearParser($this);
        
        // build years
        for ($year = 1958; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }

        // build numbers
        for ($number = 1; $number <= 49; $number++) {
            $this->numbers[] = $number;
        }
    }
}