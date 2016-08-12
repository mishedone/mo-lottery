<?php

namespace MoLottery\Provider\BST\Game642;

use MoLottery\Provider\BST\AbstractParserConfig;

/**
 * Special parser configuration for the 6/42 game.
 */
class ParserConfig extends AbstractParserConfig
{
    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'http://www.toto.bg/index.php?lang=1&pid=32&sid=51';
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [
            '64,4,7,10,11,16,19,     1,11,16,18,26,37        10,14,16,17,18,35' => '64,4,7,10,11,16,19     1,11,16,18,26,37        10,14,16,17,18,35',
            '3311,14,26,29,32,39     3,6,11,17,27,30         10,18,25,29,33,39' => '33,11,14,26,29,32,39     3,6,11,17,27,30         10,18,25,29,33,39',
            '3611,14,20,30,39,42     1,2,7,10,17,22          1,3,6,23,28,37' => '36,11,14,20,30,39,42     1,2,7,10,17,22          1,3,6,23,28,37',
            '3811,17,20,21,30,37     9,18,23,32,37,38        1,18,20,25,26,31' => '38,11,17,20,21,30,37     9,18,23,32,37,38        1,18,20,25,26,31'
        ];
    }
}