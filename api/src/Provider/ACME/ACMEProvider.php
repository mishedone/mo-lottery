<?php

namespace MoLottery\Provider\ACME;

use MoLottery\Provider\AbstractProvider;
use MoLottery\Provider\ACME\GameRocket\GameRocket;

/**
 * ACME data provider.
 */
class ACMEProvider extends AbstractProvider
{
    /**
     * @return string
     */
    public function getId()
    {
        return 'acme';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ACME';
    }

    /**
     * Instantiates available games.
     */
    public function __construct()
    {
        $this->addGame(new GameRocket());
    }
}