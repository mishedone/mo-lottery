<?php

namespace MoLottery\Provider\BST\Parser;

use DOMDocument;
use DOMXPath;
use MoLottery\Manager\ManagerRepository;
use MoLottery\Tool\Clean;

/**
 * Bulgarian Sport Totalizator current year draws parser.
 *
 * Those draws are stored on the BST website pages - scattered through the html. This class makes some ajax requests
 * to extract all necessary data and return it in a unified format.
 */
class CurrentYearParser extends AbstractParser
{
    use Clean;

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
        
        // parse missing draws
        foreach ($this->parseDrawUrls($year) as $url) {
            if (!isset($parses[$url])) {
                $parses[$url] = $this->parseDraws($url);
                sleep(3);
            }
        }
        uksort($parses, 'strnatcmp');

        // collect all draws (including old ones that are not available on the web anymore)
        $draws = [];
        foreach ($parses as $url => $parseDraws) {
            foreach ($parseDraws as $draw) {
                $draws[] = $draw;
            }
        }
        
        // cache parses
        $parseManager->set($parses);

        return $draws;
    }

    /**
     * Makes an HTTP request to a given URL and returns the response body.
     *
     * @param string $url
     * @return string
     */
    private function scrapeHtmlPage($url)
    {
        $headers = [
            'User-Agent: MyBot/1.0',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
            'Accept-Encoding: gzip, deflate',
            'Connection: keep-alive',
            'Referer: https://info.toto.bg/',
            'Upgrade-Insecure-Requests: 1',
        ];
        $opts = [
            'http' => [
                'method'  => 'GET',
                'header'  => implode("\r\n", $headers),
                'timeout' => 10,
            ]
        ];
        $context = stream_context_create($opts);
        $content = file_get_contents($url, false, $context);

        return gzdecode($content);
    }

    /**
     * Extracts all available draw URLs for the current year.
     *
     * @param int $year
     * @return array
     */
    private function parseDrawUrls($year)
    {
        $html = $this->scrapeHtmlPage($this->config->getDrawPageUrl());

        $listItems = [];
        preg_match('/<ul[^>]*aria-labelledby="tiraj_list">(?<items>.*?)<\/ul>/s', $html, $listItems);

        $drawUrls = [];
        preg_match_all('/href="(?<urls>.*?)"/s', $listItems['items'], $drawUrls);

        // reorder matched draw URLs in ascending order
        $drawUrls = $drawUrls['urls'];
        natsort($drawUrls);

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
     */
    private function parseDraws($drawUrl)
    {
        $draws = [];
        $html = $this->scrapeHtmlPage($drawUrl);
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $finder = new DOMXPath($dom);

        // find number containers and extract numbers from the balls inside
        $containers = $finder->query("//div[contains(@class, 'tir_numbers')]");
        foreach ($containers as $container) {
            $numbers = [];
            foreach ($container->getElementsByTagName('span') as $span) {
                $numbers[] = $span->textContent;
            }

            // clean up and validation
            $numbers = $this->cleanNumbers($numbers);
            $this->validateNumbers($numbers, $container->textContent);

            $draws[] = $numbers;
        }

        return $draws;
    }
}