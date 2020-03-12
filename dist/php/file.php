<?php
require('./FileSystem.php');

$fileSystem = new FileSystem($_POST['path']);

echo $fileSystem->getFileContent();