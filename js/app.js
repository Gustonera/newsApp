//filter changes
$('#filter_guide').on('change', function(){
	$filter_guide_val = $(this).val();
	if ($filter_guide_val == 'term') {
		//provide a text box to enter the search term
		$('#filter_holder').html("<div class='col-lg-8 col-md-8 col-sm-8 col-xs-8'><input type='text' id='term' placeholder='Search here for title, author, article, category...etc ' class='form-control'></div><div col-lg-4 col-md-4 col-sm-4 col-xs-4><button class='btn btn-primary' id='searchbtn'>Search</button></div>");
		//hard code id of selected and store it in variable 'selected' to avoid recoding this
		selected ="term";
	}else if ($filter_guide_val == 'provider') {
		//provide select box with providers..could use ajax to fetch from api in future.. but for now.. hard code a few options
		$('#filter_holder').html("<div class='col-lg-8 col-md-8 col-sm-8 col-xs-8'><select class='form-control' id='provider'><option value='bbc.co.uk'>BBC</option><option value='goal.com'>Goal</option><option value='cnn.com'>CNN</option></select></div><div col-lg-4 col-md-4 col-sm-4 col-xs-4><button class='btn btn-primary' id='searchbtn'>Search</button></div>");
		selected = "provider";
	}else{
		//means nothing was selected, do nothing but empty the div.
		$('#filter_holder').empty();
		selected ='';
	}

});
//filter changes
selectedfine ='';
$('#fine_guide').on('change', function(){
	$fine_guide_val = $(this).val();
	if ($fine_guide_val == 'language') {
		//provide a select box of available languages
		$('#fine_holder').html("<div class='col-lg-8 col-md-8 col-sm-8 col-xs-8'><select class='form-control' id='language'><option value='en'>English</option><option value='fr'>French</option><option value='es'>Spanish</option></select></div><div col-lg-4 col-md-4 col-sm-4 col-xs-4></div>");
		selectedfine = "language";
	}else if ($fine_guide_val == 'date') {
		//provide a div with date from and date to
		$('#fine_holder').html("<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4'><input type='text' id='datefrom' placeholder='Date From' class='dateselector form-control'></div><div class='col-lg-4 col-md-4 col-sm-4 col-xs-4'><input type='text' placeholder='Date To' class='dateselector form-control' id='dateto'></div><div col-lg-4 col-md-4 col-sm-4 col-xs-4></div>");
		selectedfine = "date";
	}else{
		//means nothing was selected, do nothing but empty the div.
		$('#fine_holder').empty();
		selectedfine ='';
	}
	$('.dateselector').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
	});

});
//now when sereach button is clicked
$('#filter_holder').on('click','#searchbtn',function(){
	$(".content").html("<h2 id='placeholder-text'>Fetching articles... Please Wait.</h2>");
	//get that id that was selected, check its nature and create the neccessary append
	if (selected == 'term') {
		var term = $("#"+selected).val();
		if (term != '') {
			append = "q="+term+"&";

			//check for the fine tuner
			if (selectedfine == 'language') {
				var language = $("#"+selectedfine).val();
				if (language != '') {
					append = append +"language="+language+"&";
				}
			}else if (selectedfine == 'date') {
				var datefrom = $("#datefrom").val();
				var dateto = $("#dateto").val();
				if (datefrom != '' && dateto !='') {
					append = append+"from="+datefrom+"&to="+dateto+"&";
				}
			}
		}else{
			append ='';
		}
	}else if (selected == 'provider') {
		var provider = $("#"+selected).val();
		if (provider != '') {
			append = "domains="+provider+"&";
			//check for the fine tuner
			if (selectedfine == 'language') {
				var language = $("#"+selectedfine).val();
				if (language != '') {
					append = append+ "language="+language+"&";
				}
			}else if (selectedfine == 'date') {
				var datefrom = $("#datefrom").val();
				var dateto = $("#dateto").val();
				if (datefrom != '' && dateto !='') {
					append = append+ "from="+datefrom+"&to="+dateto+"&";
				}
			}
		}else{
			append ='';
		}
	}else{
		append ='';
	}
	// initial page
	pageSize = 20;
	var urlinitial ="https://newsapi.org/v2/everything?";
	url = urlinitial+append+"pageSize="+pageSize+"&apiKey=35ceb3b0db8c41388c640eee192df2a8"; //Final url for AJAX request
	// url = url+append+"apiKey=b6fc115f7c46456ab9006a9101183548"; //Final url for AJAX request

	
	/*AJAX REQUEST & DOM PARSING*/

	$.getJSON(url, function(data){ //callback
    var content = '<div class="card-columns">';


    
    $.each(data.articles , function(i,article) { 
    content += '<a target="_blank" href="' + article.url + '">';
    content += '<div class="card card-number-' + (i+1) + '">'; 
      if (article.urlToImage === null) {
        content += '<img class="card-img-top img-fluid" src="img/default.png" alt="Card image cap">';
      } else {
        content += '<img class="card-img-top img-fluid" src="' + article.urlToImage + '" alt="Card image cap">';
      }
    content += '<div class="card-block">';
    content += '<h4 class="card-title">' + article.title + '</h4>';
    content += '<p class="card-text">' + article.description + '</p>';
    content += '<div class="social">'+
    '<a href="https://api.whatsapp.com/send?text=' + encodeURI(article.url) + '" target="_blank" id="share-wa" class="sharer button"><i class="fa fa-3x fa-whatsapp"></i></a>'+
    '<a href="https://www.facebook.com/sharer.php?u='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-facebook-square"></i></a>'+
    '<a href="https://telegram.me/share/url?url='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-telegram"></i></a>'+
    '<a href="http://www.twitter.com/share?url='+article.url+'" id="share-gp" target="_blank" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>'+
    '<div style="float:right;"><button class="ratencomment btn btn-primary" data-url='+article.url+'" data-toggle="modal" data-target="#ratings">Rate And Comment</button></div>'+
     '</div>';
    content += '</div></div>';
    content += '</a>';

    
      
    }); //end each


    
    content += '</div>';
    $(".content").empty(); //empty the "Searching.." Placeholder
    $(".content").append(content); //append the dom parsed json to content
    
  }); //finish callback

$(window).scroll(function() {

	    if($(window).scrollTop() + $(window).height() >= $(document).height()-2) {
			// initial page
			pageSize = pageSize+20;
			var urlinitial ="https://newsapi.org/v2/everything?";
			url = urlinitial+append+"pageSize="+pageSize+"&apiKey=35ceb3b0db8c41388c640eee192df2a8";
			      /*AJAX REQUEST & DOM PARSING*/

			$.getJSON(url, function(data){ //callback
		    var content = '<div class="card-columns">';


		    
		    $.each(data.articles , function(i,article) { 
		    content += '<a target="_blank" href="' + article.url + '">';
		    content += '<div class="card card-number-' + (i+1) + '">'; 
		      if (article.urlToImage === null) {
		        content += '<img class="card-img-top img-fluid" src="img/default.png" alt="Card image cap">';
		      } else {
		        content += '<img class="card-img-top img-fluid" src="' + article.urlToImage + '" alt="Card image cap">';
		      }
		    content += '<div class="card-block">';
		    content += '<h4 class="card-title">' + article.title + '</h4>';
		    content += '<p class="card-text">' + article.description + '</p>';
		    content += '<div class="social">'+
			'<a href="https://api.whatsapp.com/send?text=' + encodeURI(article.url) + '" target="_blank" id="share-wa" class="sharer button"><i class="fa fa-3x fa-whatsapp"></i></a>'+
			'<a href="https://www.facebook.com/sharer.php?u='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-facebook-square"></i></a>'+
			'<a href="https://telegram.me/share/url?url='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-telegram"></i></a>'+
    		'<a href="http://www.twitter.com/share?url='+article.url+'" id="share-gp" target="_blank" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>'+
    		'<div style="float:right;"><button class="ratencomment btn btn-primary" data-url='+article.url+'" data-toggle="modal" data-target="#ratings">Rate And Comment</button></div>'+
     		'</div>';
		    content += '</div></div>';
		    content += '</a>';

		    
		      
		    }); //end each


		    
		    content += '</div>';
		    $(".content").empty(); //empty the "Searching.." Placeholder
		    $(".content").append(content); //append the dom parsed json to content
		    
		  }); //finish callback  

	    }
	});


});
/*without clicking button (on page load)*/

