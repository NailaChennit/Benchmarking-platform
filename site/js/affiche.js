
var articles;
var carou1;
var carou2;
var carou3;
function popsummary(index){
		console.log('rrrrrrrrrrrrr')
		console.log(articles[index]['title'])
        var text=articles[index]['text'];
		var title=articles[index]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[index]["title"]);
  		$('#popupSummary').modal('show')
}

$(document).ready(function(){

	$.get("/afficher",function(data){
	if(!data){
				console.log("No dataaaaaa");
				}
	else{
		articles=data;		//pb resize

		carou1=articles.slice(0,4)
		carou2=articles.slice(4,8)
		carou3=articles.slice(8,12)
		populate_caroussel(carou1,'#test1')
		populate_caroussel(carou2,'#test2')
		populate_caroussel(carou3,'#test3')


		
		 
}

});

	   function populate_caroussel(list,id){
	   	 list.forEach(function(element,index) { 
		 	
		 		var article =`<div class="col-lg-3">
				  <div class="card card-image" style="background-image: url(`+element['image']+`);height:276px;">
				  <!-- Content -->
				  
				 	 <div style="background-color : rgba(0,0,0,0.5);" class="text-white text-center d-flex align-items-center rgba-black-strong py-4 px-4">
				  <div>  
				      <div id="fitin" class="col"><div class="card-title"><strong>`+element['title']+`</strong></div></div>
				     
				      <div class="row "><div class="col" style="text-align:center;"><button type="button" onclick="popsummary(`+index+`)" class="btn btn-outline-light btn-lg">SUMMARY</button></div></div>
				      <br>
				      <div class="row"><div class="col" style="text-align:center;"><a href="`+element['url']+`"><button type="button" class="btn btn-primary btn-lg">Complete Article</button></a></div></div>   
				  </div>  
				  </div>
				  </div>
				</div>`
				           $(id).append(article);

				    $(function() {
				    while( $('#fitin div').height() > $('#fitin').height() ) {
				        $('#fitin div').css('font-size', (parseInt($('#fitin div').css('font-size')) - 1) + "px" );
				    }
					});       
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

$(document).ready(function(){
	$('#btnsummary1').click(function(){
		var text=articles[1]['text'];
		var title=articles[1]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[1]["title"]);
  		$('#popupSummary').modal('show')
	});
});

$(document).ready(function(){
	$('#btnsummary2').click(function(){
		var text=articles[2]['text'];
		var title=articles[2]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[2]["title"]);
  		$('#popupSummary').modal('show')
	});
});

$(document).ready(function(){
	$('#btnsummary3').click(function(){
		var text=articles[3]['text'];
		var title=articles[3]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[3]["title"]);
  		$('#popupSummary').modal('show')
	});
});

$(document).ready(function(){
	$('#btnsummary4').click(function(){
		var text=articles[4]['text'];
		var title=articles[4]['title'];
		var summarizer = new JsSummarize();
		var summary = summarizer.summarize(title,text);
		$("#popupSummary div.modal-body").text(summary);
		$("#popupSummary h5.modal-title").text(articles[4]["title"]);
  		$('#popupSummary').modal('show')
	});
});

*/