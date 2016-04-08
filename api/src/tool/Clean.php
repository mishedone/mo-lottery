<?php

namespace MoLottery\Tool;

trait Clean
{
    /**
     * @param array $numbers
     * @return array
     */
    protected function cleanNumbers(array $numbers)
    {
        $clean = array();
        foreach ($numbers as $number) {
            $clean[] = (int) $number;
        }

        return $clean;
    }
}