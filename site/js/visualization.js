/*************cloud*************/
$(document).ready(function(){
var height=450, width=750;
var fill=d3.scale.category20b();
//var data = datafinal['data_final']
var data=[{"text":"M1,SG","idx":"B2F.SI","country":"SG"},{"text":"China Unicom,HK","idx":"0762.HK","country":"HK"},{"text":"KPN,CH","idx":"KPO.SW","country":"CH"},{"text":"KPN,NL","idx":"KPN.AS","country":"NL"},{"text":"Rogers,CA","idx":"RCI-A.TO","country":"CA"},{"text":"Rogers,CA","idx":"RCI-B.TO","country":"CA"},{"text":"SoftBank,FR","idx":"SFT.F","country":"FR"},{"text":"KPN,FR","idx":"KPN.F","country":"FR"},{"text":"StarHub,FR","idx":"RYTB.F","country":"FR"},{"text":"AIS,FR","idx":"AISF.F","country":"FR"},{"text":"AIS,TH","idx":"ADVANC-R.BK","country":"TH"},{"text":"AIS,TH","idx":"ADVANC.BK","country":"TH"},{"text":"KPN,MX","idx":"KPNN.MX","country":"MX"},{"text":"M1,FR","idx":"MOJB.F","country":"FR"},{"text":"Inmarsat,GB","idx":"ISAT.L","country":"GB"},{"text":"Inmarsat,FR","idx":"IV4.F","country":"FR"},{"text":"Orange,FR","idx":"MOS.F","country":"FR"},{"text":"Partner,FR","idx":"PUG.F","country":"FR"},{"text":"KPN,FR","idx":"KPNB.F","country":"FR"},{"text":"KPN,FR","idx":"KPN.DE","country":"FR"},{"text":"TIM (Telecom Italia),MX","idx":"TSUN.MX","country":"MX"},{"text":"Turk Telekom (Oger Telecom),TR","idx":"TTKOM.IS","country":"TR"},{"text":"Rogers,FR","idx":"RCIB.F","country":"FR"},{"text":"Turkcell,TR","idx":"TCELL.IS","country":"TR"},{"text":"TIM (Telecom Italia),FR","idx":"TCLA.F","country":"FR"},{"text":"Orange,FR","idx":"TPA1.F","country":"FR"},{"text":"Singtel,FR","idx":"SIT4.F","country":"FR"},{"text":"Turkcell,FR","idx":"TUL1.F","country":"FR"},{"text":"Telus,CA","idx":"T.TO","country":"CA"},{"text":"Partner,IL","idx":"PTNR.TA","country":"IL"},{"text":"StarHub,SG","idx":"CC3.SI","country":"SG"},{"text":"Asia Pacific Telecom,TW","idx":"3682.TW","country":"TW"},{"text":"Telkom,FR","idx":"TZL1.F","country":"FR"},{"text":"Vodafone,QA","idx":"VFQS.QA","country":"QA"},{"text":"AIS,FR","idx":"NVAA.F","country":"FR"},{"text":"China Unicom,MX","idx":"CHUN.MX","country":"MX"},{"text":"Singtel,SG","idx":"Z74.SI","country":"SG"},{"text":"China Unicom,FR","idx":"XCIA.F","country":"FR"},{"text":"China Unicom,FR","idx":"XCI.F","country":"FR"},{"text":"KDDI,FR","idx":"DIP.F","country":"FR"},{"text":"NTT DOCOMO,FR","idx":"MCNA.F","country":"FR"},{"text":"NTT DOCOMO,FR","idx":"MCN.F","country":"FR"},{"text":"SoftBank,FR","idx":"SFTU.F","country":"FR"}];
if(data.length >10){ var data2=data.slice(0,10) }
else {var data2=data }  

var focus=d3.select("#wordCloud").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "wordcloud svg")
    .append("g")
      .attr("class","pointer")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
var colorScale = d3.scale.linear()
              .domain([1,data2.length])
              .range(["#393b79","#9c9ede"]);
var sizeScale = d3.scale.linear()
              .domain([1,data2.length])
              .range([5*(data2.length-1)+15,15]);            
 d3.layout.cloud().size([width, height])
    .words(data2)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Arial")
    .spiral("archimedean")
    //.spiral("rectangular")
    .fontSize(function(d, index) { return sizeScale(index); })
    .on("end", draw)
    .start();

     
function draw(words) {
    //console.log(words)
    focus.selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return  d.size + "px"; })
      .style("font-family", "Arial")
      .style("fill", function(d, i) { return fill(i); })
      .on("click", function (d, i){
       charts(d.idx) })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
           
}
});

/********************graphe*************************/

