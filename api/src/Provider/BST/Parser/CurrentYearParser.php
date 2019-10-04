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
        foreach ($this->parseDrawUrls($year) as $url) {
            if (!isset($parses[$url])) {
                $parses[$url] = $this->parseDraws($url);
            }
            foreach ($parses[$url] as $draw) {
                $draws[] = $draw;
            }
        }
        
        // cache parses
        $parseManager->set($parses);

        return $draws;
    }

    /**
     * Extracts all available draw URLs for the current year.
     *
     * @param int $year
     * @return array
     */
    private function parseDrawUrls($year)
    {
        $html = file_get_contents($this->config->getDrawPageUrl());

        $listItems = [];
        preg_match('/<ul[^>]*aria-labelledby="tiraj_list">(?<items>.*?)<\/ul>/s', $html, $listItems);

        $drawUrls = [];
        preg_match_all('/href="(?<urls>.*?)"/s', $listItems['items'], $drawUrls);

        // reorder matched draw URLs in ascending order
        $drawUrls = $drawUrls['urls'];
        sort($drawUrls);

        // make sure the draw URL is for the year in question
        return array_filter($drawUrls, function ($name) use ($year) {
            return (strpos($name, $year) !== false);
        });
    }

    /**
     * Extracts the numbers in a certain draw from it's dedicated web page.
     *
     * @param string $drawUrl
     * @return array
     * @throws ParseException
     */
    private function parseDraws($drawUrl)
    {
        $html = file_get_contents($drawUrl);
        print($html);
        exit();
        
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