<?php

namespace MoLottery\Provider;

use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\BST\BSTProvider;

/**
 * Starting point for available provider discovery. Use it to fetch and inspect them.
 */
class ProviderRepository
{
    /**
     * @var array
     */
    protected $providers = [];

    /**
     * @param string $providerId
     * @return bool
     */
    public function hasProvider($providerId)
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
     * Instantiates available providers.
     *
     * @param ManagerRepository $managerRepository
     */
    public function __construct(ManagerRepository $managerRepository)
    {
        $providers = [
            new BSTProvider()
        ];

        // index providers by their ids internally
        foreach ($providers as $provider) {
            $this->providers[$provider->getId()] = $provider;
        }
    }
}