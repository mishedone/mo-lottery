<?php

namespace MoLottery\Provider\Parser;

use MoLottery\Exception\Exception;
use MoLottery\Tool\Clean;

/**
 * Bulgarian Sport Totalizator archived year draws parser.
 *
 * Those draws are stored on the BST website as text files with varying formats from year to year. This class is
 * trying to unify the differences by producing consistent output.
 */
class BSTArchiveYearParser
{
    use Clean;

    /**
     * @param int $year
     * @return array
     * @throws Exception
     */
    public function parse($year)
    {
        $archiveDraws = file_get_contents(sprintf(
            'http://www.toto.bg/files/tiraji/649_%s.txt',
            ($year < 2005) ? substr($year, 2) : $year
        ));

        $draws = array();
        foreach (explode("\n", $archiveDraws) as $rawDraw) {
            $rawDraw = trim($rawDraw);

            // skip empty rows
            if (empty($rawDraw)) {
                continue;
            }

            // remove spaces after commas, remove leading nonsense, trim
            $rawDraw = preg_replace('/,\s{1,}/', ',', $rawDraw);
            $rawDraw = preg_replace('/^.*?[,\-\s]/', '', $rawDraw);
            $rawDraw = trim($rawDraw);

            // split row into sections of numbers
            $sections = preg_split('/\s{1,}/', $rawDraw);
            foreach ($sections as $section) {
                $numbers = explode(',', $section);
                if (count($numbers) != 6) {
                    throw Exception::parsedWrongNumberCount(count($numbers), 6, $section);
                }

                $draws[] = $this->cleanNumbers($numbers);
            }
        }

        return $draws;
    }
}