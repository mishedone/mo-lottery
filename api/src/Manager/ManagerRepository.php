<?php

namespace MoLottery\Manager;

/**
 * Instantiates storage managers.
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
     * @var LastParseManager
     */
    private $lastParseManager;
    
    /**
     * @var array
     */
    private $optionManagers = [];

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
     * @return LastParseManager
     */
    public function getLastParseManager()
    {
        if (!$this->lastParseManager) {
            $this->lastParseManager = new LastParseManager($this->dataPath);
        }

        return $this->lastParseManager;
    }
    
    /**
     * @param string $providerId
     * @param string $gameId
     * @return OptionManager
     */
    public function getOptionManager($providerId, $gameId)
    {
        $key = sprintf('%s-%s', $providerId, $gameId);
        if (!array_key_exists($key, $this->optionManagers)) {
            $this->optionManagers[$key] = new OptionManager($this->dataPath, $providerId, $gameId);
        }
        
        return $this->optionManagers[$key];
    }
}