console.log("je suis la");
var articles;

$(document).ready(function(){
	$.get("/afficher",function(data){
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

