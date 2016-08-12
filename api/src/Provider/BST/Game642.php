<?php

namespace MoLottery\Provider\BST;

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