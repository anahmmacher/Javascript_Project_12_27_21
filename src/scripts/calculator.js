

export const alcoholCalculator = function(amount, type, serving){
    const beerPercent = 0.05
    const winePercent = 0.12
    const spiritPercent = 0.40

    const standardDrink = 0.01774413
    const fullCupVolume = 0.473176791


    let beerFullCup = fullCupVolume * beerPercent
    let wineFullCup = fullCupVolume * winePercent
    let spiritFullCup = fullCupVolume * spiritPercent

    if (serving === "standard-drink") {
        return amount / standardDrink
    } else if (serving === "full-cup" && type === "beer") {
        return amount / beerFullCup
    } else if (serving === "full-cup" && type === "wine") {
        return amount / wineFullCup
    } else if (serving === "full-cup" && type === "spirits") {
        return amount / spiritFullCup
    };
};