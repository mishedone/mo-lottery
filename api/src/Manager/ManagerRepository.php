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
     * @return DrawManager
     */
    public function getDrawManager($providerId, $gameId)
    {
        if (!array_key_exists($providerId, $this->drawManagers)) {
            $this->drawManagers[$providerId] = [];
        }

        if (!array_key_exists($gameId, $this->drawManagers[$providerId])) {
            $this->drawManagers[$providerId][$gameId] = new DrawManager($this->dataPath, $providerId, $gameId);
        }

        return $this->drawManagers[$providerId][$gameId];
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