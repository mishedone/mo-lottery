<?php

namespace MoLottery\Controller;

use MoLottery\Exception\NotFoundException;
use MoLottery\Provider\ProviderRepository;
use MoLottery\Tool\GameHash;

/**
 * Builds data for the available endpoints.
 */
class Controller
{
    use GameHash;
    
    /**
     * @var ProviderRepository
     */
    private $providerRepository;
    
    /**
     * @param ProviderRepository $providerRepository
     */
    public function __construct(ProviderRepository $providerRepository)
    {
        $this->providerRepository = $providerRepository;
    }
    
    /**
     * Builds an array with simple data about the available games based on providers.
     *
     * @return array
     */
    public function getGames()
    {
        $result = [];
        $providers = $this->providerRepository->getProviders();
        foreach ($providers as $provider) {
            foreach ($provider->getGames() as $game) {
                $result[] = [
                    // do not get confused - id here is game hash
                    // api consumers should not be aware of internals
                    'id' => $this->buildGameHash($provider->getId(), $game->getId()),
                    'name' => sprintf('%s - %s', $provider->getName(), $game->getName()),
                    'drawSize' => $game->getDrawSize(),
                    'numbers' => $game->getNumbers(),
                    'years' => $game->getYears()
                ];
            }
        }
        
        return $result;
    }
    
    /**
     * @param string $gameHash
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($gameHash, $year)
    {
        list($providerId, $gameId) = $this->parseGameHash($gameHash);
        $draws = $this->providerRepository->getDraws($providerId, $gameId, $year);

        $result = [];
        foreach ($draws as $draw) {
            $result[] = ['draw' => $draw];
        }

        return $result;
    }
}