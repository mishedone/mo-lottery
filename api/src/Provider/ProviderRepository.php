<?php

namespace MoLottery\Provider;

use MoLottery\Exception\NotFoundException;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\ACME\ACMEProvider;
use MoLottery\Provider\BST\BSTProvider;

/**
 * Starting point for available provider discovery. Use it to fetch and inspect them.
 */
class ProviderRepository
{
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
     * Builds an array with simple data about the providers and their games.
     *
     * @return array
     */
    public function getProviders()
    {
        $result = [];
        foreach ($this->providers as $provider) {
            $result[] = [
                'id' => $provider->getId(),
                'name' => $provider->getName(),
                'games' => array_map(function ($game) {
                    return [
                        'id' => $game->getId(),
                        'name' => $game->getName()
                    ];
                }, $provider->getGames())
            ];
        }
        
        return $result;
    }
    
    /**
     * @param string $providerId
     * @param string $gameId
     * @return array
     * @throws NotFoundException
     */
    public function getYears($providerId, $gameId)
    {
        return $this->getProvider($providerId)
            ->getGame($gameId)
            ->getYears();
    }
    
    /**
     * @param string $providerId
     * @param string $gameId
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getDraws($providerId, $gameId, $year)
    {
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