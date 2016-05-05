<?php

namespace MoLottery\Manager;

/**
 * Manages dates of last data parsing.
 */
class LastParseManager extends AbstractManager
{
    /**
     * @const FILE The file in which data is stored and read from.
     */
    const FILE = 'last-parses.json';

    /**
     * @var array
     */
    private $lastParses = array();

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        parent::__construct($dataPath);
        $this->lastParses = $this->readData();
    }

    /**
     * @param string $key
     * @return \DateTime|null
     */
    public function getLastParse($key)
    {
        return isset($this->lastParses[$key]) ? new \DateTime($this->lastParses[$key]) : null;
    }

    /**
     * @param string $key
     * @param \DateTime $date
     */
    public function setLastParse($key, \DateTime $date)
    {
        $this->lastParses[$key] = $date->format('Y-m-d');
        $this->saveData($this->lastParses);
    }
}