<?php

namespace MoLottery\Http;

/**
 * A set of useful methods for creating http responses.
 */
class Response
{
    /**
     * @param string $suffix
     * @return string
     */
    private function getStatusString($suffix)
    {
        return $_SERVER['SERVER_PROTOCOL'] . ' ' . $suffix;
    }

    /**
     * @param array $data
     * @param int $status Default: 200. Currently handles the following codes: 500.
     */
    public function renderJson(array $data, $status = 200)
    {
        header('Content-Type: application/json');
        if (500 == $status) {
            header($this->getStatusString('500 Internal Server Error'), true, $status);
        }

        echo json_encode($data);
        exit;
    }

    /**
     * Shows 404 page... That dumb...
     */
    public function render404()
    {
        header($this->getStatusString('404 Not Found'), true, 404);
        exit;
    }
}