function charts(idx){
    $(document).ready(function(){ 
         $.get("/infos",{index_compare:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                $('#name span').text(data[0].name)
                $('#website a').text(((data[0].website).replace('https://','')).replace('http://',''))
                $('#website a').attr('href',data[0].website)
                $('#yh__index span').text('Yahoo finance index : '+data[0].index_YH)
                $('#nb_employee span').text('Number of employee : '+data[0].nb_employee)
                $('#address').text('')
                $('#address').append('<pre style="font-family:Poppins;">'+(data[0].address).trim()+'</pre>')
                $('#phone span').text(data[0].phone)
                $('#fax span').text(data[0].fax)
               }
             })

         $.get("/charts",{index_user:"VFQS.QA",index_compare:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{
                    ////partie collapse  
                     $('#charts').collapse('toggle');
                    $("#charts").on('hidden.bs.collapse', function(){
                      setTimeout(function(){
                      $('#charts').collapse('show');
                  }, 300);
                  });
                    $('#charts').on('shown.bs.collapse', function () {
                      $('html, body').animate({
                          scrollTop: $('#charts').offset().top
                      }, 100);})
                     /****************************barchart********************************/
                    var revenueuser=[];                     
                   (data.user).forEach(function(element) {
                        revenueuser.push(element.Revenue)
                   });
                     var revenuecompare=[];
                   (data.compare).forEach(function(element) {
                        revenuecompare.push(element.Revenue)
                   });
                   var capexuser=[];                     
                   (data.user).forEach(function(element) {
                        capexuser.push(element.Capex)
                   });
                    
                     var capexcompare=[];
                   (data.compare).forEach(function(element) {
                        capexcompare.push(element.Capex)
                   });
                   
                   var revenueCanvas = document.getElementById("chBarRevenue");

                   Chart.defaults.global.defaultFontFamily = "Lato";
                   Chart.defaults.global.defaultFontSize = 15;

                  var Revenue_user = {
                    label: 'Revenue of your company ($/year)',
                    data: revenueuser,
                    backgroundColor: '#26B99A',
                    //borderWidth: 0,
                  };

                  var Capex_user = {
                    label: 'Capex of your company ($/year)',
                    data: capexuser,
                    backgroundColor: '#26B99A',
                    hidden: true,
                    //borderWidth: 0,
                  };

                  var Revenue_compare = {
                    label: 'Revenue of namecompany ($/year)',
                    data: revenuecompare,
                    backgroundColor: '#03586A',
                    //borderWidth: 0,
                  };
                  var Capex_compare = {
                    label: 'Capex of namecompany ($/year)',
                    data: capexcompare,
                    backgroundColor: '#03586A',
                    hidden: true,
                    //borderWidth: 0,
                  };

                  var years = {
                    labels: ["2015", "2016", "2017", "2018"],
                    datasets: [Revenue_user, Revenue_compare,Capex_user,Capex_compare]
                  };

                  var chartOptions = {
                    scales: {
                      xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 0.6
                      }],
                      yAxes: [{
                        ticks:{beginAtZero: true}
                      }]
                    }, 
                    animation:{
                      duration:4000,
                      easing:'easeInOutQuint'
                    }
                  };

                  var barChart = new Chart(revenueCanvas, {
                    type: 'bar',
                    data: years,
                    options: chartOptions
                  });

               /****************************chartLine Qos*****************************/
                var qOSuser=[];                     
                   (data.user).forEach(function(element) {
                        qOSuser.push(element.QOS*100)
                   });
                
                var qOScompare=[];                     
                   (data.compare).forEach(function(element) {
                        qOScompare.push(element.QOS*100)
                   });
                    
              
                var qos_user = {
                    label: 'Quality of service of your company (%)',
                    data: qOSuser,
                    borderColor: '#26B99A',
                    hidden: true,
                    //borderWidth: 0,
                  };
                  
                var qos_compare = {
                    label: 'Quality of service of the company compared to (%)',
                    data: qOScompare,
                    borderColor: '#03586A',
                    
                    //borderWidth: 0,
                  };      

               
                var chartData = {
                labels: ["0","2015", "2016", "2017", "2018"],  
                datasets: [qos_user,qos_compare]
              }; 


              var chLine = document.getElementById("chLineQos").getContext('2d');
              if (chLine) {
                new Chart(chLine, { 
                type: 'line',
                data: chartData,
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  },
                  legend: {
                    display: true
                  },
                   animation:{
                      duration:4000,
                      easing:'easeInOutQuint'
                    }
                }

                });
              }
/****************************chartLine Qon*****************************/
              
                var qONuser=[];                     
                   (data.user).forEach(function(element) {
                        qONuser.push(element.QON*100)
                   });
            
                var qONcompare=[];                     
                   (data.compare).forEach(function(element) {
                        qONcompare.push(element.QON*100)
                   });    

                var qon_user = {
                    label: 'Quality of network of your company (%)',
                    data: qONuser,
                    borderColor: '#26B99A',                   
                    //borderWidth: 0,
                  };
                   

                var qon_compare = {
                    label: 'Quality of network of the company compared to (%)',
                    data: qONcompare,
                    //backgroundColor: '#03586A',
                    borderColor: '#03586A'
                    //borderWidth: 0,
                  };
    

              
                var chartData = {
                labels: ["0","2015", "2016", "2017", "2018"],  
                datasets: [qon_user,qon_compare]
              }; 


              var chLine = document.getElementById("chLineQon").getContext('2d');
              if (chLine) {
                new Chart(chLine, { 
                type: 'line',
                data: chartData,
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  },
                  legend: {
                    display: true
                  },
                   animation:{
                      duration:4000,
                      easing:'easeInOutQuint'
                    }
                }

                });
              }
              /****************fin graphe*****************/


         }
 
        
    })
})

}


$(document).ready(function(){
  new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        labels: ["Africa", "Asia", "Europe"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [2478,5267,734]
        }]
      },
      options: {
        title: {
          display: false,
          text: 'Predicted world population (millions) in 2050'
        }
      }
  });
 

});


$(document).ready(function(){
 new Chart(document.getElementById("bar-chart-horizontal"), {
    type: 'horizontalBar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});
});