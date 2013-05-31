<?php
$senderName = isset($_GET['name']) ? $_GET['name'] : '';  
$senderEmail = isset($_GET['email']) ? $_GET['email'] : '';
$senderSubject = isset($_GET['subject']) ? $_GET['subject'] : '';
$senderMessage = isset($_GET['message']) ? $_GET['message'] : '';


$text = 'Sender name: '.$senderName."\n";
$text .= 'Sender email: '.$senderEmail."\n";
$text .= 'Sender subject: '.$senderSubject."\n\n";
$text .= "Sender message: \n".$senderMessage."\n";

$mail = mail('info@uts.com', 'Contact Form (uts.com)', $text);

if($mail)
{
	$message = 'Message was send...';
} else
{
	$message = "Some problems with server...";
}
$answer = array('result' => $mail, 'msg' => $message);
print json_encode($answer);
?>