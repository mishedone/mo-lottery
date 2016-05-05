<?php

namespace MoLottery\Manager;

/**
 * Manages data access to the available editions.
 */
class EditionManager
{
    /**
     * @const FILE The file in which data is stored and read from.
     */
    const FILE = 'editions.json';

    /**
     * @var string
     */
    private $dataPath = '';

    /**
     * @var array
     */
    private $editions = array();

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        $this->dataPath = $dataPath;
        $this->editions = $this->readEditions();
    }

    /**
     * @return string
     */
    private function getFilePath()
    {
        return $this->dataPath . DIRECTORY_SEPARATOR . static::FILE;
    }

    /**
     * @return array
     */
    private function readEditions()
    {
        if (!file_exists($this->getFilePath())) {
            return array();
        }

        return json_decode(file_get_contents($this->getFilePath()), true);
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
    }

    /**
     * Persists in memory editions if there is any new data.
     */
    public function saveEditions()
    {
        if ($this->readEditions() !== $this->editions) {
            file_put_contents($this->getFilePath(), json_encode($this->editions));
        }
    }
}