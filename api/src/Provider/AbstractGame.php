<?php

namespace MoLottery\Provider;

/**
 * Base for all game classes providing the common interface / functionality.
 */
abstract class AbstractGame
{
    /**
     * @return string
     */
    abstract public function getId();

    /**
     * @return string
     */
    abstract public function getName();
    
    /**
     * @var array
     */
    protected $years = [];

    /**
     * @param int $year
     * @return bool
     */
    protected function hasYear($year)
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