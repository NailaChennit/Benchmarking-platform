$(document).ready(function(){

 
  var idx='SNMMF';

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
                //console.log(info_statement);
                bar_hor_subs(info_statement);
                QOS_QON_line(info_statement)
                Revenue_Capex_Bar(info_statement)
                
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




  function AddRowRatio(info_op_list,list_index,i){
      console.log(list_index[i])
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