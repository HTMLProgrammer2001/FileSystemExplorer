<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, PATCH, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Origin');
header('Access-Control-Expose-Headers: Content-Type, Origin');

//include filesystem class
require('./FileSystem.php');

$path = './';

if(isset($_POST['path']))
    $path = $_POST['path'];

$fileSystem = new FileSystem($path);
$content = $fileSystem->getDirContent();

echo json_encode($content);