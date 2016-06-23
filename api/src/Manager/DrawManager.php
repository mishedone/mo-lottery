<?php

namespace MoLottery\Manager;

/**
 * Manages data access to the available draws.
 */
class DrawManager extends AbstractManager
{
    /**
     * @var string
     */
    protected $file = '';

    /**
     * @var array
     */
    private $draws = array();

    /**
     * @param string $dataPath
     * @param string $providerId
     * @param string $gameId
     */
    public function __construct($dataPath, $providerId, $gameId)
    {
        parent::__construct($dataPath);
        $this->file = sprintf('draws-%s-%s.json', $providerId, $gameId);
        $this->draws = $this->readData();
    }

    /**
     * @param int $year
     * @return bool
     */
    public function hasDraws($year)
    {
        return isset($this->draws[(int) $year]);
    }

    /**
     * @param int $year
     * @return array
     */
    public function getDraws($year)
    {
        return $this->hasDraws($year) ? $this->draws[(int) $year] : array();
    }

    /**
     * @param int $year
     * @param array $draws
     */
    public function updateDraws($year, array $draws)
    {
        $this->draws[(int) $year] = $draws;
        $this->saveData($this->draws);
    }
}