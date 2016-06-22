<?php

namespace MoLottery\Provider;

use MoLottery\Exception\NotFoundException;

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
     * @param int $year
     * @return array
     */
    abstract public function getDraws($year);
    
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
     * @param int $year
     * @throws NotFoundException
     */
    protected function validateYear($year)
    {
        if (!$this->hasYear($year)) {
            throw NotFoundException::notFound(
                'game "%s" has no year like "%d"',
                $this->getId(),
                $year
            );
        }
    }

    /**
     * @return array
     */
    public function getYears()
    {
        return $this->years;
    }
}