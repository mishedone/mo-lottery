<?php

namespace MoLottery\Manager;

/**
 * Stores game specific options.
 */
class OptionManager extends AbstractManager
{
    /**
     * @var string
     */
    protected $file = '';
    
    /**
     * @var array
     */
    private $options = [];
    
    /**
     * @param string $dataPath
     * @param string $providerId
     * @param string $gameId
     */
    public function __construct($dataPath, $providerId, $gameId)
    {
        // create dir if it's not existing
        $fullPath = $dataPath . DIRECTORY_SEPARATOR . 'options';
        if (!is_dir($fullPath)) {
            mkdir($fullPath);
        }
        
        parent::__construct($fullPath);
        $this->file = sprintf('%s-%s.json', $providerId, $gameId);
        $this->drawNames = $this->readData();
    }
}