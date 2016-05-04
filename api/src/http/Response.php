<?php

namespace MoLottery\Http;

/**
 * A set of useful methods for creating http responses.
 */
class Response
{
    /**
     * Shows 404 page.
     */
    public function render404()
    {
        header('HTTP/1.0 404 Not Found');
        exit;
    }

    /**
     * Shows a JSON page.
     *
     * @param array $data
     */
    public function renderJson(array $data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}