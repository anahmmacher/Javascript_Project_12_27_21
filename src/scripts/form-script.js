import {alcoholCalculator} from "./calculator.js"

export const cal = document.addEventListener("click", (e) =>{
    if(e.target.matches('.btn')) {
        e.preventDefault();

        let type = document.querySelector("#alcohol-type").value
        let amount = document.querySelector("#alcohol-amount").value
        let serving = document.querySelector("#cup-amount").value

        let totalCups = alcoholCalculator(amount, type, serving).toFixed(2);

        document.querySelector(".results > span").innerHTML = `${totalCups} `;

        const results = document.querySelector('p.results');

            results.classList.remove('not-visible');
    } 
});
