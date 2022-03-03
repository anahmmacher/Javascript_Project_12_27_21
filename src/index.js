import {dataPojo} from "./test.js"
// import {fn1} from "./scripts/map_render_script.js"


document.addEventListener("DOMContentLoaded", () => { 
    console.log("It's all working :)");
//     const filtered = Object.values(dataPojo).filter(obj => {
//         //  return parseInt(obj.dims.YEAR) === 2019;
//         if (obj.dims.YEAR === "2019" && obj.dims.ALCOHOLTYPE === "Other alcoholic beverages") return obj;
//         // console.log(obj)
//     }); 
//     console.log(filtered);
    let mapURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
        
    let alcoholURL = require('./data/world_data.json')

    let mapData
    let alcoholData

    let canvas = d3.select('#map');

    let drawMap = () => {

    }

    d3.json(mapURL).then(
        (data, error) => {
            if (error) {
                console.log(log)
            } else {
                mapData = data
                console.log(mapData)

                d3.json(alcoholURL).then(
                    (data, error) =>{
                        if(error){
                            console.log(error)
                        }else{
                            alcoholData = data
                            console.log(alcoholData)
                        }
                    }
                )
            }
        }
    )
});

// async function getData1(){
//     const response1 = await fetch('./world_data.json');
//     const data1 = await response1.json();
//     console.log(data1);
//     return data1;
// }

// getData1()

// getData2()

// async function getData2() {
//     const response2 = await fetch('./world_gender_data.json');
//     const data2 = await response2.json();
//     console.log(data2);
//     return data2;
// }
