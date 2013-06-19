<?php

	$files = array();

	if ($handle = opendir('roms/7800/')) {
	    while (false !== ($entry = readdir($handle))) {
	    	if ($entry != "." && $entry != "..") {
	    		$fileName = preg_replace('/\.[^.]*$/', '', $entry);
	    		array_push($files, array("name" =>$fileName));
	    	}
	    }

	    closedir($handle);
	}

	sort($files);
	echo json_encode($files);
?>
