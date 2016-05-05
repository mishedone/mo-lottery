<?php

namespace MoLottery\Provider\Parser;

use MoLottery\Exception\Exception;
use MoLottery\Tool\Clean;

/**
 * Bulgarian Sport Totalizator archived year editions parser.
 *
 * Those editions are stored on the BST website as text files with varying formats from year to year. This class is
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
        $archiveEditions = file_get_contents(sprintf(
            'http://www.toto.bg/files/tiraji/649_%s.txt',
            ($year < 2005) ? substr($year, 2) : $year
        ));

        $editions = array();
        foreach (explode("\n", $archiveEditions) as $rawEdition) {
            $rawEdition = trim($rawEdition);

            // skip empty rows
            if (empty($rawEdition)) {
                continue;
            }

            // remove spaces after commas, remove leading nonsense, trim
            $rawEdition = preg_replace('/,\s{1,}/', ',', $rawEdition);
            $rawEdition = preg_replace('/^.*?[,\-\s]/', '', $rawEdition);
            $rawEdition = trim($rawEdition);

            // split row into sections of numbers
            $sections = preg_split('/\s{1,}/', $rawEdition);
            foreach ($sections as $section) {
                $numbers = explode(',', $section);
                if (count($numbers) != 6) {
                    throw Exception::parsedWrongNumberCount(count($numbers), 6, $section);
                }

                $editions[] = $this->cleanNumbers($numbers);
            }
        }

        return $editions;
    }
}