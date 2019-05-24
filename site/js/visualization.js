/*************cloud*************/
$(document).ready(function(){

var info_user;
var info_comp;  

var averagePibUser;
var averagePibcomp;

var height=450, width=750;
var fill=d3.scale.category20b();
//var data = datafinal['data_final']
var data=[{"text":"China Unicom,HK","idx":"0762.HK","country":"HK"},{"text":"KPN,CH","idx":"KPO.SW","country":"CH"},{"text":"KPN,NL","idx":"KPN.AS","country":"NL"},{"text":"Rogers,CA","idx":"RCI-A.TO","country":"CA"},{"text":"Rogers,CA","idx":"RCI-B.TO","country":"CA"},{"text":"SoftBank,FR","idx":"SFT.F","country":"FR"},{"text":"KPN,FR","idx":"KPN.F","country":"FR"},{"text":"StarHub,FR","idx":"RYTB.F","country":"FR"},{"text":"AIS,FR","idx":"AISF.F","country":"FR"},{"text":"AIS,TH","idx":"ADVANC-R.BK","country":"TH"},{"text":"AIS,TH","idx":"ADVANC.BK","country":"TH"},{"text":"KPN,MX","idx":"KPNN.MX","country":"MX"},{"text":"M1,FR","idx":"MOJB.F","country":"FR"},{"text":"Inmarsat,GB","idx":"ISAT.L","country":"GB"},{"text":"Inmarsat,FR","idx":"IV4.F","country":"FR"},{"text":"Orange,FR","idx":"MOS.F","country":"FR"},{"text":"Partner,FR","idx":"PUG.F","country":"FR"},{"text":"KPN,FR","idx":"KPNB.F","country":"FR"},{"text":"KPN,FR","idx":"KPN.DE","country":"FR"},{"text":"TIM (Telecom Italia),MX","idx":"TSUN.MX","country":"MX"},{"text":"Turk Telekom (Oger Telecom),TR","idx":"TTKOM.IS","country":"TR"},{"text":"Rogers,FR","idx":"RCIB.F","country":"FR"},{"text":"Turkcell,TR","idx":"TCELL.IS","country":"TR"},{"text":"TIM (Telecom Italia),FR","idx":"TCLA.F","country":"FR"},{"text":"Orange,FR","idx":"TPA1.F","country":"FR"},{"text":"Singtel,FR","idx":"SIT4.F","country":"FR"},{"text":"Turkcell,FR","idx":"TUL1.F","country":"FR"},{"text":"Telus,CA","idx":"T.TO","country":"CA"},{"text":"Partner,IL","idx":"PTNR.TA","country":"IL"},{"text":"StarHub,SG","idx":"CC3.SI","country":"SG"},{"text":"Asia Pacific Telecom,TW","idx":"3682.TW","country":"TW"},{"text":"Telkom,FR","idx":"TZL1.F","country":"FR"},{"text":"Vodafone,QA","idx":"SNMMF","country":"QA"},{"text":"AIS,FR","idx":"NVAA.F","country":"FR"},{"text":"China Unicom,MX","idx":"CHUN.MX","country":"MX"},{"text":"Singtel,SG","idx":"Z74.SI","country":"SG"},{"text":"China Unicom,FR","idx":"XCIA.F","country":"FR"},{"text":"China Unicom,FR","idx":"XCI.F","country":"FR"},{"text":"KDDI,FR","idx":"DIP.F","country":"FR"},{"text":"NTT DOCOMO,FR","idx":"MCNA.F","country":"FR"},{"text":"NTT DOCOMO,FR","idx":"MCN.F","country":"FR"},{"text":"SoftBank,FR","idx":"SFTU.F","country":"FR"}];
if(data.length >10){ var data2=data.slice(0,10) }
else {var data2=data }  

var focus=d3.select("#wordCloud").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "wordcloud svg")
    .append("g")
      .attr("class","pointer")
      .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
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
         $.get("/infos",{index:"T"},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{$('#name_user').text(data[0].name)
                    
                    info_user=data;
                    console.log(info_user)
               }
             })
         $.get("/infos",{index:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                info_comp=data;
                $('#name').text(data[0].name)
                $('#website a').text(((data[0].website).replace('https://','')).replace('http://',''))
                $('#website a').attr('href',data[0].website)
                $('#yh__index ').text('Yahoo finance index : '+data[0].index_YH)
                $('#nb_employee ').text('Number of employee : '+data[0].nb_employee)
                $('#address').text('')
                $('#address').append('<pre style="font-family:Poppins;">'+(data[0].address).trim()+'</pre>')
                $('#phone ').text(data[0].phone)
                $('#fax').text(data[0].fax)
                //$('#2018').text('2018 statistics for '+ data[0].name)
                
                $('#name_comp').text(data[0].name)
                
               }
             })
         

         $.get("/charts",{index_user:"SNMMF",index_compare:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{

                    // les tags du dessus
                   
                    $('#revenue').text('$ '+data.compare[3]['Revenue'])

                    $('#GDP').text('$/hab '+data.compare[3]['Gdp'])
                    $('#QOS').text((data.compare[3]['QOS']*5).toFixed(1)+'/5')
                    $('#QON').text((data.compare[3]['QON']*5).toFixed(1)+'/5')

                    $('#incresed_rev').text('Incresed by '+(((data.compare[3]['Revenue']-data.compare[2]['Revenue'])*100)/data.compare[3]['Revenue']).toFixed(1)+'%')
                    $('#incresed_gdp').text('Incresed by '+(((data.compare[3]['Gdp']-data.compare[2]['Gdp'])*100)/data.compare[3]['Gdp']).toFixed(1)+'%')
                    $('#incresed_qos').text('Decresed by '+(((data.compare[3]['QOS']-data.compare[2]['QOS'])*100)/data.compare[3]['QOS']).toFixed(1)+'%')
                    $('#incresed_qon').text('Decresed by '+(((data.compare[3]['QON']-data.compare[2]['QON'])*100)/data.compare[3]['QON']).toFixed(1)+'%')
                    
                    $('#qos-title').tooltip({title: "Quality of Service"});
                    $('#qon-title').tooltip({title: "Quality of Network"});
                    $('.decinc').tooltip({title: "Compared to 2017"});

                    grrevuser=((((data.user[3]['Revenue']-data.user[2]['Revenue'])*100)/data.user[3]['Revenue']).toFixed(1))
                    grcapuser=((((data.user[3]['Capex']*-1-data.user[2]['Capex']*-1)*100)/(data.user[3]['Capex'])*-1).toFixed(1))
                    grsubs=((((data.user[3]['Nb_sub']-data.user[2]['Nb_sub'])*100)/data.user[3]['Nb_sub']).toFixed(1))

                
                    if(data.user[3]['Revenue']>data.user[2]['Revenue']){$('#rev_user h5').text('+'+grrevuser+'%')
                                                                        $('#rev_user').addClass('text-primary')
                                                                        }
                          else{$('#rev_user h5').text(grrevuser+'%')
                               $('#rev_user').addClass('text-danger')}

                    if((data.user[3]['Capex'])*-1 >-1*(data.user[2]['Capex'])){$('#capex_user h5').text('+'+grcapuser+'%')
                                                                        $('#capex_user').addClass('text-primary')
                                                                        }
                          else{$('#capex_user h5').text(grcapuser+'%')
                               $('#capex_user').addClass('text-danger')}         

                    if(data.user[3]['Nb_sub']>data.user[2]['Nb_sub']){$('#subs_user h5').text('+'+grsubs+'%')
                                                                        $('#subs_user').addClass('text-primary')
                                                                        }
                          else{$('#subs_user h5').text(grsubs+'%')
                               $('#subs_user').addClass('text-danger')} 

                    grrevcomp=((((data.compare[3]['Revenue']-data.compare[2]['Revenue'])*100)/data.compare[3]['Revenue']).toFixed(1))
                    grcapcomp=((((Math.abs(data.compare[3]['Capex'])-Math.abs(data.compare[2]['Capex']))*100)/Math.abs(data.compare[3]['Capex'])).toFixed(1))
                    grsubscomp=((((data.compare[3]['Nb_sub']-data.compare[2]['Nb_sub'])*100)/data.compare[3]['Nb_sub']).toFixed(1))         
                    
                    if(data.compare[3]['Revenue']>data.compare[2]['Revenue']){$('#rev_comp h5').text('+'+grrevcomp+'%')
                                                                        $('#rev_comp').addClass('text-primary')
                                                                        }
                          else{$('#rev_comp h5').text(grrevcomp+'%')
                               $('#rev_comp').addClass('text-danger')}

                    if(-1*(data.compare[3]['Capex'])>-1*(data.compare[2]['Capex'])){$('#capex_comp h5').text('+'+grcapcomp+'%')
                                                                        $('#capex_comp').addClass('text-primary')
                                                                        }
                          else{$('#capex_comp h5').text(grcapcomp+'%')
                               $('#capex_comp').addClass('text-danger')}         

                    if(data.compare[3]['Nb_sub']>data.compare[2]['Nb_sub']){$('#subs_comp h5').text('+'+grsubscomp+'%')
                                                                        $('#subs_comp').addClass('text-primary')
                                                                        }
                          else{$('#subs_comp h5').text(grsubscomp+'%')
                               $('#subs_comp').addClass('text-danger')} 

                    //PIB
                    var averagePibUser =0;
                    (data.user).forEach(function(element) {
                            averagePibUser=averagePibUser + element.Gdp
                       });

                    averagePibUser=averagePibUser/(data.user).length

                    var averagePibcomp =0;
                    (data.compare).forEach(function(element) {
                            averagePibcomp=averagePibcomp + element.Gdp
                       });   
                    averagePibcomp=averagePibcomp/(data.compare).length   
                  
                    $.get("/country",{iso2_count_user:info_user[0].ISO2, iso2_count_comp:info_comp[0].ISO2},function(data){
                    if(!data){
                    console.log("No dataaaaaa");
                    }
                    else{ 
                          console.log(data)
                         $('#name_user_gdp').text(data.user_country[0].Country)
                         $('#name_user_gdp_val').text('$ '+averagePibUser.toFixed(2))
                         $('#name_comp_gdp').text(data.compare_country[0].Country)
                         $('#name_comp_gdp_val').text('$ '+averagePibcomp.toFixed(2))     
                    } 
                    })  


                    ////LDA
                    $('#LDA').text('Main technologies used by '+info_comp[0].name)

                         



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
                        revenueuser.push( element.Revenue)
                   });
                   
                     var revenuecompare=[];
                   (data.compare).forEach(function(element) {
                        revenuecompare.push( element.Revenue)
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
                    label: 'Revenue of '+ info_user[0].name,
                    data: revenueuser,
                    backgroundColor: '#26B99A',
                    //borderWidth: 0,
                  };

                  var Capex_user = {
                    label: 'Capex of '+info_user[0].name,
                    data: capexuser,
                    backgroundColor: '#26B99A',
                    hidden: true,
                    //borderWidth: 0,
                  };

                  var Revenue_compare = {
                    label: 'Revenue of '+info_comp[0].name,
                    data: revenuecompare,
                    backgroundColor: '#03586A',
                    //borderWidth: 0,
                  };
                  var Capex_compare = {
                    label: 'Capex of '+info_comp[0].name,
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
                        scaleLabel: {
                           position: "top",
                           display: false,
                           labelString: '*10000 $',            
                      },
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
                console.log(qOScompare)    
              
              
                var qos_user = {
                    label: 'QOS of '+info_user[0].name,
                    data: qOSuser,
                    backgroundColor: 'rgba(38,185,154,0.31)',
                    borderColor :  'rgba(38,185,154,0.7)',
                    hidden: false,
                    //borderWidth: 0,
                  };
                  
                var qos_compare = {
                    label: 'QOS of '+info_comp[0].name,
                    data: qOScompare,
                    backgroundColor: 'rgba(3,88,106,0.3)',
                    borderColor :  'rgba(3,88,106,0.70)',
                    
                    //borderWidth: 0,
                  };      

               
                var chartData = {
                labels: ["2015", "2016", "2017", "2018"],  
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
                        beginAtZero: false
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
                    label: 'QON of '+info_user[0].name,
                    data: qONuser,
                    backgroundColor: 'rgba(38,185,154,0.31)',
                    borderColor :  'rgba(38,185,154,0.7)',
                  };
                   

                var qon_compare = {
                    label: 'QON of '+info_comp[0].name,
                    data: qONcompare,
                    //backgroundColor: '#03586A',
                    backgroundColor: 'rgba(3,88,106,0.3)',
                    borderColor :  'rgba(3,88,106,0.70)',
                  };
    

              
                var chartData = {
                labels: ["2015", "2016", "2017", "2018"],  
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
                        beginAtZero: false
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

            /**************graphepie subscibers chart********/
           
                 var subsuser=[];
                                 (data.user).forEach(function(element) {
                                      subsuser.push( element.Nb_sub)
                                 });
                                 
                  var subscompare=[];
                                 (data.compare).forEach(function(element) {
                                      subscompare.push( element.Nb_sub)
                                 });                

                var subs_user = {
                                  label: 'Number of subscribers of '+info_user[0].name,
                                  data: subsuser,
                                  backgroundColor: '#3e95cd',
                                  hidden: false,
                                  //borderWidth: 0,
                                };
                var subs_compare = {
                                  label: 'Number of subscribers of '+info_comp[0].name,
                                  data: subscompare,
                                  backgroundColor: '#8e5ea2',
                                  hidden: false,
                                  //borderWidth: 0,
                                };                

                var data_subs = {
                                  labels: ["2015", "2016", "2017", "2018"],
                                  datasets: [subs_user, subs_compare]
                                };                
               new Chart(document.getElementById("bar-chart-horizontal"), {
                  type: 'horizontalBar',
                  data:data_subs,
                  options: {
                    legend: { display: true },
                    title: {
                      display: false,
                      text: 'Predicted world population (millions) in 2050'
                    },yAxes: [{
                        scaleLabel: {
                           position: "top",
                           display: false,
                           labelString: '*10000 $',            
                      },
                        ticks:{beginAtZero: true}
                      }]
                    , 
                    animation:{
                      duration:4000,
                      easing:'easeInOutQuint'
                    }

                  }
              });

             


            
             /****************fin graphe*****************/


         }
 
        
    })
})

}

/*$(document).ready(function(){
                var averagePibUser =0;
                (data.user).forEach(function(element) {
                        averagePibUser=averagePibUser + element.Gdp
                   });

                averagePibUser=averagePibUser/(data.user).length   
               
                var averagePibcomp =0;
                (data.compare).forEach(function(element) {
                        averagePibcomp=averagePibcomp + element.Gdp
                   });   
                averagePibcomp=averagePibcomp/(data.compare).length

                new Chart(document.getElementById("pie-chart"), {
                    type: 'pie',
                    data: {
                      labels: [info_user[0].name, info_comp[0].name],
                      datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2"],
                        data: [averagePibUser.toFixed(1),averagePibcomp.toFixed(1)]
                      }]
                    },
                    options: {
                      responsive: true,
                      legend: {
                          display: false,
                          position:'bottom'
                       },
                      title: {
                        display: false,
                        text: 'Predicted world population (millions) in 2050'
                      },
                      animation: {
                        duration:4000,
                        animateScale: true,
                        animateRotate: true
                      }
                    }
                });
               

              });
*/




