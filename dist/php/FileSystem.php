<?php


class FileSystem
{
    private $path;
    private $isDir;

    //excluding files
    protected $exclude = ['.', '..'];

    public function __construct($path = './'){
        $this->path = $path;
        $this->isDir = is_dir($path);
    }

    //return array of content of dir
    public function getDirContent(){
        $files = [
            'errors' => '',
            'path' => $this->path,
            'value' => []
        ];

        //if it's not a dir then return error
        if(!$this->isDir) {
            $files['errors'] = 'Only dir may include files';
            return $files;
        }

        $dir = opendir($this->path);

        //read content of dir
        while($file = readdir($dir)){
            if(in_array($file, $this->exclude))
                continue;

            $files['value'][] = $this->getFileInfo($file, ($this->path).$file);
        }

        return $files;
    }

    //return hash table with info about dir item
    protected function getFileInfo($name, $path){
        $fileInfo = [
            'name' => $name,
            'path' => $path
        ];

        //return dir info
        if(is_dir($path)){
            $fileInfo['isDir'] = true;

            return $fileInfo;
        }

        //get type
        $fileInfo['type'] = substr($name, strrpos($name, '.') + 1);

        return $fileInfo;
    }

    public function getFileContent(){
        return file_get_contents($this->path);
    }

    public static function delete($paths){
        foreach ($paths as $path){
            if(!file_exists($path)) {
                echo "$path not exist";
                continue;
            }

            if(is_dir($path))
                rmdir($path);
            else
                unlink($path);
        }
    }

    public static function create($path, $type){
        if($type == 'file')
            fopen($path, 'w');
        else
            mkdir($path);
    }

    public static function rename($from, $to){
        if(!file_exists($from)) {
            echo "$from not exist";
            return;
        }

        rename($from, $to);
    }
    public static function move($paths, $to){
        foreach ($paths as $path){
            if(!file_exists($path)){
                echo "$path not exist";
                continue;
            }

            rename($path, $to . '/' . basename($path));
        }
    }
}