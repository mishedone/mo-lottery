<?php

namespace MoLottery\Exception;

/**
 * Something already exists exception.
 */
class AlreadyExistsException extends \Exception
{
    /**
     * @param string $what
     * @return AlreadyExistsException
     */
    static public function alreadyExists($what)
    {
        return new AlreadyExistsException(sprintf('Already exists error: %s.', $what));
    }
}