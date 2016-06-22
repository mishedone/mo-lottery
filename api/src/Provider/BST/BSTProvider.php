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
        $this->addGame(new Game649());
    }
}