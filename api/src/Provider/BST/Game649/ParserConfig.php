<?php

namespace MoLottery\Provider\BST\Game649;

use MoLottery\Provider\BST\AbstractParserConfig;

/**
 * Special parser configuration for the 6/49 game.
 */
class ParserConfig extends AbstractParserConfig
{
    /**
     * @return string
     */
    public function getArchiveId()
    {
        return '649';
    }
    
    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'http://www.toto.bg/index.php?lang=1&pid=32&sid=50';
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [];
    }
}