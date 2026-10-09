<?php

namespace MoLottery\Provider;

use MoLottery\Exception\AlreadyExistsException;
use MoLottery\Exception\DrawException;
use MoLottery\Exception\NotFoundException;
use MoLottery\Manager\ManagerRepository;

/**
 * Base for all game classes providing the common interface / functionality.
 */
abstract class AbstractGame
{
    /**
     * @return string
     */
    abstract public function getId();

    /**
     * @return string
     */
    abstract public function getName();

    /**
     * @return int
     */
    abstract public function getDrawSize();
    
    /**
     * @param int $year
     * @return array
     */
    abstract public function getDraws($year);

    /**
     * @return int
     */
    abstract public function getPossibleDraws();

    /**
     * @return int
     */
    abstract public function getHotColdTrendDrawsPerPeriod();

    /**
     * @return int
     */
    abstract public function getDrawsPerRound();
    
    /**
     * @return int
     */
    abstract public function getDrawsPerWeek();

    /**
     * @var array
     */
    protected $numbers = [];

    /**
     * @return array
     */
    public function getNumbers()
    {
        return $this->numbers;
    }

    /**
     * @param int $number
     * @return bool
     */
    protected function hasNumber($number)
    {
        return in_array((int) $number, $this->numbers);
    }

    /**
     * @var array
     */
    protected $years = [];

    /**
     * @param int $year
     * @return bool
     */
    protected function hasYear($year)
    {
        return in_array((int) $year, $this->years);
    }
    
    /**
     * @param int $year
     * @throws NotFoundException
     */
    public function validateYear($year)
    {
        if (!$this->hasYear($year)) {
            throw NotFoundException::notFound(sprintf(
                'game "%s" has no year like "%d"',
                $this->getId(),
                $year
            ));
        }
    }

    /**
     * @return array
     */
    public function getYears()
    {
        return $this->years;
    }

    /**
     * @param array $draws
     * @throws DrawException
     */
    public function validateDraws($draws)
    {
        if (count($draws) != $this->getDrawsPerRound()) {
            throw DrawException::wrongDrawCount(sprintf(
                count($draws),
                $this->getDrawsPerRound(),
                $draws
            ));
        }

        foreach ($draws as $draw) {
            $this->validateDraw($draw);
        }
    }

    /**
     * @param array $draws
     * @throws DrawException
     */
    protected function validateDraw($draw)
    {
        if (count($draw) != $this->getDrawSize()) {
            throw DrawException::wrongDrawSize(sprintf(
                count($draw),
                $this->getDrawSize(),
                $draw
            ));
        }

        foreach ($draw as $number) {
            if (!$this->hasNumber($number)) {
                throw DrawException::wrongNumberInDraw(sprintf(
                    $number,
                    $draw
                ));
            }
        }
    }

    /**
     * @param int $year
     * @return array
     * @throws NotFoundException
     */
    public function getParses($year)
    {
        $this->validateYear($year);

        $parseManager = ManagerRepository::get()->getParseManager(
            $this->getId(), $year
        );

        return $parseManager->get();
    }

    /**
     * @param int $year
     * @param string $url
     * @param array $draws
     * @throws AlreadyExistsException
     * @throws NotFoundException
     */
    public function createParse($year, $url, $draws)
    {
        $this->validateDraws($draws);

        $parses = $this->getParses($year);

        if (array_key_exists($url, $parses)) {
            throw AlreadyExistsException::alreadyExists(sprintf(
                'game "%s" already has parse "%s" in year "%d"',
                $this->getId(),
                $url,
                $year
            ));
        }

        $parses[$url] = $draws;

        $this->saveParses($year, $parses);
        $this->updateDrawsFromParses($year, $parses);
    }

    /**
     * @param int $year
     * @param array $parses
     */
    protected function saveParses($year, $parses)
    {
        $parseManager = ManagerRepository::get()->getParseManager(
            $this->getId(), $year
        );
        $parseManager->set($parses);
    }

    /**
     * @param int $year
     * @param array $parses
     */
    protected function updateDrawsFromParses($year, $parses)
    {
        $drawManager = ManagerRepository::get()->getDrawManager(
            $this->getId(), $year
        );

        // convert parses to flat draws
        $draws = [];
        foreach ($parses as $url => $parseDraws) {
            foreach ($parseDraws as $draw) {
                $draws[] = $draw;
            }
        }

        $drawManager->set($draws);
    }
}