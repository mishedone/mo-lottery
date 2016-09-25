<?php

namespace MoLottery\Manager;

/**
 * Instantiates storage managers.
 */
class ManagerRepository
{
    /**
     * @var ManagerRepository
     */
    private static $instance;
    
    /**
     * @var string
     */
    private static $dataPath;

    /**
     * @var array
     */
    private $drawManagers = [];
    
    /**
     * @param string $dataPath
     */
    public static function setDataPath($dataPath)
    {
        static::$dataPath = $dataPath;
    }
    
    /**
     * @return ManagerRepository
     */
    public static function get()
    {
        if (!static::$instance) {
            static::$instance = new ManagerRepository();
        }
        
        return static::$instance;
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
            $this->drawManagers[$key] = new DrawManager(static::$dataPath, $providerId, $gameId, $year);
        }

        return $this->drawManagers[$key];
    }
}