<?php

namespace MoLottery\Provider\ACME\GameRocket;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;

/**
 * ACME - Rocket game.
 */
class GameRocket extends AbstractGame
{
    /**
     * @return string
     */
    public function getId()
    {
        return 'rocket';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'Rocket';
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

        return array(
            [7, 7, 7, 7, 7, 7]
        );
    }

    /**
     * @return int
     */
    public function getPossibleDraws()
    {
        return 1;
    }

    /**
     * Builds years and numbers.
     */
    public function __construct()
    {
        $this->years[] = 2016;
        $this->numbers[] = 7;
    }
}