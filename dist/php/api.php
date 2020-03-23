<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, PATCH, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Origin');
header('Access-Control-Expose-Headers: Content-Type, Origin');

//include filesystem class
require('./FileSystem.php');

if($_POST['type'] === 'getFolderContent'){
    $path = './';

    if (isset($_POST['path']))
        $path = $_POST['path'];

    $fileSystem = new FileSystem($path);
    $content = $fileSystem->getDirContent();
    echo json_encode($content);
}

if($_POST['type'] === 'getFileContent' || $_GET['type'] === 'getFileContent'){
    $fileSystem = new FileSystem($_POST['path'] ? $_POST['path'] : $_GET['path']);

    echo $fileSystem->getFileContent();
}

if($_POST['type'] === 'delete')
    FileSystem::delete(json_decode($_POST['paths']));

if($_POST['type'] === 'create') {
    FileSystem::create($_POST['path'], $_POST['createType']);
}

if($_POST['type'] === 'rename')
    FileSystem::rename($_POST['from'], $_POST['to']);

if($_POST['type'] === 'move')
    FileSystem::move(json_decode($_POST['paths']), $_POST['to']);

if($_POST['type'] === 'saveFileContent')
    FileSystem::save($_POST['path'], $_POST['content']);
