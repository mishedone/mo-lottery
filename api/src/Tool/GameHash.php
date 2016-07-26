<?php

namespace MoLottery\Tool;

trait GameHash
{
    /**
     * @var string Separator for building game hashes (provider id - game id pair).
     */
    protected $gameHashSeparator = '-';
    
    /**
     * @param string $providerId
     * @param string $gameId
     * @return string
     */
    protected function buildGameHash($providerId, $gameId)
    {
        return sprintf('%s%s%s', $providerId, $this->gameHashSeparator, $gameId);
    }

    /**
     * @param string $gameHash
     * @return array
     */
    protected function parseGameHash($gameHash)
    {
        return explode($this->gameHashSeparator, $gameHash);
    }
}