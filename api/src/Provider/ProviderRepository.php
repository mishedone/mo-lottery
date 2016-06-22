<?php

namespace MoLottery\Provider;

use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\AbstractProvider;
use MoLottery\Provider\BST\BSTProvider;

/**
 * Starting point for available provider discovery. Use it to fetch and inspect them.
 */
class ProviderRepository
{
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
     * @return array
     */
    public function getProviders()
    {
        return $this->providers;
    }
    
    /**
     * Builds an array with simple data about the providers and their games.
     *
     * @return array
     */
    public function getProvidersData()
    {
        $result = [];
        foreach ($this->getProviders() as $provider) {
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
     * Instantiates available providers.
     *
     * @param ManagerRepository $managerRepository
     */
    public function __construct(ManagerRepository $managerRepository)
    {
        $this->addProvider(new BSTProvider());
    }
}