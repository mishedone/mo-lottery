<?php

namespace MoLottery\Provider\BST;

use MoLottery\Exception\NotFoundException;
use MoLottery\Manager\ManagerRepository;
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
        
        // load managers
        $drawManager = ManagerRepository::get()->getDrawManager(
            $this->getId(), $year
        );
        $lastParseManager = ManagerRepository::get()->getLastParseManager();
        
        // handle current year vs archive year
        if (date('Y') == $year) {
            if (!$lastParseManager->has($this->getId())) {
                $drawManager->set($this->currentYearParser->parse());
                $lastParseManager->set($this->getId(), new \DateTime());
            }
        } else {
            if (!$drawManager->has()) {
                $drawManager->set($this->archiveYearParser->parse($year));
            }
        }
        
        return $drawManager->get();
    }

    /**
     * Builds parsers.
     */
    public function __construct()
    {
        $this->archiveYearParser = new ArchiveYearParser($this);
        $this->currentYearParser = new CurrentYearParser($this);
    }
}