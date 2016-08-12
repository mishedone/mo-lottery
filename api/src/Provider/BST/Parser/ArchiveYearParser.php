<?php

namespace MoLottery\Provider\BST\Parser;

use MoLottery\Exception\ParseException;
use MoLottery\Provider\AbstractGame;
use MoLottery\Tool\Clean;

/**
 * Bulgarian Sport Totalizator archived year draws parser.
 *
 * Those draws are stored on the BST website as text files with varying formats from year to year. This class is
 * trying to unify the differences by producing consistent output.
 */
class ArchiveYearParser
{
    use Clean;

    /**
     * @var AbstractGame
     */
    private $game;

    /**
     * @param AbstractGame $game
     */
    public function __construct(AbstractGame $game)
    {
        $this->game = $game;
    }
    
    /**
     * @param int $year
     * @return array
     * @throws ParseException
     */
    public function parse($year)
    {
        $archiveDraws = file_get_contents(sprintf(
            'http://www.toto.bg/files/tiraji/%s_%s.txt',
            $this->game->getId(),
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
                $drawSize = $this->game->getDrawSize();
                if (count($numbers) != $drawSize) {
                    throw ParseException::wrongNumberCount(count($numbers), $drawSize, $section);
                }

                $draws[] = $this->cleanNumbers($numbers);
            }
        }

        return $draws;
    }
}