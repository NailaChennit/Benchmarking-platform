list_countries={"Afghanistan":"AF","Albania":"AL","Algeria":"DZ","Angola":"AO","Argentina":"AR","Armenia":"AM","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahamas":"BS","Bangladesh":"BD","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bhutan":"BT","Bolivia":"BO","Bosnia and Herzegovina":"BA","Botswana":"BW","Brazil":"BR","Brunei Darussalam":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Colombia":"CO","Costa Rica":"CR","Croatia":"HR","Cuba":"CU","Cyprus":"CY","Czech Republic":"CZ","Côte dIvoire":"CI","Democratic Republic of Congo":"CD","Denmark":"DK","Djibouti":"DJ","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","Falkland Islands":"FK","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Southern and Antarctic Lands":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Greece":"GR","Greenland":"GL","Guatemala":"GT","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran":"IR","Iraq":"IQ","Ireland":"IE","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kosovo":"XK","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libya":"LY","Lithuania":"LT","Luxembourg":"LU","Macedonia":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Mali":"ML","Mauritania":"MR","Mexico":"MX","Moldova":"MD","Mongolia":"MN","Montenegro":"ME","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nepal":"NP","Netherlands":"NL","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","North Korea":"KP","Norway":"NO","Oman":"OM","Pakistan":"PK","Palestinian Territories":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","Republic of Congo":"CG","Romania":"RO","Russia":"RU","Rwanda":"RW","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Korea":"KR","South Sudan":"SS","Spain":"ES","Sri Lanka":"LK","Sudan":"SD","Suriname":"SR","Svalbard and Jan Mayen":"SJ","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syria":"SY","Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Trinidad and Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States of America":"US","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Venezuela":"VE","Vietnam":"VN","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"};

var id_user;
var info_user;
var info_comp;
 
  function popsummary(title,text){
    
    var summarizer = new JsSummarize();
    var summary = summarizer.summarize(title,text);
    $("#popupSummary div.modal-body").text(summary);
    $("#popupSummary h5.modal-title").text(title);
      $('#popupSummary').modal('show')
     
      
}

 function resetCanvas(id_canvas,id_container){
  $('#'+id_canvas).remove();
  $('#'+id_container).append('<canvas id="'+id_canvas+'"><canvas>');

}
function Display_companies(id_comp){
    //Compare_number_subs('T',id_comp);
    Info_compared(id_comp);
    bar_chart_revenue(id_user,id_comp)

}

  function Info_compared(idx){
   
    $.get("/infos",{index:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
               
                info_comp=data[0];
                var infos=data[0];
                $('#name_comp').text(data[0].name)
                $('#website_comp a').text(((data[0].website).replace('https://','')).replace('http://',''))
                $('#website_comp a').attr('href',data[0].website)
                $('#yh__index_comp ').text('Yahoo finance index : '+data[0].index_YH)
                $('#nb_employee_comp ').text('Number of employee : '+data[0].nb_employee)
                $('#address_comp').text('')
                $('#address_comp').append('<pre style="font-family:Poppins;">'+(data[0].address).trim()+'</pre>')
                $('#phone_comp ').text(data[0].phone)
                $('#fax_comp').text(data[0].fax)


                 $('#collapse_comp').collapse('toggle');
                    $("#collapse_comp").on('hidden.bs.collapse', function(){
                      setTimeout(function(){
                      $('#collapse_comp').collapse('show');
                  }, 300);
                  });
            
              }
      })
   }        

