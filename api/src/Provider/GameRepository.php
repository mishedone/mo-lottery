<?php

namespace MoLottery\Provider;

use MoLottery\Exception\NotFoundException;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\ACME\ACMEProvider;
use MoLottery\Provider\BST\BSTProvider;

/**
 * Starting point for available provider and game discovery. Use it to fetch and inspect.
 */
class GameRepository
{
    /**
     * @const GAME_HASH_SEPARATOR Separator for building game hashes (provider id - game id pair).
     */
    const GAME_HASH_SEPARATOR = '-';

    /**
     * @var ManagerRepository
     */
    private $managerRepository;

    /**
     * @var array
     */
    private $providers = [];
    
    /**
     * @param AbstractProvider $provider
     */
    private function addProvider(AbstractProvider $provider)
    {
        $this->providers[$provider->getId()] = $provider;
    }

    /**
     * @param string $providerId
     * @return bool
     */
    private function hasProvider($providerId)
    {
        return array_key_exists($providerId, $this->providers);
    }
    
    /**
     * @param string $providerId
     * @return AbstractProvider
     * @throws NotFoundException
     */
    private function getProvider($providerId)
    {
        if (!$this->hasProvider($providerId)) {
            throw NotFoundException::notFound(sprintf(
                'no provider with id "%s"',
                $providerId
            ));
        }
        
        return $this->providers[$providerId];
    }

    /**
     * @param string $providerId
     * @param string $gameId
     * @return string
     */
    private function getGameHash($providerId, $gameId)
    {
        return sprintf('%s%s%s', $providerId, self::GAME_HASH_SEPARATOR, $gameId);
    }

    /**
     * @param string $gameHash
     * @return array
     */
    private function parseGameHash($gameHash)
    {
        return explode(self::GAME_HASH_SEPARATOR, $gameHash);
    }

    /**
     * Instantiates available providers.
     *
     * @param ManagerRepository $managerRepository
     */
    public function __construct(ManagerRepository $managerRepository)
    {
        $this->managerRepository = $managerRepository;

        $this->addProvider(new ACMEProvider());
        $this->addProvider(new BSTProvider());
    }
    
    /**
     * Builds an array with simple data about the available games.
     *
     * @return array
     */
    public function getGames()
    {
        $result = [];
        foreach ($this->providers as $provider) {
            foreach ($provider->getGames() as $game) {
                $result[] = [
                    // do not get confused - id here is game hash actually, api consumers should not be aware of internals
                    'id' => $this->getGameHash($provider->getId(), $game->getId()),
                    'name' => sprintf('%s - %s', $provider->getName(), $game->getName())
                ];
            }
        }
        
        return $result;
    }
    
    /**
     * @param string $gameHash
     * @return array
     * @throws NotFoundException
     */
    public function getYears($gameHash)
    {
        list($providerId, $gameId) = $this->parseGameHash($gameHash);
        $years = $this->getProvider($providerId)
            ->getGame($gameId)
            ->getYears();

        $result = [];
        foreach ($years as $year) {
            $result[] = ['year' => $year];
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

        $game = $this->getProvider($providerId)->getGame($gameId);
        $game->validateYear($year);

        // prepare managers
        $drawManager = $this->managerRepository->getDrawManager($providerId, $gameId);
        $lastParseManager = $this->managerRepository->getLastParseManager();
        $lastParseKey = sprintf('draws-%s-%s', $providerId, $gameId);

        // check current versus archive year
        if (date('Y') == $year) {
            if (!$lastParseManager->hasLastParseToday($lastParseKey)) {
                $drawManager->updateDraws($year, $game->getDraws($year));
                $lastParseManager->setLastParse($lastParseKey, new \DateTime());
            }
        } else {
            if (!$drawManager->hasDraws($year)) {
                $drawManager->updateDraws($year, $game->getDraws($year));
            }
        }

        return $drawManager->getDraws($year);
    }
}