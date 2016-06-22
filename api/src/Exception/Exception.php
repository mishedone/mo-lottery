<?php

namespace MoLottery\Exception;

/**
 * Custom exceptions factory - let's try to unify exception creation.
 */
class Exception extends \Exception
{
    /**
     * @param int $numberCount
     * @param int $expectedNumberCount
     * @param string $parsedText
     * @return Exception
     */
    static public function parsedWrongNumberCount($numberCount, $expectedNumberCount, $parsedText)
    {
        return new Exception(sprintf(
            'Parsed wrong number count (%d/%d) in "%s".',
            $numberCount,
            $expectedNumberCount,
            $parsedText
        ));
    }
}