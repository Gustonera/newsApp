<?php 
$dbs = new mysqli("localhost","root","","placcid");
if (isset($_POST['url'])) {
   $url = ($_POST['url']);
   //create a form insert the rates and comments
   $ratecontainer = "<div class='form-group row'>
   						<div class='col-md-12 col-lg-12'>
   						<input type='hidden' value='$url' id='url'>
   						Email: <input type='text' id='email' class='form-control'>
   						</div>
   						<div class='col-md-12 col-lg-12'>
   						Comment: <input type='text' id='comment' class='form-control'>
   						</div>
   						<div class='col-md-12 col-lg-12'>
   						Rate out of 10: <input type='number' min='0' max='10' id='rate' class='form-control'>
   						</div>
   						<div class='col-md-12 col-lg-12 response'>
   						
   						</div>
   						<div class='col-md-12 col-lg-12'>
   							<button id='post_comment'>POST</button>
   						</div>

   					</div>";
   //load the other
    $cat = $dbs->query("SELECT * FROM comments_and_rates WHERE news_url ='$url'");
    if ($cat->num_rows) {
    	$totalrates = 0;
    	$rates =0;
    	while($row = $cat->fetch_assoc()){
    		$ratings = $row['rates'];
    		$comments = $row['comment'];
    		$email = $row['email'];
    		$totalrates = $totalrates + $ratings;
    		$ratecontainer .= "<div class='row'>$email:- $ratings / 10 :-<b>$comments</b></div>";
    		$rates ++;
    	}
    	$averagerating = number_format(($totalrates / $rates),2);
    	$ratecontainer .= "<div class='row'>Average rating:- $averagerating / 10</div>";
    	
    	
    }else{
    	$ratecontainer .= "<div class='alert alert-danger'>This article has no reviews nor ratings yet.</div>";
    }
    echo $ratecontainer;
}
if (isset($_POST['urlpost'])) {
   $url = ($_POST['urlpost']);
   $email = ($_POST['email']);
   $comment = ($_POST['comment']);
   $rate = ($_POST['rate']);
   
   //load the other
    $cat = $dbs->query("INSERT INTO comments_and_rates SET `news_url`='$url',`email`='$email',`rates`='$rate',`comment`='$comment'");
    if ($cat) {
    	echo "<div class='alert alert-success'>Your review was submited successfully.</div>";   	
    }else{
    	echo "<div class='alert alert-danger'>You had already reviewed this or a technical error must have occured.</div>";
    }
}

 ?>

 <script type="text/javascript">
 	$('#post_comment').on('click',function(){
 		var email = $('#email').val();
 		var comment = $('#comment').val();
 		var rate = $('#rate').val();
 		var url = $('#url').val();

 		
 		if (validateEmail(email) && (rate <=10 && rate >=0) && comment != '' && url != '') {
 			var dataTosend = 'urlpost='+url+'&email='+email+'&comment='+comment+'&rate='+rate;
 			$.ajax({
            url:"ratings.php",
            method:"POST", 
            data:dataTosend,
            async:true,
            dataType:"text",
            success:function(data){
              $('.response').html(data); 
              $('.fade').removeClass('modal-backdrop');              
            },
            error:function(jqXHR, exception){
              alert('failed to communicate with the server');
            } 

          });
 		}else{
 			alert('Your form contains errors.. e.g wrong email format, wrong rate value, missing comment..etc');
 		}
          

 	});

 	// function to validate email
 	function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
 </script> 
