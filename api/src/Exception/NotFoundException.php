<?php

namespace MoLottery\Exception;

/**
 * Something was not found exceptions.
 */
class NotFoundException extends \Exception
{
    /**
     * @param string $what
     * @return NotFoundException
     */
    static public function notFound($what)
    {
        return new NotFoundException(sprintf('Not found error: %s.', $what));
    }
}