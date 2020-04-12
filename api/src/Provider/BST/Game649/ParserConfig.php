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
     * @param int $year
     * @return string
     */
    public function getArchiveUrl($year)
    {
        if ($year == 2017) {
            return 'http://toto.bg/content/files/2018/01/26/2a0952991d371ca5575a4d79e5c5e5d5.txt';
        }
        if ($year == 2018) {
            return 'http://toto.bg/content/files/2019/02/16/be9d1b15257f53cd749db1e501b01180.txt';
        }
        if ($year == 2019) {
            return 'http://toto.bg/content/files/2020/01/04/149bdb98aa8426faf31b8b57fde4c5eb.txt';
        }
        return parent::getArchiveUrl($year);
    }

    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'http://toto.bg/results/6x49';
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [];
    }
}
