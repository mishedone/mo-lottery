<?php

namespace MoLottery\Provider;

/**
 * The base of all supported providers. Contains the common and important properties like id, name and supported games.
 */
abstract class AbstractProvider
{
    /**
     * @var array
     */
    protected $games = [];

    /**
     * @return string
     */
    abstract public function getId();

    /**
     * @return string
     */
    abstract public function getName();

    /**
     * @return array
     */
    public function getGames()
    {
        return $this->games;
    }

    public function hasGame($game)
    {

    }

    public function getYears($game)
    {

    }
}