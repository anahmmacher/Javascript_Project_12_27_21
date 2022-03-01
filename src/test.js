const worldData = require("../world_data.json")
console.log(worldData)
function parseData(data){
    let dataHash = {};
    for (let i = 0; i < data.fact.length; i++){
        dataHash[i] = worldData.fact[i]
    }
    return dataHash;
}
// console.log(parseData(worldData))

export const dataPojo = parseData(worldData)