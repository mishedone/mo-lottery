<?php

namespace MoLottery\Provider\BST;

/**
 * Defines mandatory parser config functionality.
 */
abstract class AbstractParserConfig
{
    /**
     * @return string
     */
    abstract public function getArchiveId();

    /**
     * @param int $year
     * @return string
     */
    public function getArchiveUrl($year)
    {
        return sprintf(
            'http://toto.bg/content/files/stats-tiraji/%s_%s.txt',
            $this->getArchiveId(),
            ($year < 2005) ? substr($year, 2) : $year
        );
    }

    /**
     * @return string
     */
    abstract public function getDrawPageUrl();

    /**
     * @return array
     */
    abstract public function getReplacements();
}
