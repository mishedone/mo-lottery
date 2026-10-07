<?php

namespace MoLottery\Exception;

/**
 * Draw related exceptions.
 */
class DrawException extends \Exception
{
    /**
     * @param int $count
     * @param int $expectedCount
     * @param array $draws
     * @return DrawException
     */
    static public function wrongDrawCount($count, $expectedCount, $draws)
    {
        return new DrawException(sprintf(
            'Draw error: wrong draw count (%d/%d) in draws "%s".',
            $count,
            $expectedCount,
            json_encode($draws)
        ));
    }

    /**
     * @param int $count
     * @param int $expectedCount
     * @param array $draw
     * @return DrawException
     */
    static public function wrongDrawSize($count, $expectedCount, $draw)
    {
        return new DrawException(sprintf(
            'Draw error: wrong draw size (%d/%d) in draw "%s".',
            $count,
            $expectedCount,
            json_encode($draw)
        ));
    }

    /**
     * @param int $number
     * @param array $draw
     * @return DrawException
     */
    static public function wrongNumberInDraw($number, $draw)
    {
        return new DrawException(sprintf(
            'Draw error: wrong number (%d) in draw "%s".',
            $number,
            json_encode($draw)
        ));
    }
}