<?php

namespace MoLottery\Provider\BST\Game642;

use MoLottery\Provider\BST\AbstractBSTGame;

/**
 * Bulgarian Sport Totalizator - 6/42 game.
 */
class Game642 extends AbstractBSTGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return 'bst-642';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'Bulgarian Sport Totalizator - 6/42';
    }

    /**
     * @return int
     */
    public function getDrawSize()
    {
        return 6;
    }

    /**
     * @return int
     */
    public function getPossibleDraws()
    {
        return 5245786;
    }

    /**
     * @return int
     */
    public function getHotColdTrendDrawsPerPeriod()
    {
        return 16;
    }
    
    /**
     * @return int
     */
    public function getDrawsPerWeek()
    {
        return 2;
    }

    /**
     * @return ParserConfig
     */
    public function getParserConfig()
    {
        return new ParserConfig();
    }

    /**
     * Builds years and numbers.
     */
    public function __construct()
    {
        parent::__construct();

        // build years
        for ($year = 1995; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }

        // build numbers
        for ($number = 1; $number <= 42; $number++) {
            $this->numbers[] = $number;
        }
    }
}