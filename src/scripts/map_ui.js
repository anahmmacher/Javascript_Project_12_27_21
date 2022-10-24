


export const buttontoggle = document.addEventListener("click", (e) => {
	if(((e.target.matches('.total-ui')) || 
			(e.target.matches(".beer-ui")) || 
			(e.target.matches(".wine-ui")) || 
			(e.target.matches(".spirits-ui")) ||  
			(e.target.matches(".other-ui"))) && (!e.target.matches('.selected'))) {
		e.preventDefault();

		const total = document.querySelector(".total-ui")
		const beer = document.querySelector(".beer-ui")
		const wine = document.querySelector(".wine-ui")
		const spirits = document.querySelector(".spirits-ui")
		const other = document.querySelector(".other-ui")
		const map = document.querySelector("#map")

		const newSelect = e.target

		total.classList.remove('selected')
		beer.classList.remove('selected')
		wine.classList.remove('selected')
		spirits.classList.remove('selected')
		other.classList.remove('selected')

		newSelect.classList.add('selected')
		map.setAttribute('class', e.target.value)
		console.log(e);
	} ;

});