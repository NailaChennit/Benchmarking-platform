//list_operators=["T","TKC","TLS.AX","BHARTIARTL.NS","OIBR4.SA","B2F.SI","S","ORDS.QA","CHU","CHL","TU","USM","RCI","SKM","CEL","SHEN","CHT","NTDMF","GSAT","SFTBY","ISAT.L","SFT.F","0941.HK","0762.HK","TMUS","MCN.F","KPN.AS","KKPNY","017670.KS","KDDIY","032640.KS","KTC.F","KPN.DE","KKPNF","PTNR","TLSYY","SNGNF","TLKGY","SRHBF","MBT","MBOFY","NVAA.F","OIBR3.SA","TSU","IMASF","TIMP3.SA","VFQS.QA","RCI-A.TO","RCI-B.TO","T.TO","T.BA","SH9.F","E5F.F","XCIA.F","XCI.F","PTXKY","Z74.SI","ZWS.F","TZL1.F","ZCHA.F","ZCH.F","TA3G.SG","TACYY","AVIFY","SFTU.F","TUL1.F","AISF.F","TSTD.F","ADVANC.BK","CHUN.MX","PUG.F","MKY.F","ADVANC-R.BK","MGYA.DU","KPNB.F","CTMA.F","SCMWY","SNMMF","SWJ.DE","SWZCF","BHARTIARTL.BO","ATTB34.SA","SOBA.DE","SOBA.F","T.SW","T.MX","MOS.F","CC3.SI","IDEA.NS","IDEA.BO","F5U.F","CEL.TA","US7.F","CHJHF","CHLKF","SR2.F","SRCG.SW","CHUFF","0728.HK","CTM.F","DIP.F","MCNA.F","DTAC.BK","DTAC-R.BK","TCELL.IS","KC1A.F","GTMEY","GTMEF","G0G.F","SFTBF","SIMINN.IC","CHT.SW","MGYB.F","IAM.PA","PTNR.TA","IMASY","IRDMB","6IC.F","IV4.F","KDDIF","KPNN.MX","KPO.SW","KPN.F","030200.KS","TTRAF","TTKOM.IS","MYTAY","MBTN.MX","CHLN.MX","MOJB.F","MSPA.F","PMV.F","TSLL.F","TPA1.F","TSUN.MX","RCIAF","RCOM.NS","RCOM.BO","RCIB.F","RYTB.F","SIT4.F","SGAPY","SRHBY","SWJ.F","TCLA.F","TRKNY","TLS.NZ","TMUS.SW","TM5.F","TSTA.F","4904.TW","3682.TW","3045.TW","2412.TW","CHWD.F"];
//list_countries=["Afghanistan--AF","Albania--AL","Algeria--DZ","Angola--AO","Argentina--AR","Armenia--AM","Australia--AU","Austria--AT","Azerbaijan--AZ","Bahamas--BS","Bangladesh--BD","Belarus--BY","Belgium--BE","Belize--BZ","Benin--BJ","Bhutan--BT","Bolivia--BO","Bosnia and Herzegovina--BA","Botswana--BW","Brazil--BR","Brunei Darussalam--BN","Bulgaria--BG","Burkina Faso--BF","Burundi--BI","Cambodia--KH","Cameroon--CM","Canada--CA","Central African Republic--CF","Chad--TD","Chile--CL","China--CN","Colombia--CO","Costa Rica--CR","Croatia--HR","Cuba--CU","Cyprus--CY","Czech Republic--CZ","Côte dIvoire--CI","Democratic Republic of Congo--CD","Denmark--DK","Djibouti--DJ","Dominican Republic--DO","Ecuador--EC","Egypt--EG","El Salvador--SV","Equatorial Guinea--GQ","Eritrea--ER","Estonia--EE","Ethiopia--ET","Falkland Islands--FK","Fiji--FJ","Finland--FI","France--FR","French Guiana--GF","French Southern and Antarctic Lands--TF","Gabon--GA","Gambia--GM","Georgia--GE","Germany--DE","Ghana--GH","Greece--GR","Greenland--GL","Guatemala--GT","Guinea--GN","Guinea-Bissau--GW","Guyana--GY","Haiti--HT","Honduras--HN","Hong Kong--HK","Hungary--HU","Iceland--IS","India--IN","Indonesia--ID","Iran--IR","Iraq--IQ","Ireland--IE","Israel--IL","Italy--IT","Jamaica--JM","Japan--JP","Jordan--JO","Kazakhstan--KZ","Kenya--KE","Kosovo--XK","Kuwait--KW","Kyrgyzstan--KG","Lao People's Democratic Republic--LA","Latvia--LV","Lebanon--LB","Lesotho--LS","Liberia--LR","Libya--LY","Lithuania--LT","Luxembourg--LU","Macedonia--MK","Madagascar--MG","Malawi--MW","Malaysia--MY","Mali--ML","Mauritania--MR","Mexico--MX","Moldova--MD","Mongolia--MN","Montenegro--ME","Morocco--MA","Mozambique--MZ","Myanmar--MM","Namibia--NA","Nepal--NP","Netherlands--NL","New Caledonia--NC","New Zealand--NZ","Nicaragua--NI","Niger--NE","Nigeria--NG","North Korea--KP","Norway--NO","Oman--OM","Pakistan--PK","Palestinian Territories--PS","Panama--PA","Papua New Guinea--PG","Paraguay--PY","Peru--PE","Philippines--PH","Poland--PL","Portugal--PT","Puerto Rico--PR","Qatar--QA","Republic of Congo--CG","Romania--RO","Russia--RU","Rwanda--RW","Saudi Arabia--SA","Senegal--SN","Serbia--RS","Sierra Leone--SL","Singapore--SG","Slovakia--SK","Slovenia--SI","Solomon Islands--SB","Somalia--SO","South Africa--ZA","South Korea--KR","South Sudan--SS","Spain--ES","Sri Lanka--LK","Sudan--SD","Suriname--SR","Svalbard and Jan Mayen--SJ","Swaziland--SZ","Sweden--SE","Switzerland--CH","Syria--SY","Taiwan--TW","Tajikistan--TJ","Tanzania--TZ","Thailand--TH","Timor-Leste--TL","Togo--TG","Trinidad and Tobago--TT","Tunisia--TN","Turkey--TR","Turkmenistan--TM","Uganda--UG","Ukraine--UA","United Arab Emirates--AE","United Kingdom--GB","United States of America--US","Uruguay--UY","Uzbekistan--UZ","Vanuatu--VU","Venezuela--VE","Vietnam--VN","Western Sahara--EH","Yemen--YE","Zambia--ZM","Zimbabwe--ZW"];
//datalist operator
$(document).ready(function(){

	$.get("/ckeck_log",function(data){
	if(!data){
				console.log("No dataaaaaa");
				}
	else{
			if(data.user){ Display_Nav_Loggin(data.user);  } 
				

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
})


/*	function mySortFunc(text, input) {
	  return text < input;
	}

	var input = document.getElementById("index");
	var awesomplete = new Awesomplete(input, {
	  sort: mySortFunc,
	  minChars: 1,
  	  autoFirst: true
	});
	awesomplete.list = list_operators;

});	*/

//datalist country
/*$(document).ready(function(){
	function mySortFunc(text, input) {
	  return text < input;
	}

	var input = document.getElementById("country");
	var awesomplete = new Awesomplete(input, {
	  sort: mySortFunc,
	  minChars: 1,
  	  autoFirst: true
	});
	awesomplete.list = list_countries;

});*/

$(document).ready(function(){
	$('#password, #confirm_password').on('change keyup', function () {
	  if ($('#password').val() == $('#confirm_password').val()) {
	    $('#error_password').text('');
	  } else{
	    $('#error_password').html('Not Matching').css('color', 'red');
		}
	});

});




$(document).ready(function(){
	$("#country").bind("change paste keyup", function() {
		if(list_countries.includes($("#country").val())==true || $("#country").val()=='' ){
			$("#error_country").text('');
		}else {
			$("#error_country").text('The country must be in the list'); 
			}	

	});
});	

$(document).ready(function(){
	$("small").bind("DOMSubtreeModified", function() {
		console.log('dfg')	//$("small").each(function () {
    if ($("#error_password").text() != '' || $("#error_country").text() != '' ) {
       $('#btnRegister').attr('disabled',true)
    }else  $('#btnRegister').attr('disabled',false)
});
//});	
});	


$(document).ready(function(){
	$("#index").bind("change paste keyup", function() {
		
		if( list_operators.includes($("#index").val()) ) { 

	          $.get("/infos",{index: $("#index").val()},function(data){
					if(!data){
						console.log("No dataaaaaa");
						}
					else{
					      console.log(data)
					      $("#name").val(data.name)
					      $("#website").val(data.website)	
						}
				})

		}
		
	});
});


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
				<li class="nav-item">
					<a class="nav-link" href="http://127.0.0.1:3000/">Home</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link" href="http://127.0.0.1:3000/">News</a>
				</li>
				<li class="nav-item ">
					<a class="nav-link active" href="#">Register</a>
				</li>			
				<li class="nav-item ">
					<a class="nav-link" href="#footer">Contact</a>
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