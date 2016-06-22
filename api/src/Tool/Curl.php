<?php

namespace MoLottery\Tool;

trait Curl
{
    /**
     * @param string $url
     * @param array $post Default: array().
     * @return string
     */
    protected function curlPost($url, array $post = array())
    {
        $curl = curl_init();

        // build post string
        $postData = array();
        foreach ($post as $field => $value) {
            $postData[] = sprintf('%s=%s', $field, urlencode($value));
        }

        // set options
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, count($post));
        curl_setopt($curl, CURLOPT_POSTFIELDS, implode('&', $postData));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // execute post
        $result = curl_exec($curl);

        // close connection
        curl_close($curl);

        return (false === $result) ? '' : $result;
    }
}