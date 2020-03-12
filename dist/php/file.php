<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, PATCH, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Origin');
header('Access-Control-Expose-Headers: Content-Type, Origin');

require('./FileSystem.php');

$fileSystem = new FileSystem($_GET['path']);

echo $fileSystem->getFileContent();