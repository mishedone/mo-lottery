<?php

namespace MoLottery\Provider;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\AbstractGame;

/**
 * The base of all supported providers. Contains the common and important properties like id, name and supported games.
 */
abstract class AbstractProvider
{
    /**
     * @return string
     */
    abstract public function getId();

    /**
     * @return string
     */
    abstract public function getName();
    
    /**
     * @var array
     */
    protected $games = [];
    
    /**
     * @param AbstractGame $game
     */
    protected function addGame(AbstractGame $game)
    {
        $this->games[$game->getId()] = $game;
    }
    
    /**
     * @param string $gameId
     * @return bool
     */
    protected function hasGame($gameId)
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
        return array_values($this->games);
    }
}