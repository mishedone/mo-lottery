<?php

namespace MoLottery\Provider\BST;

use MoLottery\Provider\AbstractProvider;
use MoLottery\Provider\BST\Game649\Game649;

/**
 * Bulgarian Sport Totalizator data provider.
 */
class BSTProvider extends AbstractProvider
{
    /**
     * @return string
     */
    public function getId()
    {
        return 'bst';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'Bulgarian Sport Totalizator';
    }

    /**
     * Instantiates available games.
     */
    public function __construct()
    {
        $games = [
            new Game649()
        ];

        // index games by their ids internally
        foreach ($games as $game) {
            $this->games[$game->getId()] = $game;
        }
    }
}