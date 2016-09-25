<?php

namespace MoLottery\Manager;

/**
 * Manages data access to the available draws.
 */
class DrawManager extends AbstractManager
{
    /**
     * @var string
     */
    protected $file = '';

    /**
     * @var array
     */
    private $draws = [];

    /**
     * @param string $dataPath
     * @param string $providerId
     * @param string $gameId
     * @param int $year
     */
    public function __construct($dataPath, $providerId, $gameId, $year)
    {
        $dir = sprintf('draws-%s-%s', $providerId, $gameId);
        
        // create dir if it's not existing
        $fullPath = $dataPath . DIRECTORY_SEPARATOR . $dir;
        if (!is_dir($fullPath)) {
            mkdir($fullPath);
        }
        
        parent::__construct($fullPath);
        $this->file = sprintf('%d.json', $year);
        $this->draws = $this->readData();
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
        return $this->draws;
    }

    /**
     * @param array $draws
     */
    public function set(array $draws)
    {
        $this->draws = $draws;
        $this->saveData($this->draws);
    }
}