<?php

namespace MoLottery\Controller;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\GameRepository;

/**
 * Builds data for the available endpoints.
 */
class Controller
{
    /**
     * @var GameRepository
     */
    private $gameRepository;
    
    /**
     * @param GameRepository $gameRepository
     */
    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }
    
    /**
     * Builds an array with simple data about the available games.
     *
     * @return array
     */
    public function getGames()
    {
        $result = [];
        foreach ($this->gameRepository->getGames() as $game) {
            $result[] = [
                'id' => $game->getId(),
                'name' => $game->getName(),
                'drawSize' => $game->getDrawSize(),
                'possibleDraws' => $game->getPossibleDraws(),
                'numbers' => $game->getNumbers(),
                'years' => $game->getYears()
            ];
        }
        
        return $result;
    }
    
    /**
     * @param string $gameId
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($gameId, $year)
    {
        $game = $this->gameRepository->getGame($gameId);
        
        return $game->getDraws($year);
    }
}