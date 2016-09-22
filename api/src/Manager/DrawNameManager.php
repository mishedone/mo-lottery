<?php

namespace MoLottery\Manager;

/**
 * Caches processed draw names for the current year to speed up parsing.
 */
class DrawNameManager extends AbstractManager
{
    /**
     * @var string
     */
    protected $file = 'draw-names.json';
    
    /**
     * @var array
     */
    private $drawNames = [];
    
    /**
     * @param string $dataPath
     * @param string $providerId
     * @param string $gameId
     */
    public function __construct($dataPath, $providerId, $gameId)
    {
        $dir = sprintf('draws-%s-%s', $providerId, $gameId);
        
        // create dir if it's not existing
        $fullPath = $dataPath . DIRECTORY_SEPARATOR . $dir;
        if (!is_dir($fullPath)) {
            mkdir($fullPath);
        }
        
        parent::__construct($fullPath);
        $this->drawNames = $this->readData();
    }
}