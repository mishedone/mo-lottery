<?php

namespace MoLottery\Provider;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\BST\Game535\Game535;
use MoLottery\Provider\BST\Game642\Game642;
use MoLottery\Provider\BST\Game649\Game649;

/**
 * Starting point for available game discovery. Use it to fetch and inspect.
 */
class GameRepository
{
    /**
     * @var array
     */
    private $games = [];
    
    /**
     * @param AbstractGame $game
     */
    private function addGame(AbstractGame $game)
    {
        $this->games[$game->getId()] = $game;
    }

    /**
     * @param string $gameId
     * @return bool
     */
    private function hasGame($gameId)
    {
        return array_key_exists($gameId, $this->games);
    }
    
    /**
     * @param string $gameId
     * @return AbstractGame
     * @throws NotFoundException
     */
    public function getGame($gameId)
    {
        if (!$this->hasGame($gameId)) {
            throw NotFoundException::notFound(sprintf(
                'no game with id "%s"',
                $gameId
            ));
        }
        
        return $this->games[$gameId];
    }
    
    /**
     * @return array
     */
    public function getGames()
    {
        return $this->games;
    }

    /**
     * Instantiates available providers.
     */
    public function __construct()
    {
        $this->addGame(new Game535());
        $this->addGame(new Game642());
        $this->addGame(new Game649());
    }
}