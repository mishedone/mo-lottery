<?php

namespace MoLottery\Manager;

/**
 * Stores some parse results for later reference.
 */
class ParseManager extends AbstractManager
{
    /**
     * @var array
     */
    private $parses = [];

    /**
     * @param string $dataPath
     * @param string $gameId
     * @param int $year
     */
    public function __construct($dataPath, $gameId, $year)
    {
        $dir = sprintf('parses-%s', $gameId);
        
        // create dir if it's not existing
        $fullPath = $dataPath . DIRECTORY_SEPARATOR . $dir;
        if (!is_dir($fullPath)) {
            mkdir($fullPath);
        }
        
        parent::__construct($fullPath);
        $this->file = sprintf('%d.json', $year);
        $this->parses = $this->readData();
    }
    
    /**
     * @return bool
     */
    public function has()
    {
        return $this->hasData();
    }

    /**
     * @return array
     */
    public function get()
    {
        return $this->parses;
    }

    /**
     * @param array $parses
     */
    public function set(array $parses)
    {
        $this->parses = $parses;
        $this->saveData($this->parses);
    }
}