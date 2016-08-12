<?php

namespace MoLottery\Provider\BST;

use MoLottery\Provider\AbstractProvider;
use MoLottery\Provider\BST\Game535\Game535;
use MoLottery\Provider\BST\Game642\Game642;
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
        $this->addGame(new Game535());
        $this->addGame(new Game642());
        $this->addGame(new Game649());
    }
}