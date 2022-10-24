
import {dataPojo} from "./test.js"
import {modal} from "./scripts/modal"
import {aMap} from "./scripts/map_render_script.js"
import {alcoholCalculator} from "./scripts/calculator.js"
import {cal} from "./scripts/form-script.js"
import { buttontoggle } from "./scripts/map_ui"


document.addEventListener("DOMContentLoaded", () => { 
    aMap();
    modal();
    alcoholCalculator();
    cal();
		buttontoggle();


})
// //     console.log(filtered);
//     let mapURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
        
//     let alcoholURL = 'https://raw.githubusercontent.com/anahmmacher/Javascript_Project_12_27_21/main/world_data_basic.json'

//     let mapData
//     let alcoholData

//     var svg = d3.select("#map"),
//      width = +svg.attr("width"),
//      height = +svg.attr("height");

//     var projection = d3.geoRobinson()
//                     .scale(150)
//                     .center([0, 50])
//                     .translate([width / 2, height / 3])

//     let canvas = d3.select('#map');


//     let drawMap = () => {

//         canvas.selectAll('path')
//                     .data(mapData)
//                     .enter()
//                     .append('path')
//                     .attr('d', d3.geoPath()
//                     .projection(projection)
//                     )
//                     .attr('class', 'country')
//                     .attr('fill', (mapDataItem) => {
//                         let id = mapDataItem['id']
//                         let country = alcoholData.find((item)=> {
//                             return item.dims['ID'] === id
//                         })
//                             let alcoholAvg = country['Value'];
//                             if(alcoholAvg === 'undefined') alcoholAvg = 'No Data'
//                             if(alcoholAvg <= 1.00){
//                                 return '#fbe7ee'
//                             } else if (alcoholAvg <= 4.00){
//                                 return '#f4b7cd'
//                             } else if (alcoholAvg <= 7.00){
//                                 return '#ec87ac'
//                             } else if (alcoholAvg <= 10.00){
//                                 return '#e4578b'
//                             } else if (alcoholAvg <= 14.00){
//                                 return '#dd276a'
//                             } else {
//                                 return 'gray'
//                             }
//                     })
//     }

//     d3.json(mapURL).then(
//         (data, error) => {
//             if (error) {
//                 console.log(log)
//             } else {
//                 mapData = data.features
//                 console.log(mapData)

//                 d3.json(alcoholURL).then(
//                     (data, error) =>{
//                         if(error){
//                             console.log(error)
//                         }else{
//                             alcoholData = data.fact
//                             console.log(alcoholData)
//                             drawMap()
//                         }
//                     }
//                 )
//             }
//         }
//     )
// });

// // async function getData1(){
// //     const response1 = await fetch('./world_data.json');
// //     const data1 = await response1.json();
// //     console.log(data1);
// //     return data1;
// // }

// // getData1()

// // getData2()

// // async function getData2() {
// //     const response2 = await fetch('./world_gender_data.json');
// //     const data2 = await response2.json();
// //     console.log(data2);
// //     return data2;
// // }
