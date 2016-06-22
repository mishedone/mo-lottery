<?php

namespace MoLottery\Exception;

/**
 * Parsing some text exceptions.
 */
class ParseException extends \Exception
{
    /**
     * @param int $count
     * @param int $expectedCount
     * @param string $parsedText
     * @return ParseException
     */
    static public function wrongNumberCount($count, $expectedCount, $parsedText)
    {
        return new ParseException(sprintf(
            'Parsed wrong number count (%d/%d) in "%s".',
            $count,
            $expectedCount,
            $parsedText
        ));
    }
}