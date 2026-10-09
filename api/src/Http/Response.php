<?php

namespace MoLottery\Http;

/**
 * A set of useful methods for creating http responses.
 */
class Response
{
    /**
     * @var int
     */
    protected $status;

    /**
     * @var array|null
     */
    protected $body;

    /**
     * @param int $status
     * @param array|null $body
     */
    public function __construct($status = 204, $body = NULL)
    {
        $this->status = $status;
        $this->body = $body;
    }

    /**
     * @return void
     */
    public function render()
    {
        http_response_code($this->status);
        if (!is_null($this->body)) {
            header('Content-Type: application/json');
            echo json_encode($this->body);
        }
        exit;
    }
}