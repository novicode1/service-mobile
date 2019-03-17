/* php/post.php */

<?php
  header('Content-type: application/json');
  header('Access-Control-Allow-Headers: Content-Type');
  header("Access-Control-Allow-Origin: *");

  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, TRUE);

  $name = $input['name'];
  $email = $input['email'];
  $comment = $input['comment'];
  $phone = $input['phone'];
  $chat_id = '-393697739';
  $message = urlencode("Name:".$name."\n email : ".$email."\n phone : ".$phone."\n comment : ".$comment);


  file_get_contents(url."sendmessage?text=".$message."&chat_id=".$chat_id."&parse_mode=HTML");

  if ($name) {
    $result['message']  = "Posted Values => ".$name."-".$email."-".$comment."-".$phone;
    $result['error']  = false;
  }
  else {
    $result['error']  = 'Form submission failed.';
  }

  echo json_encode($result);
?>
