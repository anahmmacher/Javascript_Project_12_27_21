var Promise = require('es6-promise').Promise;

export function aMap() {

// set the dimensions and margins of the graph
var margin = {top: 20, right: 10, bottom: 40, left: 100},
    width = 900 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// The svg
var svg = d3.select("#map")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// create a tooltip
    var tooltip = d3.select("#tooltip")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")

//map and projection

var projection = d3.geoRobinson()
  .scale(160)
  .center([20,20])
  .translate([width / 2 , height / 2]);

//data and color scale
var data = d3.map();

var domain = [0.00, 1.00, 4.00, 7.00, 10.00, 16.00]
var labels = ["< 1.00 L", "1.01 L - 4.00 L", "4.01 L - 7.00 L", "7.01 L - 10.00 L",  "> 10.01 L", ]
var range = ["#fbe7ee","#fab7cd", "#ec87ac", "#e4578b", "#dd276a"]
var colorScale = d3.scaleThreshold()
  .domain(domain)
  .range(range)
  .unknown("#808080");

  var promises = []

promises.push(d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"))
promises.push(d3.csv("https://raw.githubusercontent.com/anahmmacher/Javascript_Project_12_27_21/main/JS_data_alcohol.csv", function(d) { data.set(d.code, +d.liters); }))
myDataPromises = Promise.all(promises).then(function(topo){
 


let mouseOver = function(d) {
    	d3.selectAll(".topo")
    		
      		.transition()
      		.duration(200)
      		//.style("opacity", .8)
         	/*var population = data.get(d.id) || 0;
      	var min_pop = 0
      	var max_pop = domain[0]
      	for(var i = 0; i < domain.length; i++){
      		if (population >= min_pop && population <= max_pop)
      			break;
      		min_pop = domain[i]
      		if (i < domain.length-1)
      			max_pop = domain[i+1]
      		else
      			max_pop = 1e50
      	}*/
      	
    	d3.select(this)
    		//.filter(function(d){d.total = data.get(d.id) || 0; return d.total <= max_pop && d.total >= min_pop})
    		.transition()
      		.duration(200)
      		.style("opacity", 1)
      		.style("stroke", "black")
      
      	d.total = data.get(d.id);

        if(isNaN(d.total)) return "No Data";
      	
      	tooltip
          	.style("opacity", 0.8)
          	.style("left", (d3.event.pageX) + "px")		
          	.style("top", (d3.event.pageY - 28) + "px")
            .html(`<p>${d.properties.name}: <span id="codata">${d3.format(".2f")(d.total)}</span></p>`) ;
          	
        d3.select("#annotation")
    	.style("opacity", 0) 	
    }

    let mouseLeave = function(d) {
    d3.selectAll(".topo")
      .transition()
      .duration(200)
      .style("opacity", .7)
      
    d3.selectAll(".topo")
      .transition()
      .duration(200)
      .style("stroke", "transparent")
      
    tooltip
          .style("opacity", 0)
  }

   var topo = topo[0]

  svg.append("g")
     .selectAll("path")
     
     .data(topo.features)
     .enter()
     .append("path")
     .attr("class", "topo")
       // draw each country
       .attr("d", d3.geoPath()
         .projection(projection)
       )
       // set the color of each country
       .attr("fill", function (d) {
         d.total = data.get(d.id);
         return colorScale(d.total);
       })
       .style("opacity", .9)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )

    // Legend
    var legend_x = 0
    var legend_y = height - 140
    svg.append("g")
  		.attr("class", "legendQuant")
  		.attr("transform", "translate(" + legend_x + "," + legend_y+")");

	var legend = d3.legendColor()
    	.labels(labels)
      .titleWidth(120)
    	.title("Avg. Pure Alcohol in Liters")
    	.scale(colorScale)
    
    
     svg.select(".legendQuant")
  		.call(legend);

})};