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
            $fileInfo['path'] .= '/';

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
        if(is_array($paths)){
            //loop array of paths
            foreach($paths as $path){
                self::delete($path);
            }
        }
        else{
            //start delete recursion
            if(is_file($paths))
                unlink($paths);
            else{
                $dir = opendir($paths);

                while($file = readdir($dir)){
                    //exclude link on the current and parent dir
                    if($file == '.' || $file == '..')
                        continue;

                    self::delete($paths . '/' . $file);
                }

                closedir($dir);
                rmdir($paths);
            }
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

    public static function save($path, $content){
        $file = fopen($path, 'w');
        fwrite($file, $content);
        fclose($file);
    }
}
