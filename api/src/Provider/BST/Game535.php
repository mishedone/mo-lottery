<?php

namespace MoLottery\Provider\BST;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;

/**
 * Bulgarian Sport Totalizator - 5/35 game.
 */
class Game535 extends AbstractGame
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
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($year)
    {
        $this->validateYear($year);

        return array(
            [15, 22, 24, 26, 29]
        );
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
        $this->years[] = 2016;

        // build numbers
        for ($number = 1; $number <= 35; $number++) {
            $this->numbers[] = $number;
        }
    }
}