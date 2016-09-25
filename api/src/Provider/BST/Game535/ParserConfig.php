<?php

namespace MoLottery\Provider\BST\Game535;

use MoLottery\Provider\BST\AbstractParserConfig;

/**
 * Special parser configuration for the 5/35 game.
 */
class ParserConfig extends AbstractParserConfig
{
    /**
     * @return string
     */
    public function getArchiveId()
    {
        return '535';
    }
    
    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'http://www.toto.bg/index.php?lang=1&pid=32&sid=52';
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [
            '417,18,20,24,27         8,15,18,26,31   4,7,9,13,25' => '4,17,18,20,24,27         8,15,18,26,31   4,7,9,13,25',
            '812,15,21,23,30         4,23,27,28,33   5,16,18,28,32' => '8,12,15,21,23,30         4,23,27,28,33   5,16,18,28,32',
            '80-4, 5,13,25,26		3, 7,10,13,27		5, 7, 9,16,26,' => '80-4, 5,13,25,26		3, 7,10,13,27		5, 7, 9,16,26'
        ];
    }
}