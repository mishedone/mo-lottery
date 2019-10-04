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
    public function getArchiveId()
    {
        return '642';
    }

    /**
     * @param int $year
     * @return string
     */
    public function getArchiveUrl($year)
    {
        if ($year == 2017) {
            return 'http://toto.bg/content/files/2018/01/26/fe9f0df91ce6c82978baf6a29ea003d8.txt';
        }
        if ($year == 2018) {
            return 'http://toto.bg/content/files/2019/02/16/e0600ff435695d05411a367f7205cc93.txt';
        }
        return parent::getArchiveUrl($year);
    }

    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'http://toto.bg/results/6x42';
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
