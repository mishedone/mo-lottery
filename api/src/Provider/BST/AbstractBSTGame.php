<?php

namespace MoLottery\Provider\BST;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;
use MoLottery\Provider\BST\AbstractParserConfig;
use MoLottery\Provider\BST\Parser\ArchiveYearParser;
use MoLottery\Provider\BST\Parser\CurrentYearParser;

/**
 * Define common tasks for the BST games.
 */
abstract class AbstractBSTGame extends AbstractGame
{
    /**
     * @return AbstractParserConfig
     */
    abstract protected function getParserConfig();

    /**
     * @var ArchiveYearParser
     */
    protected $archiveYearParser;

    /**
     * @var CurrentYearParser
     */
    protected $currentYearParser;

    /**
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($year)
    {
        $this->validateYear($year);

        // current year vs archive year
        if (date('Y') == $year) {
            return $this->currentYearParser->parse();
        } else {
            return $this->archiveYearParser->parse($year);
        }
    }

    /**
     * Builds parsers.
     */
    public function __construct()
    {
        $parserConfig = $this->getParserConfig();
        $this->archiveYearParser = new ArchiveYearParser($this, $parserConfig);
        $this->currentYearParser = new CurrentYearParser($this, $parserConfig);
    }
}