function bar_chart_revenue(id_user,idx){

    $.get("/charts",{index_user:id_user,index_compare:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{
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
                             
                             


                             Chart.defaults.global.defaultFontFamily = "Lato";
                             Chart.defaults.global.defaultFontSize = 15;

                            var Revenue_user = {
                              label: info_user.name+'('+info_user.index_YH+')',
                              data: revenueuser,
                              backgroundColor: '#26B99A',
                              //borderWidth: 0,
                            };

                            var Capex_user = {
                              label: info_user.name+'('+info_user.index_YH+')',
                              data: capexuser,
                              backgroundColor: '#26B99A',
                              hidden: true,
                              //borderWidth: 0,
                            };

                            var Revenue_compare = {
                              label: info_comp.name+'('+info_comp.index_YH+')',
                              data: revenuecompare,
                              backgroundColor: '#03586A',
                              //borderWidth: 0,
                            };
                            var Capex_compare = {
                              label: info_comp.name+'('+info_comp.index_YH+')',
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

                            
                            resetCanvas("chBarRevComp","contain_revenue");
                            var revenueCanvas = document.getElementById("chBarRevComp");

                              var barChart = new Chart(revenueCanvas, {
                              type: 'bar',
                              data: years,
                              options: chartOptions
                            });
                  }
           })       
}

$(document).ready(function(){
var idx=index_user;


$('#close').click(function(){

    $('#collapse_comp').toggle('toggle')
    setTimeout(function(){
       $('#collapse_comp').removeClass('show')
      $('#collapse_comp').attr('style','')}, 2000);
    
   

  })


$('#close').tooltip({title:'Close'}) 

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




$('#btn_benchmark').click(function(){ 
         $(this).prop("disabled", true);
      // add spinner to button
          $(this).html(
            `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...`
          );


       $.get("/visualization",{index_user:idx, maxy:'Economic'},function(data){

        if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                     
                      document.open();
                      document.write(data);
                      document.close();                      
               }
       })

})



  Charts(idx);
  var info_statement;
  function Charts(idx){
         Infortaion_statement(idx);
         infortaion(idx);
         Show_history(idx)
      }


    function Infortaion_statement(idx){
    $.get("/info_statement",{index_user:idx},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                info_statement=data;
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
                id_user=data[0].index_YH;
                info_user=data[0];
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
                
                //$('#name_comp').text(data[0].name)
               
                Draw_tabel_concurant(infos.ISO2,infos)
                show_articles(data[0].name);

                function getKeyByValue(object, value) {
                  return Object.keys(object).find(key => object[key] === value);
                }
                var country=getKeyByValue(list_countries,infos.ISO2);
                info_quarter_user(data[0].name,country)
                
               }
             })
         }


   function bar_hor_subs(info_statement){
            
             var subs=[];                     
                   (info_statement).forEach(function(element) {
                        subs.push(element.Nb_sub)
                   });
                
                subs=subs.reverse();
                var data_subs = {
                    label: 'Number of subsribers per year',
                    data: subs,
                    backgroundColor: 'rgba(38,185,154,0.31)',
                    borderColor :  'rgba(38,185,154,0.7)',
                  };
                   
                var chartData = {
                labels: ["2018", "2017", "2016", "2015"],  
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
               // console.log(qOS)   
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
                    label: 'Revenue  ',
                    data: revenueuser,
                    backgroundColor: '#26B99A',
                    //borderWidth: 0,
                  };

                  var Capex_user = {
                    label: 'Capital expenditure ',
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

   function Draw_tabel_concurant(id_country,infos_user){
      
        var list_index=[];
        $.get("/Operateur_same_country",{id_country:id_country},function(data){ //tirer les op du mm pays
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                list_index=delete_user(data,infos_user);
                list_index.forEach(function(element,i){

                    $.get("/info_statement",{index_user:element.index_YH},function(data){ //tirer les info de l op
                    if(!data){
                    console.log("No dataaaaaa"); }

                   else{
                           
                           AddRowRatio(data,list_index,i,info_statement)
                       }
                      })
                 })//fin foreach
                  
              }
        })

   }
   
   function delete_user(list_index,infos){
    list_index.forEach(function(element,i){
      if(element.index_YH==infos.index_YH){list_index.splice(i,1)}
    })
    return list_index
   }


   function show_articles(idx){

    $.get("/article_account",{index:idx},function(data){
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
                                    <div id="fitin" class="col" style="padding-left: 0px;padding-right: 0px;"><div class="card-title align-middle"style="height :95px font-size:25px"><strong>`+element['Title']+`</strong></div></div>
                                    <hr>
                                    <h6 class="card-subtitle mb-2 text-muted">`+date+`</h6>
                                    <a  onclick="popsummary('`+element['Title']+`','`+text.toString()+`')">Summary</a><br>
                                    <a  href="`+element['Link']+`">Article</a>
                                  </div>
                                </div>
                                </div>`
                                 $(id).append(article);
                      });
                         
                       /* $(function() {
                          while( $('#fitin div').height() > $('#fitin').height() ) { console.log('fsfsffsf')
                              $('#fitin div').css('font-size', (parseInt($('#fitin div').css('font-size')) - 1) + "px" );
                          }
                        });*/

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

  function AddRowRatio(info_op_list,list_index,i,info_statement){
      
      var row;
      row=`<tr>
              <th scope="row" onClick="Display_companies('`+list_index[i].index_YH+`')" class="pointer">`+list_index[i].name+` (`+list_index[i].index_YH+`)`+`</th>`;

     
      info_op_list.forEach(function(element,i){
             var growth=(-1*(((info_statement[i].Nb_sub-element.Nb_sub)*100)/info_statement[i].Nb_sub)).toFixed(1)

             if(growth<0){
             row=row+`<td ">`+element.Nb_sub+' '+'<font color=blue>'+growth+`%</font></td>`
           }
             else{
              row=row+`<td ">`+element.Nb_sub+' '+'<font color=red>'+growth+`%</font></td>`
             }
      })
      row=row+'</tr>'
      $("#table_ratio").append(row);         
  }


  function info_quarter_user(name_user,country){
      //name=name_user+', '+country;
      name="Swisscom";
     $.get("/quarter",{name:name},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                 AddRowQuarter(data)
               }
      })
  }


  function AddRowQuarter(data){
      
      var list_Q=['Q1','Q2','Q3','Q4'];
      var list_date=['2014','2015','2016','2017','2018']

      list_date.forEach(function(year,){
          var row;
          row=`<tr>
                  <th scope="row">`+year+`</th>`;

          list_Q.forEach(function(quarter,i){
            if(i!=0){
                 var growth=(((data[0][quarter+'_'+year]-data[0][list_Q[i-1]+'_'+year])*100)/data[0][quarter+'_'+year]).toFixed(0);
               }
            else { var growth='';} 
           var nb_sub=data[0][quarter+'_'+year];
           if(growth<0){
           row=row+`<td >`+nb_sub+' <font color=red>'+growth+`%</font></td>`
         }
           else{
            if(i!=0)
                  row=row+`<td >`+nb_sub+' <font color=blue>+'+growth+`%</font></td>`
            else  row=row+`<td >`+nb_sub+`</td>`    
           }
            
          })
          row=row+'</tr>'
          $("#table_quarter").append(row);   


      })
            
  }

  

});  

function Show_history(index){
    
     $.get("/history",{index:index},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{ 
                 Draw_table_history(data)
               }
      })

}

function Draw_table_history(data){

  var row;
  data.forEach(function(element, i){
    row=`<tr>
            <th scope="row" class="pointer">`+element.name+`</th>`;
    row=row+`<td style="font-weight: 500;">`+element.country+`</td>`        
    row=row+`<td style="font-weight: 500;">`+element.date+`</td>`
    row=row+`<td ><i id="`+element._id+`" class="pointer fas fa-times-circle" style="color: red;font-size: 17px;"></i></td>`
    row=row+'</tr>'
    $("#table_history").append(row); 
  })
}

/*function Delete(index){//modifiiie dans le server
 $('#table_history tr')[index].remove();
}*/

$(document).ready(function(){
  $('#table_history').on('click', 'tr td svg', function() {
  ($($(this).parent()).parent()).remove();

   var idRow=$(this).attr('id');
   $.get("/delete_history",{id:idRow},function(data){
            if(!data){
            console.log("No dataaaaaa");
            }
           else{ 

           }
      })            
  });


})