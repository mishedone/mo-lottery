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
     * @param string $gameId
     * @param int $year
     * @return DrawManager
     */
    public function getDrawManager($gameId, $year)
    {
        $key = sprintf('%s-%d', $gameId, $year);
        if (!array_key_exists($key, $this->drawManagers)) {
            $this->drawManagers[$key] = new DrawManager(static::$dataPath, $gameId, $year);
        }

        return $this->drawManagers[$key];
    }
}