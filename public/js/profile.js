let countries = [];
fetch('https://restcountries.com/v3.1/all')
	.then(response => response.json())
	.then(response => countries = response)
	.catch(err => console.error(err));

    console.log(countries)

