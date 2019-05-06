/*************cloud*************/
$(document).ready(function(){
  console.log(data)})
/*  
var height=500, width=750;
var fill=d3.scale.category20b();
//console.log(data)
//var data=[{"text":"Ooredoo","size":1},{"text":"Djezzy","size":2},{"text":"Mobilis","size":3},{"text":"Orange","size":4},{"text":"Nrj","size":5},{"text":"Sfr ","size":6},{"text":"force","size":7},{"text":"energy","size":8},{"text":"solid-state","size":9},{"text":"particle","size":10}]
var focus=d3.select("#wordCloud").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "wordcloud")
    .append("g")
      .attr("class","pointer")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
var colorScale = d3.scale.linear()
              .domain([1,data.size])
              .range(["#393b79","#637939","#d5dc9c"]);

var sizeScale = d3.scale.linear()
              .domain([1,data.size])
              .range([5*(data.size-1)+15,15]);
 d3.layout.cloud().size([width, height])
    .words(data)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 0; })
    .font("Arial")
    .spiral("archimedean")
    //.spiral("rectangular")
    .fontSize(function(d, index) { return sizeScale(index); })
    .on("end", draw)
    .start();

     
function draw(words) {
  
    focus.selectAll("text")
      .data(words)
    .enter().append("name")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Arial")
      .style("fill", function(d, i) { return fill(i); })
      .on("click", function (d, i){
      window.open("https://www.google.com", "_blank"); console.log(d,i) } )
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
           
}
});
*/

/********************graphe*************************/
$(document).ready(function(){
 var chartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
  },
  {
    data: [639, 465, 493, 478, 589, 632, 674],
  }]
}; 


var chLine = document.getElementById("chLineRevenue").getContext('2d');;
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
      display: false
    }
  }

  });
}
});

$(document).ready(function(){
	
   $('#btncol').click(function(){   	
    $('#charts').collapse('toggle');
    $("#charts").on('hidden.bs.collapse', function(){
      setTimeout(function(){
      $('#charts').collapse('show');
	}, 300);
  });
   });
})
