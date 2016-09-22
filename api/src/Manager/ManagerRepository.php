<?php

namespace MoLottery\Manager;

/**
 * Instantiates draw managers for different games and providers and keeps last parse manager as singleton.
 */
class ManagerRepository
{
    /**
     * @var string
     */
    private $dataPath;

    /**
     * @var array
     */
    private $drawManagers = [];
    
    /**
     * @var array
     */
    private $drawNameManagers = [];

    /**
     * @var LastParseManager
     */
    private $lastParseManager;

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        $this->dataPath = $dataPath;
    }

    /**
     * @param string $providerId
     * @param string $gameId
     * @param int $year
     * @return DrawManager
     */
    public function getDrawManager($providerId, $gameId, $year)
    {
        $key = sprintf('%s-%s-%d', $providerId, $gameId, $year);
        if (!array_key_exists($key, $this->drawManagers)) {
            $this->drawManagers[$key] = new DrawManager($this->dataPath, $providerId, $gameId, $year);
        }

        return $this->drawManagers[$key];
    }
    
    /**
     * @param string $providerId
     * @param string $gameId
     * @return DrawNameManager
     */
    public function getDrawNameManager($providerId, $gameId)
    {
        $key = sprintf('%s-%s', $providerId, $gameId);
        if (!array_key_exists($key, $this->drawNameManagers)) {
            $this->drawNameManagers[$key] = new DrawNameManager($this->dataPath, $providerId, $gameId);
        }
        
        return $this->drawNameManagers[$key];
    }

    /**
     * @return LastParseManager
     */
    public function getLastParseManager()
    {
        if (!$this->lastParseManager) {
            $this->lastParseManager = new LastParseManager($this->dataPath);
        }

        return $this->lastParseManager;
    }
}