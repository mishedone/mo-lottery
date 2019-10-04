<?php

namespace MoLottery\Provider\BST\Parser;

use MoLottery\Exception\ParseException;
use MoLottery\Provider\BST\AbstractBSTGame;
use MoLottery\Provider\BST\AbstractParserConfig;
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
        $archiveDraws = file_get_contents($this->config->getArchiveUrl($year));
        if ($year >= 2018) {
            return $this->parseDrawsSince2018($archiveDraws);
        }
        return $this->parseDrawsTill2018($archiveDraws);
    }

    /**
     * @param string $archiveDraws
     * @return array
     * @throws ParseException
     */
    private function parseDrawsTill2018($archiveDraws)
    {
        $draws = array();
        foreach (explode("\n", $archiveDraws) as $rawDraw) {
            $rawDraw = trim($rawDraw);

            // skip empty rows
            if (empty($rawDraw)) {
                continue;
            }

            // fix specific game raw draws with typos
            $rawDraw = $this->fixRawDrawTypos($rawDraw);

            // remove spaces after commas, remove leading nonsense, trim
            $rawDraw = preg_replace('/,\s{1,}/', ',', $rawDraw);
            $rawDraw = preg_replace('/^.*?[,\-\s]/', '', $rawDraw);
            $rawDraw = trim($rawDraw);

            // split row into sections of numbers
            $sections = preg_split('/\s{1,}/', $rawDraw);
            foreach ($sections as $section) {
                $numbers = explode(',', $section);
                $this->validateNumbers($numbers, $section);
                $draws[] = $this->cleanNumbers($numbers);
            }
        }

        return $draws;
    }

    /**
     * @param string $archiveDraws
     * @return array
     * @throws ParseException
     */
    private function parseDrawsSince2018($archiveDraws)
    {
        $draws = array();
        $matches = array();
        preg_match_all('/^.*:(.*)$/m', $archiveDraws, $matches);
        foreach ($matches[1] as $rawDraw) {
            $rawDraw = trim($rawDraw);
            $numbers = explode(' ', $rawDraw);
            $this->validateNumbers($numbers, $rawDraw);
            $draws[] = $this->cleanNumbers($numbers);
        }

        return $draws;
    }

    /**
     * Validates the eligibility of a sequence of numbers for the current game.
     *
     * @param array $numbers
     * @param string $context
     * @throws ParseException
     */
    private function validateNumbers($numbers, $context)
    {
        $drawSize = $this->game->getDrawSize();
        if (count($numbers) != $drawSize) {
            throw ParseException::wrongNumberCount(count($numbers), $drawSize, $context);
        }
    }

    /**
     * @param string $rawDraw
     * @return string
     */
    private function fixRawDrawTypos($rawDraw)
    {
        foreach ($this->config->getReplacements() as $search => $replace) {
            if ($rawDraw == $search) {
                $rawDraw = $replace;
            }
        }

        return $rawDraw;
    }
}
