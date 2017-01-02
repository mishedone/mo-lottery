<?php

namespace MoLottery\Provider\BST\Parser;

use MoLottery\Exception\ParseException;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Provider\BST\AbstractBSTGame;
use MoLottery\Provider\BST\AbstractParserConfig;
use MoLottery\Tool\Clean;
use MoLottery\Tool\Curl;

/**
 * Bulgarian Sport Totalizator current year draws parser.
 *
 * Those draws are stored on the BST website pages - scattered through the html. This class makes some ajax requests
 * to extract all necessary data and return it in a unified format.
 */
class CurrentYearParser
{
    use Clean, Curl;

    /**
     * @var AbstractBSTGame
     */
    private $game;

    /**
     * @var AbstractParserConfig
     */
    private $config;

    /**
     * @param AbstractBSTGame $game
     */
    public function __construct(AbstractBSTGame $game)
    {
        $this->game = $game;
        $this->config = $game->getParserConfig();
    }

    /**
     * @param int $year
     * @return array
     */
    public function parse($year)
    {
        // load manager
        $parseManager = ManagerRepository::get()->getParseManager(
            $this->game->getId(),
            $year
        );
        $parses = $parseManager->get();
        
        // parse
        $draws = [];
        foreach ($this->parseDrawNames($year) as $name) {
            if (!isset($parses[$name])) {
                $parses[$name] = $this->parseDraws($name);
            }
            foreach ($parses[$name] as $draw) {
                $draws[] = $draw;
            }
        }
        
        // cache parses
        $parseManager->set($parses);

        return $draws;
    }

    /**
     * Extracts all available draw names for the current year.
     *
     * @param int $year
     * @return array
     */
    private function parseDrawNames($year)
    {
        $html = file_get_contents($this->config->getDrawPageUrl());

        $selectOptions = [];
        preg_match('/<select name="drawing".*?>(?<options>.*)<\/select>/s', $html, $selectOptions);

        $drawNames = [];
        preg_match_all('/value="(?<names>.*?)"/s', $selectOptions['options'], $drawNames);

        // reorder matched draw names in ascending order
        $drawNames = array_slice($drawNames['names'], 2);
        krsort($drawNames);
        $drawNames = array_values($drawNames);

        return array_filter($drawNames, function ($name) use ($year) {
            return (substr($name, 0, 4) == $year);
        });
    }

    /**
     * Extracts the numbers in a certain draw from it's dedicated web page.
     *
     * @param string $name
     * @return array
     * @throws ParseException
     */
    private function parseDraws($name)
    {
        $html = $this->curlPost($this->config->getDrawPageUrl(), array(
            'drawing' => $name
        ));
        
        $form = [];
        preg_match('/<form(.*)<\/form>/s', $html, $form);

        $numbers = [];
        preg_match_all('/images\/classic\/balls\/(?<numbers>\d*)\./s', $form[0], $numbers);

        $numbers = $this->cleanNumbers($numbers['numbers']);
        $drawSize = $this->game->getDrawSize();
        $draws = array_chunk($numbers, $drawSize);
        foreach ($draws as $numbersInDraw) {
            if (count($numbersInDraw) != $drawSize) {
                throw ParseException::wrongNumberCount(count($numbersInDraw), $drawSize, implode(',', $numbersInDraw));
            }
        }

        return $draws;
    }
}