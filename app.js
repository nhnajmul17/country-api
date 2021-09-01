const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('search-btn')
const countryContainer = document.getElementById('country-container');
const countryDetails = document.getElementById('country-details')
const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spinner')

searchButton.addEventListener('click', function () {
    console.log(spinner);
    const search = (searchInput.value);
    if (search == '') {
        errorDiv.innerText = "search field cannot be empty";
        return;
    }
    searchInput.value = '';
    countryContainer.innerHTML = '';
    countryDetails.innerHTML = '';

    const url = `https://restcountries.eu/rest/v2/name/${search}`;

    spinner.classList.remove('d-none');
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            setTimeout(() => {
                spinner.classList.add("d-none");
                showData(data);
            }, 1000);
        })


});

function showData(countryArray) {
    {
        if (countryArray.status === 404) {
            errorDiv.innerText = 'No result found';

        }
        else {
            errorDiv.innerText = '';
        }
        // console.log(data)
        countryArray.forEach(item => {
            // console.log(item.name);
            const div = document.createElement('div')
            div.classList.add('col-md-3')
            div.innerHTML = `
            
      <div class="rounded overflow-hidden border p-2">
      <img
        src=${item.flag}
        class="w-100"
        alt=""
      />
    </div>
    
    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
    >
      <h1>${item.name}</h1>
      <button  onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
    </div>`;
            countryContainer.appendChild(div)

        });

    }

}
function showDetails(alphaCode) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            countryDetails.innerHTML = `<div class="col-md-12">
            <h1>${data.name}</h1>
            <p>Capital: ${data.capital}</p>
         <p>Currency:${data.currencies[0].name}</p>
         <p>Currency Symbol:${data.currencies[0].symbol}</p>
            </div>`
        })

}