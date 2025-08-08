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
     * @param int $year
     * @return string
     */
    public function getArchiveUrl($year)
    {
        if ($year == 2017) {
            return 'http://toto.bg/content/files/2018/01/26/e0992503391e9303df5f015db7f62baf.txt';
        }
        if ($year == 2018) {
            return 'http://toto.bg/content/files/2019/02/16/ef7f92941395be9fb6d753437ed6258a.txt';
        }
        if ($year == 2019) {
            return 'http://toto.bg/content/files/2020/01/04/4b3156b9d0787eec501f523579c2794c.txt';
        }
        if ($year == 2020) {
            return 'http://toto.bg/content/files/2021/01/09/a5ff4be58791605de735f29e08aa7abf.txt';
        }
        return parent::getArchiveUrl($year);
    }

    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'https://info.toto.bg/results/5x35';
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
