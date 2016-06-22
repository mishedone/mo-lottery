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
     * @param string $provider
     * @param string $game
     * @return DrawManager
     */
    public function getDrawManager($provider, $game)
    {
        if (!array_key_exists($provider, $this->drawManagers)) {
            $this->drawManagers[$provider] = [];
        }

        if (!array_key_exists($game, $this->drawManagers[$provider])) {
            $this->drawManagers[$provider][$game] = new DrawManager($this->dataPath, $provider, $game);
        }

        return $this->drawManagers[$provider][$game];
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