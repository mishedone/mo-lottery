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
     * @return string
     */
    abstract public function getDrawPageUrl();

    /**
     * @return array
     */
    abstract public function getReplacements();
}