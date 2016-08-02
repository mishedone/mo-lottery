<?php

namespace MoLottery\Manager;

/**
 * Common manager tools.
 */
abstract class AbstractManager
{
    /**
     * @var string
     */
    protected $file = '_.json';

    /**
     * @var string
     */
    protected $dataPath = '';

    /**
     * @param string $dataPath
     */
    public function __construct($dataPath)
    {
        $this->dataPath = $dataPath;
    }

    /**
     * @return string
     */
    protected function getFilePath()
    {
        return $this->dataPath . DIRECTORY_SEPARATOR . $this->file;
    }
    
    /**
     * @return bool
     */
    protected function hasData()
    {
        return file_exists($this->getFilePath());
    }

    /**
     * @return array
     */
    protected function readData()
    {
        if (!$this->hasData()) {
            return array();
        }

        return json_decode(file_get_contents($this->getFilePath()), true);
    }

    /**
     * @param array $data
     */
    protected function saveData(array $data)
    {
        if ($this->readData() !== $data) {
            file_put_contents($this->getFilePath(), json_encode($data));
        }
    }
}