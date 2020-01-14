<?php

    function getUrlMimeType($url) {
        return substr($url, strrpos($url, '.') + 1);
    }

	function fileTree($path = './'){

		$tree = [];
		if(is_dir($path)) {
            $folder = opendir($path);
            while ($file = readdir($folder)) {
                if ($file != '.' && $file != '..') {
                    if (is_file($path . $file)) {
                        $tree[] = array(
                            'is_Folder' => false,
                            'name' => $file,
                            'type' => getUrlMimeType($path.$file)
                        );
                    } else {
                        $tree[] = array(
                            'is_Folder' => true,
                            'name' => $file
                        );
                    }
                }
            }
        }
		else{
		    $tree = ['noDir' => true];
        }

		return $tree;
	}

	echo json_encode($_POST['path'] ? fileTree($_POST['path']): fileTree());