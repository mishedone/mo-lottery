<?php

namespace MoLottery\Provider\BST\Parser;

use MoLottery\Exception\ParseException;
use MoLottery\Provider\BST\AbstractBSTGame;
use MoLottery\Provider\BST\AbstractParserConfig;

/**
 * Bulgarian Sport Totalizator abstract parser.
 *
 * Common interface / functionality shared between the concrete implementations.
 */
abstract class AbstractParser
{
    /**
     * @var AbstractBSTGame
     */
    protected $game;

    /**
     * @var AbstractParserConfig
     */
    protected $config;

    /**
     * @param AbstractBSTGame $game
     */
    public function __construct(AbstractBSTGame $game)
    {
        $this->game = $game;
        $this->config = $game->getParserConfig();
    }

    /**
     * Validates the eligibility of a sequence of numbers for the current game.
     *
     * @param array $numbers
     * @param string $context
     * @throws ParseException
     */
    protected function validateNumbers($numbers, $context)
    {
        $drawSize = $this->game->getDrawSize();
        if (count($numbers) != $drawSize) {
            throw ParseException::wrongNumberCount(count($numbers), $drawSize, $context);
        }
    }
}