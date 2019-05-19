$(document).ready(function(){

  $.get("/accountCharts",{ISO2:"FR"},function(data){
                if(!data){
                console.log("No dataaaaaa");
                }
               else{
                    
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
                  }

});

});  