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
        return parent::getArchiveUrl($year);
    }

    /**
     * @return string
     */
    public function getDrawPageUrl()
    {
        return 'https://toto.bg/index.php?lang=1&pid=drawing649';
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [];
    }
}
