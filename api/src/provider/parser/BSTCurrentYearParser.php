<?php

namespace MoLottery\Provider\Parser;

use MoLottery\Exception\Exception;
use MoLottery\Tool\Clean;
use MoLottery\Tool\Curl;

/**
 * Bulgarian Sport Totalizator current year draws parser.
 *
 * Those draws are stored on the BST website pages - scattered through the html. This class makes some ajax requests
 * to extract all necessary data and return it in a unified format.
 */
class BSTCurrentYearParser
{
    use Clean, Curl;

    /**
     * @const DRAW_PAGE_URL Url of the page listing draws for the current year.
     */
    const DRAW_PAGE_URL = 'http://www.toto.bg/index.php?lang=1&pid=32&sid=50';

    /**
     * @return array
     */
    public function parse()
    {
        $draws = array();
        foreach ($this->parseDrawNames() as $name) {
            $draws[] = $this->parseDraw($name);
        }

        return $draws;
    }

    /**
     * Extracts all available draw names for the current year.
     *
     * @return array
     */
    private function parseDrawNames()
    {
        $html = $this->curlPost(static::DRAW_PAGE_URL, array(
            'tir' => date('YEAR') . '/1'
        ));

        $selectOptions = array();
        preg_match('/<select id="tir".*?>(?<options>.*)<\/select>/s', $html, $selectOptions);

        $drawNames = array();
        preg_match_all('/value="(?<names>.*?)"/s', $selectOptions['options'], $drawNames);

        // reorder matched draw names in ascending order
        $drawNames = $drawNames['names'];
        krsort($drawNames);

        return array_values($drawNames);
    }

    /**
     * Extracts the numbers in a certain draw from it's dedicated web page.
     *
     * @param string $name
     * @return array
     * @throws Exception
     */
    private function parseDraw($name)
    {
        $html = $this->curlPost(static::DRAW_PAGE_URL, array(
            'tir' => $name
        ));

        $numbers = array();
        preg_match_all('/images\/balls\/_(?<numbers>\d*)\./s', $html, $numbers);

        $numbers = $numbers['numbers'];
        if (count($numbers) != 6) {
            throw Exception::parsedWrongNumberCount(count($numbers), 6, $html);
        }

        return $this->cleanNumbers($numbers);
    }
}