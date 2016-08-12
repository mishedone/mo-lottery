<?php

namespace MoLottery\Provider\BST;

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
     * @return int
     */
    public function getPossibleDraws()
    {
        return 113983816;
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