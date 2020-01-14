<?php 

	function fileTree($path = './'){

		$tree = array();
		$folder = opendir($path);
		while($file = readdir($folder)){
			if($file != '.' && $file != '..'){
				if(is_file($path.$file)){
					$tree[] = $file;
				}
				else if(is_dir($path.$file)){
					$tree[] = array('name' => $file, 'files' => fileTree($path.$file.'/'));
				}
			}
		}

		return $tree;
	}

	echo json_encode(array(array('name' => '/', 'files' => fileTree(isset($_POST['url']) ? $_POST['url'] : './'))));
?>