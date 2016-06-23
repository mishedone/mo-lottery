<?php

namespace MoLottery\Provider\BST\Game642;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;

/**
 * Bulgarian Sport Totalizator - 6/42 game.
 */
class Game642 extends AbstractGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return '642';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return '6/42';
    }

    /**
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($year)
    {
        $this->validateYear($year);

        return array(
            [15, 22, 24, 26, 29, 35]
        );
    }

    /**
     * Builds years.
     */
    public function __construct()
    {
        $this->years[] = 2016;
    }
}