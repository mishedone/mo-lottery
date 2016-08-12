<?php

namespace MoLottery\Provider\BST\Game535;

use MoLottery\Provider\BST\AbstractBSTGame;

/**
 * Bulgarian Sport Totalizator - 5/35 game.
 */
class Game535 extends AbstractBSTGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return '535';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return '5/35';
    }

    /**
     * @return int
     */
    public function getDrawSize()
    {
        return 5;
    }

    /**
     * @return int
     */
    public function getPossibleDraws()
    {
        return 324632;
    }

    /**
     * Builds years and numbers.
     */
    public function __construct()
    {
        parent::__construct();

        // build years
        for ($year = 1989; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }

        // build numbers
        for ($number = 1; $number <= 35; $number++) {
            $this->numbers[] = $number;
        }
    }
}