<?php

namespace MoLottery\Manager;

/**
 * Manages dates of last data parsing.
 */
class LastParseManager extends AbstractManager
{
    /**
     * @var string
     */
    protected $file = 'last-parses.json';

    /**
     * @const FORMAT In what format to store dates.
     */
    const FORMAT = 'Y-m-d';

    /**
     * @var array
     */
    private $lastParses = [];

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
     * @return bool
     */
    public function has($key)
    {
        if (!isset($this->lastParses[$key])) {
            return false;
        }

        return date(static::FORMAT) == $this->lastParses[$key];
    }

    /**
     * @param string $key
     * @param \DateTime $date
     */
    public function set($key, \DateTime $date)
    {
        $this->lastParses[$key] = $date->format(static::FORMAT);
        $this->saveData($this->lastParses);
    }
}