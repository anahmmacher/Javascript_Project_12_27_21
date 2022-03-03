
//  export function fn1(){

// // The svg
// var svg = d3.select("#map"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");

// // Map and projection
// var path = d3.geoPath();
// var projection = d3.geoMercator()
//     .scale(70)
//     .center([0, 20])
//     .translate([width / 2, height / 2]);

// // Data and color scale
// var data = d3.map();
// var colorScale = d3.scaleThreshold()
//     .domain([0.00, 3.00, 6.00, 9.00, 12.00, 15.00])
//     .range(['#19df37',
//             '#4de664',
//             '#80ed90',
//             '#b3f4bc',
//             '#e6fbe9']
// );

// // Load external data and boot
// Promise.all([
//     d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
//     d3.csv("https://github.com/anahmmacher/Javascript_Project_12_27_21/blob/main/src/data/test_data.csv", function (d) {
//         data.set(d.code, +d.Liters)
//     })
// ]).then(function (loadData) {
//     let topo = loadData[0]

//     // Draw the map
//     svg.append("g")
//         .selectAll("path")
//         .data(topo.features)
//         .join("path")
//         // draw each country
//         .attr("d", d3.geoPath()
//             .projection(projection)
//         )
//         // set the color of each country
//         .attr("fill", function (d) {
//             d.total = data.get(d.id) || 0;
//             return colorScale(d.total);
//         })
// })
