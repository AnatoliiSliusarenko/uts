function resetFields(event)
{
	var $form;
	
	if (event.pageX)
	{
		$form = $(this).parent();
	} else
	{
		$form = event;
	}
	
	var	$nameInput = $form.find("#nameInput"),
		$emailInput = $form.find("#emailInput"),
		$subjectInput = $form.find("#subjectInput"),
		$messageInput = $form.find("#messageInput");
	
	$nameInput.val('');
	$emailInput.val('');
	$subjectInput.val('');
	$messageInput.val('');
}

function SendMessage()
{
	var $form = $(this).parent(),
		action = $form.attr('action'),
		$nameInput = $form.find("#nameInput"),
		$emailInput = $form.find("#emailInput"),
		$subjectInput = $form.find("#subjectInput"),
		$messageInput = $form.find("#messageInput"),
		$response = $form.find('#response'),
		dataSend,
        correctEmail = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
     
	 $response.empty().hide();
	
     if (($nameInput.val() == false) || 
     	($emailInput.val() == false) || 
     	($subjectInput.val() == false) ||
     	($messageInput.val() == false))
     {
    	$response.append('Please enter all fields...').fadeIn(2000, function(){$response.fadeOut(2000);});
    	return;
     }
     
     if (correctEmail.test($emailInput.val()) == false)
     {
    	$response.append('Wrong email format...').fadeIn(2000, function(){$response.fadeOut(2000);});
     	return;
     }
     
     dataSend = {
    		 name: $nameInput.val(),
    		 email: $emailInput.val(),
    		 subject: $subjectInput.val(),
    		 message: $messageInput.val()
     };
     
     $.get(action, dataSend, function(dataResp){
    	 dataResp = $.parseJSON(dataResp);
    	 if(dataResp.result == true)
    	 {
    		 resetFields($form);
    		 $response.append(dataResp.msg).fadeIn(2000, function(){$response.fadeOut(2000);});
    	 }else
    		 $response.append(dataResp.msg).fadeIn(2000, function(){$response.fadeOut(2000);});
	     return;
     });
}