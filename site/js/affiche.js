
var articles;
var carou1;
var carou2;
var carou3;
function popsummary(index){
		console.log(articles[index])	
        var text=articles[index]['text'];
		var title=articles[index]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[index]["title"]);
  		$('#popupSummary').modal('show')
}



$(document).ready(function(){
	$.get("/ckeck_log",function(data){
	if(!data){
				console.log("No dataaaaaa");
				}
	else{
			if(data.user){ Display_Nav_Loggin(data.user); 
						  } 
				

		}
	})



	$('#btn_logout').click(function(){
		$.get("/logout",function(data){
			if(!data){
						console.log("No dataaaaaa");
					}
			else{	 
					 //window.open('index.html', '_self')
					  document.open();
                      document.write(data);
                      document.close(); 
				}
		
		});
	});


	$.get("/afficher",function(data){
	if(!data){
				console.log("No dataaaaaa");
				}
	else{
		articles=data;		

		carou1=articles.slice(0,4)
		carou2=articles.slice(4,8)
		carou3=articles.slice(8,12)
		populate_caroussel(carou1,'#test1',0)
		populate_caroussel(carou2,'#test2',4)
		populate_caroussel(carou3,'#test3',8)


		
		 
}

});
		

	   function populate_caroussel(list,id,i){
	   	 list.forEach(function(element,index) { 
		 	
		 		var article =`<div class="col-lg-3">
				  <div class="card card-image" style="background-image: url(`+element['image']+`);height:265px;">
				  <!-- Content -->
				  
				 	 <div style="background-color : rgba(0,0,0,0.5);" class="text-white text-center d-flex align-items-center rgba-black-strong py-4 px-4">
				  <div>  
				      <div id="fitin`+index+`" class="col"><div class="card-title align-middle" style="height :95px;margin-bottom: 0.0px;"><strong>`+element['title']+`</strong></div></div>
				     
				      <div class="row "><div class="col" style="text-align:center;"><button type="button" onclick="popsummary(`+(index+i)+`)" class="btn btn-outline-light btn-lg">SUMMARY</button></div></div>
				      <br>
				      <div class="row"><div class="col" style="text-align:center;"><a href="`+element['url']+`"><button type="button" class="btn btn-primary btn-lg">Full article</button></a></div></div>   
				  </div>  
				  </div>
				  </div>
				</div>`
				    $(id).append(article);

				    /*$(function() { 
				    while( $('#fitin'+index+' div').height() > $('#fitin'+index).height() ) {
				        $('#fitin'+index+' div').css('font-size', (parseInt($('#fitin'+index+' div').css('font-size')) - 2) + "px" );
				    }
					}); */      
				});

					



	   }

});
/*
$(document).ready(function(){
	$.get("/afficher",function(data){
		console.log('fegvjhqefvhjb')
	if(!data){
				console.log("No datssssa ");
				}
	else{console.log('yes');
		 articles=data;	
		 
		 $("#img0").attr("src",articles[0]['image']);
		 $("#img1").attr("src",articles[1]['image']);
		 $("#img2").attr("src",articles[2]['image']);
		 $("#img3").attr("src",articles[3]['image']);
		 $("#img4").attr("src",articles[4]['image']);

		 console.log(articles[0]['title']);


		 $("#title0").text(articles[0]['title']);
		 $("#title1").text(articles[1]['title']);
		 $("#title2").text(articles[2]['title']);
		 $("#title3").text(articles[3]['title']);
		 $("#title4").text(articles[4]['title']);

		 $("#article0").attr("href",articles[0]['url']);
		 $("#article1").attr("href",articles[1]['url']);
		 $("#article2").attr("href",articles[2]['url']);
		 $("#article3").attr("href",articles[3]['url']);
		 $("#article4").attr("href",articles[4]['url']);

	}
	});
 });	
*/
/*
//afficher les resumé dans un pop up
$(document).ready(function(){
	$('#btnsummary').click(function(){
		var text=articles[0]['text'];
		var title=articles[0]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[0]["title"]);
  		$('#popupSummary').modal('show')
	});
});

*/
function Display_Nav_Loggin(user){
 $('nav').replaceWith(
 	`
<nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="#"><img src="image/logoo.png">
		</a>
		<button class="navbar-toggler" type="button" data_toggle="collapse" data-target="#navbarResponsive">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#">Home</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link" href="#map">Map</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link" href="#slides">News</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link" href="http://127.0.0.1:3000/register">Register</a>
				</li>			
				<li class="nav-item ">
					<a class="nav-link" href="#footer">Contact</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link" href="http://127.0.0.1:3000/help">Help</a>
				</li>	
				<li class="nav-item ">`+
				user.name+`<br>`+
					user.lastname+ 
				`</li>					
				<li class="nav-item">
					<i class="fas fa-circle" style="color: #3bc63b"></i><br>
					<div class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"> </a>
						<div class="dropdown-menu  dropdown-menu-right " style="min-width:7rem; text-align: left;padding-left: 3px;">
							<a   href="http://127.0.0.1:3000/account"> My account</a>
							<hr style="margin-bottom: 5px;padding-top: 0px;margin-top: 5px;">
				            <a  id="logout" data-toggle="modal" data-target="#LogOutModal" href="#"> Log Out</a>
				        <div>
			        </div>
				</li>				

			</ul>

		</div>
	</div>
		
</nav>`)

}