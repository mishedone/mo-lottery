<?php

namespace MoLottery\Manager;

/**
 * Manages data access to the available draws.
 */
class DrawManager extends AbstractManager
{
    /**
     * @const FILE The file in which data is stored and read from.
     */
    const FILE = 'draws.json';

    /**
     * @var array
     */
    private $draws = array();

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        parent::__construct($dataPath);
        $this->draws = $this->readData();
    }

    /**
     * @param int $year
     * @return bool
     */
    public function hasDraws($year)
    {
        return isset($this->draws[(int) $year]);
    }

    /**
     * @param int $year
     * @return array
     */
    public function getDraws($year)
    {
        return $this->hasDraws($year) ? $this->draws[(int) $year] : array();
    }

    /**
     * @param int $year
     * @param array $draws
     */
    public function updateDraws($year, array $draws)
    {
        $this->draws[(int) $year] = $draws;
        $this->saveData($this->draws);
    }
}