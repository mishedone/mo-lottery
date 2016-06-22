<?php

namespace MoLottery\Provider\BST\Game649;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;
use MoLottery\Provider\BST\Game649\Parser\ArchiveYearParser;
use MoLottery\Provider\BST\Game649\Parser\CurrentYearParser;

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
     * @var ArchiveYearParser
     */
    private $archiveYearParser;

    /**
     * @var CurrentYearParser
     */
    private $currentYearParser;

    /**
     * Builds years and parsers.
     */
    public function __construct()
    {
        // initialize parsers
        $this->archiveYearParser = new ArchiveYearParser();
        $this->currentYearParser = new CurrentYearParser();
        
        // build years
        for ($year = 1958; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }
    }
}