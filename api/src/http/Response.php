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
     */
    public function renderJson(array $data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    /**
     * @param string $errorMessage
     */
    public function renderJsonServerError($errorMessage)
    {
        header($this->getStatusString('500 Internal Server Error'), true, 500);
        $this->renderJson(array('error' => $errorMessage));
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