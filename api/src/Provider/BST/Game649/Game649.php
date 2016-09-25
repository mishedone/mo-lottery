<?php

namespace MoLottery\Provider\BST\Game649;

use MoLottery\Provider\BST\AbstractBSTGame;

/**
 * Bulgarian Sport Totalizator - 6/49 game.
 */
class Game649 extends AbstractBSTGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return 'bst-649';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'Bulgarian Sport Totalizator - 6/49';
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
        return 113983816;
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
        for ($year = 1958; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }

        // build numbers
        for ($number = 1; $number <= 49; $number++) {
            $this->numbers[] = $number;
        }
    }
}