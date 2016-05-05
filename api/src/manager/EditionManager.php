<?php

namespace MoLottery\Manager;

/**
 * Manages data access to the available editions.
 */
class EditionManager extends AbstractManager
{
    /**
     * @const FILE The file in which data is stored and read from.
     */
    const FILE = 'editions.json';

    /**
     * @var array
     */
    private $editions = array();

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        parent::__construct($dataPath);
        $this->editions = $this->readData();
    }

    /**
     * @param int $year
     * @return bool
     */
    public function hasEditions($year)
    {
        return isset($this->editions[(int) $year]);
    }

    /**
     * @param int $year
     * @return array
     */
    public function getEditions($year)
    {
        return $this->hasEditions($year) ? $this->editions[(int) $year] : array();
    }

    /**
     * @param int $year
     * @param array $editions
     */
    public function updateEditions($year, array $editions)
    {
        $this->editions[(int) $year] = $editions;
        $this->saveData($this->editions);
    }
}