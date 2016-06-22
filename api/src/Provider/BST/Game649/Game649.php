<?php

namespace MoLottery\Provider\BST\Game649;

use MoLottery\Provider\AbstractGame;

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
     * Builds years.
     */
    public function __construct()
    {
        for ($year = 1958; $year <= date('Y'); $year++) {
            $this->years[] = $year;
        }
    }
}