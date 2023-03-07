var value = 'total';

let legendLabels =
 {total:["< 1.00 L", "1.01 L - 4.00 L", "4.01 L - 7.00 L", "7.01 L - 10.00 L",  "> 10.00 L"],
 beer:["< 1.00 L", "1.01 L - 2.50 L", "2.51 L - 3.50 L", "3.51 L - 4.50 L",  "> 4.50 L"],
  wine:["< 0.50 L", "0.51 L - 1.50 L", "1.51 L - 3.00 L", "3.01 L - 4.00 L",  "> 4.00 L"], 
	spirits:["< 1.50 L", "1.51 L - 2.50 L", "2.51 L - 3.50 L", "3.51 L - 4.50 L",  "> 4.50 L"], 
	other:["< 1.00 L", "1.01 L - 2.00 L", "2.01 L - 3.00 L", "3.01 L - 4.00 L",  "> 4.00 L"] }

export function bMap(){ 
// set up the svg container and map projection
let margin = {top: 20, right: 10, bottom: 60, left: 20},
    							width = 990 - margin.left - margin.right,
    							height = 550 - margin.top - margin.bottom;

	let svg = d3.select("#map")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("class", "map")
 .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

let projection = d3.geoRobinson()
    .scale(160)
		.center([20,20])
    .translate([width / 2, height / 2]);

let path = d3.geoPath()
    .projection(projection);

// add a tooltip element
let tooltip = d3.select("#tooltip")
      .style("opacity", 0)
      .attr("id", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")

let setColorScale = function(value){
	let color;
if (value === 'total') {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([1.00, 4.00, 7.00, 10.00])
    .range(["#f7ccdb","#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
} else if (value === 'beer') {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([1.00, 2.50, 3.50, 4.50])
    .range(["#f7ccdb","#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
} else if (value === 'wine') {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([0.50, 1.50, 3.00, 4.00])
    .range(["#f7ccdb","#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
} else if (value === 'spirits') {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([1.50, 2.50, 3.50, 4.50])
    .range(["#f7ccdb","#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
} else if (value === 'other') {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([1.00, 2.00, 3.00, 4.00])
    .range(["#f7ccdb","#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
} else {
  color = d3.scaleThreshold()
		.unknown("#808080")
    .domain([1.00, 4.00, 7.00, 10.00])
    .range(["#f7ccdb", "#ec87ac", "#dd276a", "#a0194b", "#6b1032"]);
}
return color;
}

let colorScale = setColorScale();

let properCase =function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
};

// load the geoJSON and csv data
let promises = [
  d3.csv("https://raw.githubusercontent.com/anahmmacher/Javascript_Project_12_27_21/main/js_data_update.csv"),
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
];

Promise.all(promises).then(function(data) {
	let alcoholData = data[0];
  let worldMap = data[1];

  // join the csv data with the geoJSON features
  let joinedData = worldMap.features.map(function(d) {
    let country = d.id;
    let alcohol = alcoholData.find(function(obj) {
      return obj.code === country;
    });
    d.properties.alcohol = alcohol;
    return d;
  });
	console.log(joinedData)

  // add the countries to the svg as path elements
  svg.selectAll("path")
      .data(joinedData)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", function(d) {
        let alcoholValue = d.properties.alcohol[value];
        return colorScale(alcoholValue);
      })
			.attr("id", function(d){
				if(d.id === "-99"){
					return "NCY"
				} else {
					return d.id
				}
			})
      .on("mouseover", function(d) {
        let alcoholValue = d.properties.alcohol[value];
        d3.select("#tooltip")
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px")
					.html(function(){
							if(isNaN(alcoholValue)){
								return `<p>${d.properties.name}: <span id="codata">No Data</span></p>`
							} else {
								return `<p>${d.properties.name}: <span id="codata">${d3.format(".2f")(alcoholValue)} L</span></p>`
							}
						})
          //.html("<strong>" + d.properties.name + "</strong><br>" + "Alcohol Consumption: " + alcoholValue + " L");
        d3.select("#tooltip")
				.style("opacity", 1);
      })
      .on("mouseout", function(d) {
        d3.select("#tooltip")
				.style("opacity", 0)});
      });

  // add a title element that dynamically changes based on the alcohol value displayed
  let title = svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
		.attr("class", "map-title")
    .attr("text-anchor", "middle")
    .text("Recorded Alcohol per Capita Consumption - 2019 : " + properCase(value) + " *");

  // add a legend element that dynamically changes based on the alcohol value displayed
		let legend_x = 0
    let legend_y = height - 140
		let legendWidth = 120;
		let legendHeight = 100;


  let legend = svg.append("g")
    .attr("class", "legendQuant")
    .attr("transform", "translate(" + legend_x + "," + legend_y+")");

  legend.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "start")
    .attr("class", "legend-title")
    .text("Avg. Pure Alcohol in Liters");

  let labels = legend.selectAll(".label")
    .data(colorScale.range())
    .enter().append("g")
    .attr("class", "label")
    .attr("transform", function(d, i) {
      return `translate(0, ${i * 20 + 10})`});


labels.append("rect")
.attr("x", 0)
.attr("y", 0)
.attr("width", 15)
.attr("height", 15)
.style("fill", function(d) {
return d;
});

labels.append("text")
.attr("x", 20)
.attr("y", 10)
.attr("text-anchor", "start")
.text(function(d, i) {
let domain = legendLabels.total;
return domain[i] ;
});

// add event listeners to the buttons to update the map and title
d3.selectAll(".ui-button").on("click", function() {
updateMap(this.value);
});


function updateMap(newValue) {
// update the fill color of the path elements based on the new value
value = newValue
let newColorScale = setColorScale(value)


svg.selectAll("path")
.transition()
.duration(500)
.attr("fill", function(d) {
let alcoholValue = d.properties.alcohol[newValue];
return newColorScale(alcoholValue);
});

// update the title and legend text
title.text("Recorded Alcohol per Capita Consumption - 2019 : " + properCase(value) + " *");

if (legendLabels.hasOwnProperty(newValue)) {
    let labelsData = legendLabels[newValue];
    let labels = legend.selectAll(".label").data(labelsData);

    labels.select("text")
      .text(function(d, i) {
        return labelsData[i];
      });
  }

// let newDomain = newColorScale.domain
// console.log(newDomain)
// labels.selectAll("text")
// 	.data(newDomain)
// 	.each(function(d, i) {
// 		d3.select(this).text([i] + " - " + [i + 1]);
// 	});

// }




}

};