$(document).ready(function(){
append="q=None&";
// initial page
	pageSize = 20;
	var urlinitial ="https://newsapi.org/v2/everything?";
	url = urlinitial+append+"pageSize="+pageSize+"&apiKey=35ceb3b0db8c41388c640eee192df2a8"; //Final url for AJAX request
	// url = url+append+"apiKey=b6fc115f7c46456ab9006a9101183548"; //Final url for AJAX request

	
	/*AJAX REQUEST & DOM PARSING*/

	$.getJSON(url, function(data){ //callback
    var content = '<div class="card-columns">';


    
    $.each(data.articles , function(i,article) { 
    content += '<a target="_blank" href="' + article.url + '">';
    content += '<div class="card card-number-' + (i+1) + '">'; 
      if (article.urlToImage === null) {
        content += '<img class="card-img-top img-fluid" src="img/default.png" alt="Card image cap">';
      } else {
        content += '<img class="card-img-top img-fluid" src="' + article.urlToImage + '" alt="Card image cap">';
      }
    content += '<div class="card-block">';
    content += '<h4 class="card-title">' + article.title + '</h4>';
    content += '<p class="card-text">' + article.description + '</p>';
    content += '<div class="social">'+
    '<a href="https://api.whatsapp.com/send?text=' + encodeURI(article.url) + '" target="_blank" id="share-wa" class="sharer button"><i class="fa fa-3x fa-whatsapp"></i></a>'+
    '<a href="https://www.facebook.com/sharer.php?u='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-facebook-square"></i></a>'+
    '<a href="https://telegram.me/share/url?url='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-telegram"></i></a>'+
    '<a href="http://www.twitter.com/share?url='+article.url+'" id="share-gp" target="_blank" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>'+
    '<div style="float:right;"><button class="ratencomment btn btn-primary" data-url='+article.url+'" data-toggle="modal" data-target="#ratings">Rate And Comment</button></div>'+
     '</div>';
    content += '</div></div>';
    content += '</a>';

    
      
    }); //end each


    
    content += '</div>';
    $(".content").empty(); //empty the "Searching.." Placeholder
    $(".content").append(content); //append the dom parsed json to content
    
  }); //finish callback

$(window).scroll(function() {

	    if($(window).scrollTop() + $(window).height() >= $(document).height()-2) {
			// initial page
			pageSize = pageSize+20;
			var urlinitial ="https://newsapi.org/v2/everything?";
			url = urlinitial+append+"pageSize="+pageSize+"&apiKey=35ceb3b0db8c41388c640eee192df2a8";
			      /*AJAX REQUEST & DOM PARSING*/

			$.getJSON(url, function(data){ //callback
		    var content = '<div class="card-columns">';


		    
		    $.each(data.articles , function(i,article) { 
		    content += '<a target="_blank" href="' + article.url + '">';
		    content += '<div class="card card-number-' + (i+1) + '">'; 
		      if (article.urlToImage === null) {
		        content += '<img class="card-img-top img-fluid" src="img/default.png" alt="Card image cap">';
		      } else {
		        content += '<img class="card-img-top img-fluid" src="' + article.urlToImage + '" alt="Card image cap">';
		      }
		    content += '<div class="card-block">';
		    content += '<h4 class="card-title">' + article.title + '</h4>';
		    content += '<p class="card-text">' + article.description + '</p>';
		    content += '<div class="social">'+
			'<a href="https://api.whatsapp.com/send?text=' + encodeURI(article.url) + '" target="_blank" id="share-wa" class="sharer button"><i class="fa fa-3x fa-whatsapp"></i></a>'+
			'<a href="https://www.facebook.com/sharer.php?u='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-facebook-square"></i></a>'+
			'<a href="https://telegram.me/share/url?url='+article.url+'" id="share-li" class="sharer button" target="_blank"><i class="fa fa-3x fa-telegram"></i></a>'+
    		'<a href="http://www.twitter.com/share?url='+article.url+'" id="share-gp" target="_blank" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>'+
    		'<div style="float:right;"><button class="ratencomment btn btn-primary" data-url='+article.url+'" data-toggle="modal" data-target="#ratings">Rate And Comment</button></div>'+
 			'</div>';
		    content += '</div></div>';
		    content += '</a>';

		    
		      
		    }); //end each


		    
		    content += '</div>';
		    $(".content").empty(); //empty the "Searching.." Placeholder
		    $(".content").append(content); //append the dom parsed json to content
		    
		  }); //finish callback  

	    }
	});

//ajax request for the comments and ratings
$('.content').on('click','.ratencomment',function(){
          var url = $(this).data('url');
          $('.holder').empty();
          //send to ratings.php
          var dataTosend = 'url='+url;
          $.ajax({
            url:"ratings.php",
            method:"POST", 
            data:dataTosend,
            async:true,
            dataType:"text",
            success:function(data){
              $('.holder').html(data); 
              $('.fade').removeClass('modal-backdrop');              
            },
            error:function(jqXHR, exception){
              alert('failed to communicate with the server');
            } 

          }); 
        });

});

