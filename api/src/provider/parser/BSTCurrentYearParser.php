<?php

namespace MoLottery\Provider\Parser;

use MoLottery\Tool\Clean;
use MoLottery\Tool\Curl;

/**
 * Bulgarian Sport Totalizator current year editions parser.
 *
 * Those editions are stored on the BST website pages - scattered through the html. This class makes some ajax requests
 * to extract all necessary data and return it in a unified format.
 */
class BSTCurrentYearParser
{
    use Clean, Curl;

    /**
     * @const EDITION_PAGE_URL Url of the page listing editions for the current year.
     */
    const EDITION_PAGE_URL = 'http://www.toto.bg/index.php?lang=1&pid=32&sid=50';

    /**
     * @return array
     */
    public function parse()
    {
        $editions = array();
        foreach ($this->parseEditionNames() as $name) {
            $editions[] = $this->parseEdition($name);
        }

        return $editions;
    }

    /**
     * Extracts all available edition names for the current year.
     *
     * @return array
     */
    private function parseEditionNames()
    {
        $html = $this->curlPost(static::EDITION_PAGE_URL, array(
            'tir' => date('YEAR') . '/1'
        ));

        $selectOptions = array();
        preg_match('/<select id="tir".*?>(?<options>.*)<\/select>/s', $html, $selectOptions);

        $editionNames = array();
        preg_match_all('/value="(?<names>.*?)"/s', $selectOptions['options'], $editionNames);

        // reorder matched edition names in ascending order
        $editionNames = $editionNames['names'];
        krsort($editionNames);

        return array_values($editionNames);
    }

    /**
     * Extracts the numbers in a certain edition from it's dedicated web page.
     *
     * @param string $name
     * @return array
     */
    private function parseEdition($name)
    {
        $html = $this->curlPost(static::EDITION_PAGE_URL, array(
            'tir' => $name
        ));

        $numbers = array();
        preg_match_all('/images\/balls\/_(?<numbers>\d*)\./s', $html, $numbers);

        $numbers = $numbers['numbers'];
        if (count($numbers) != 6) {
            // TODO: throw proper exception in here
        }

        return $this->cleanNumbers($numbers);
    }
}