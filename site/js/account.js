
  function popsummary(title,text){
    
    var summarizer = new JsSummarize();
    var summary = summarizer.summarize(title,text);
    $("#popupSummary div.modal-body").text(summary);
    $("#popupSummary h5.modal-title").text(title);
      $('#popupSummary').modal('show')
     
      
}




$(document).ready(function(){
var idx='SNMMF';


/*$('#btn_benchmark').click(function(){


     $.get("/visualization",{index_user:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ console.log(data) }

      })
    
  });*/



  Charts(idx);

  function Charts(idx){
         Infortaion_statement(idx);
         infortaion(idx);
      }


    function Infortaion_statement(idx){
    $.get("/info_statement",{index_user:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                var info_statement=data;
                bar_hor_subs(info_statement);
                QOS_QON_line(info_statement)
                Revenue_Capex_Bar(info_statement)
                growth(info_statement)
                
               }
             })
         }
   function infortaion(idx){
    $.get("/infos",{index:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
               
                var infos=data[0];
                $('#name').text(data[0].name)
                $('#website a').text(((data[0].website).replace('https://','')).replace('http://',''))
                $('#website a').attr('href',data[0].website)
                $('#yh__index ').text('Yahoo finance index : '+data[0].index_YH)
                $('#nb_employee ').text('Number of employee : '+data[0].nb_employee)
                $('#address').text('')
                $('#address').append('<pre style="font-family:Poppins;">'+(data[0].address).trim()+'</pre>')
                $('#phone ').text(data[0].phone)
                $('#fax').text(data[0].fax)
                $('#btn_benchmark').attr("href","http://127.0.0.1:3000/visualization.html?idx="+data[0].index_YH)
                //$('#2018').text('2018 statistics for '+ data[0].name)
                
                $('#name_comp').text(data[0].name)
               
                Draw_tabel_concurant(infos.ISO2)
                
               }
             })
         }


   function bar_hor_subs(info_statement){
            
             var subs=[];                     
                   (info_statement).forEach(function(element) {
                        subs.push(element.Nb_sub)
                   });
                
                
                var data_subs = {
                    label: 'Number of subsribers per year',
                    data: subs,
                    backgroundColor: 'rgba(38,185,154,0.31)',
                    borderColor :  'rgba(38,185,154,0.7)',
                  };
                   
                var chartData = {
                labels: ["2015", "2016", "2017", "2018"],  
                datasets: [data_subs]
              }; 


             new Chart(document.getElementById("bar-chart-horizontal"), {
                  type: 'horizontalBar',
                  data:chartData,
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

   }  

   function QOS_QON_line(info_statement){
              var qON=[];                     
                   (info_statement).forEach(function(element) {
                        qON.push(element.QON*100)
                   });
                
                var qOS=[];                     
                   (info_statement).forEach(function(element) {
                        qOS.push(element.QOS*100)
                   });    

                var qon = {
                    label: 'Quality of Network',
                    data: qON,
                    backgroundColor: 'rgba(38,185,154,0.31)',
                    borderColor :  'rgba(38,185,154,0.7)',
                  };
                   

                var qos = {
                    label: 'Quality of Service',
                    data: qOS,
                    //backgroundColor: '#03586A',
                    backgroundColor: 'rgba(3,88,106,0.3)',
                    borderColor :  'rgba(3,88,106,0.70)',
                  };

                  var chartData = {
                labels: ["2015", "2016", "2017", "2018"],  
                datasets: [qon,qos]
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
          }  

   function Revenue_Capex_Bar(info_statement){
      var revenueuser=[];  
                   (info_statement).forEach(function(element) {
                        revenueuser.push( element.Revenue)
                   });
       var capexuser=[];                     
                   (info_statement).forEach(function(element) {
                        capexuser.push(element.Capex)
                   });
        var revenueCanvas = document.getElementById("chBarRevenue");

                   Chart.defaults.global.defaultFontFamily = "Lato";
                   Chart.defaults.global.defaultFontSize = 15;

                  var Revenue_user = {
                    label: 'Revenue of ',
                    data: revenueuser,
                    backgroundColor: '#26B99A',
                    //borderWidth: 0,
                  };

                  var Capex_user = {
                    label: 'Capex of ',
                    data: capexuser,
                    backgroundColor: '#f78749',
                    hidden: true,
                    //borderWidth: 0,
                  };

                  var years = {
                    labels: ["2015", "2016", "2017", "2018"],
                    datasets: [Revenue_user,Capex_user]
                  };

                  var chartOptions = {
                    scales: {
                      xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 0.4
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

   }

   function Draw_tabel_concurant(id_country){
      
        var list_index=[];
        $.get("/Operateur_same_country",{id_country:id_country},function(data){ //tirer les op du mm pays
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                list_index=data;
                list_index.forEach(function(element,i){

                    $.get("/info_statement",{index_user:element.index_YH},function(data){ //tirer les info de l op
                    if(!data){
                    console.log("No dataaaaaa"); }

                   else{
                           //console.log(data)
                           AddRowRatio(data,list_index,i)
                       }
                      })
                 })//fin foreach
                  
              }
        })


        

          
         // $("#table_ratio").append(article);


        /*var container = document.getElementById('table_ratio'),
        tbl  = document.createElement('table');
        tbl.style.width  = '100px';
        tbl.style.border = '1px solid black';

        for(var i = 0; i < 3; i++){
            var tr = tbl.insertRow();
            for(var j = 0; j < 2; j++){
                if(i == 2 && j == 1){
                    break;
                } else {
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode('Cell'));
                    td.style.border = '1px solid black';
                    if(i == 1 && j == 1){
                        td.setAttribute('rowSpan', '2');
                    }
                }
            }
        }
        container.appendChild(tbl);
*/

   }
   show_articles(idx);
   
   function show_articles(idx){

    $.get("/article_account",{index:"VEON"},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{  
                       articles=data;    //pb resize
                       var carou1=articles.slice(0,5);

                       var carou2=articles.slice(5,10)
                      var carou3=articles.slice(10,15)
                       populate_caroussel(carou1,'#test')
                       populate_caroussel(carou2,'#test2')
                       populate_caroussel(carou3,'#test3')

                      

               }


  function populate_caroussel(list,id){

    list.forEach(function(element,index) {
                        var date =element['Date'].replace('T00:00:00.000Z','')
                        date=date.replace(/201.-/g,"2019-")
                       
                         var text = element['Text']

                   
                         text=text.replace(/''/g,'');
                         text=text.replace(/"/g,'');
                         text=text.replace(/’/g,'');
                         text=text.replace(/'/g,'');
                        var article =`<div class="col-lg-2" style="padding-right: 8px;padding-left: 8px;">
                               <div class="card">
                                  <div class="card-body">
                                    <div id="fitin" class="col" style="padding-left: 0px;padding-right: 0px;"><div class="card-title"><strong>`+element['Title']+`</strong></div></div>
                                    <br>
                                    <h6 class="card-subtitle mb-2 text-muted">`+date+`</h6>
                                    <a  onclick="popsummary('`+element['Title']+`','`+text.toString()+`')">Summary</a><br>
                                    <a  href="`+element['Link']+`">Article</a>
                                  </div>
                                </div>
                                </div>`
                                 $(id).append(article);
                      });
                         
                        $(function() {
                          while( $('#fitin div').height() > $('#fitin').height() ) { console.log('fsfsffsf')
                              $('#fitin div').css('font-size', (parseInt($('#fitin div').css('font-size')) - 1) + "px" );
                          }
                        });

                     }


    }) 

  }

  function growth(info_statement){ //premier ligne
      grrevuser=((((info_statement[3]['Revenue']-info_statement[2]['Revenue'])*100)/info_statement[3]['Revenue']).toFixed(1))
      grcapuser=((((info_statement[3]['Capex']*-1-info_statement[2]['Capex']*-1)*100)/(info_statement[3]['Capex'])*-1).toFixed(1))
      grsubs=((((info_statement[3]['Nb_sub']-info_statement[2]['Nb_sub'])*100)/info_statement[3]['Nb_sub']).toFixed(1))
      grpopu=((((info_statement[3]['Population']-info_statement[2]['Population'])*100)/info_statement[3]['Population']).toFixed(1))
      grgdp=((((info_statement[3]['Gdp']-info_statement[2]['Gdp'])*100)/info_statement[3]['Gdp']).toFixed(1))
      grqos=((((info_statement[3]['QOS']-info_statement[2]['QOS'])*100)/info_statement[3]['QOS']).toFixed(1))
      grqon=((((info_statement[3]['QON']-info_statement[2]['QON'])*100)/info_statement[3]['QON']).toFixed(1))


     text_color('#rev_user',info_statement[3]['Revenue'],grrevuser)
     text_color('#capex_user',info_statement[3]['Capex'],grcapuser)
     text_color('#gdp_user',info_statement[3]['Gdp'],grgdp)
     text_color('#popu_user',info_statement[3]['Population'],grpopu)
     text_color('#qos_user',info_statement[3]['QOS'],grqos)
     text_color('#qon_user',info_statement[3]['QON'],grqon)
     text_color('#subs_user',info_statement[3]['Nb_sub'],grsubs)


  }

  function text_color(id_tag,number, growth){

      $(id_tag+' h5').text(($(id_tag+' h5').text())+number)

      if(growth>0){   $(id_tag+' h6').text('+'+growth+'%')
                      $(id_tag +' h6').addClass('text-primary')
                                                      }
      else{  $(id_tag+' h6').text(growth+'%')
             $(id_tag + ' h6').addClass('text-danger')}


  }

  function AddRowRatio(info_op_list,list_index,i){
      
      var row;
      row=`<tr>
              <th scope="row">`+list_index[i].name+' ('+list_index[i].index_YH+')'+`</th>`;

      info_op_list.forEach(function(element){
             row=row+`<td>`+element.Nb_sub+`</td>`
              
      })
      row=row+'</tr>'
      $("#table_ratio").append(row);         
  }

});  