<?php
if (!empty($_FILES['file']['name'])) {

	  $errors= array();
      $file_name = $_FILES['file']['name'];
      $file_size =$_FILES['file']['size'];
      $file_tmp =$_FILES['file']['tmp_name'];
      $file_type=$_FILES['file']['type'];
      $file_ext=pathinfo($file_name, PATHINFO_EXTENSION);

      $expensions= array("jpeg","jpg","png", "gif");

      if(in_array($file_ext,$expensions)=== false){
         $jData['errors']="extension not allowed, please choose a JPEG/PNG/JPG/GIF file.";
      }

      if($file_size > 2097152){
         $jData['errors']='File size must be excately 2 MB';
      }

      if(empty($jData['errors'])==true){
		$root = $_SERVER['DOCUMENT_ROOT'];
  		$folderTosave = "images/";
  		$file_name = $_FILES['file']['name'];

		// $url = $_SERVER['HTTP_HOST'] . "/".$folderTosave . $file_name;

		$saveTO = $root . $folderTosave . $file_name;

		$jData['status'] = !file_exists($saveTO) ? move_uploaded_file($file_tmp, $saveTO) : "It already Exist";
	}

	  echo json_encode($jData);
}

?>
