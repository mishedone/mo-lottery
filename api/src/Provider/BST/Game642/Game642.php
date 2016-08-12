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
            [15, 22, 24, 26, 29, 35]
        );
    }

    /**
     * @return int
     */
    public function getPossibleDraws()
    {
        return 5245786;
    }

    /**
     * Builds years and numbers.
     */
    public function __construct()
    {
        $this->years[] = 2016;

        // build numbers
        for ($number = 1; $number <= 42; $number++) {
            $this->numbers[] = $number;
        }
    }
}