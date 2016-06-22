<?php

namespace MoLottery\Provider;

/**
 * Base for all game classes providing the common interface / functionality.
 */
abstract class AbstractGame
{
    /**
     * @var array
     */
    protected $years = [];

    /**
     * @return string
     */
    abstract public function getId();

    /**
     * @return string
     */
    abstract public function getName();

    /**
     * @param int $year
     * @return bool
     */
    public function hasYear($year)
    {
        return in_array((int) $year, $this->years);
    }

    /**
     * @return array
     */
    public function getYears()
    {
        return $this->years;
    }
}