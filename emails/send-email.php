<?php

    $body = json_decode( file_get_contents( 'php://input' ), true );
    
    if(null == $body ){
        echo 'Invalid payload';
        die();
    }

    $to = $body["to"];
    $subject = $body["subject"];
    $template = $body["template"];
    $lang = $body["lang"];
    $content = $body["content"];
    $from = $body["from"];
    

    $message = file_get_contents('./email-templates/'. $template .'/'. $lang .'.html', true);
 
    foreach($content as $key => $value){
            $keyName = "%{".$key ."}";
            $message = str_replace($keyName, $value,$message);
    }
    


    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <'. $from . '>' . "\r\n";
    
    
    mail($to,$subject,$message,$headers);
    
    echo "sent";
?>