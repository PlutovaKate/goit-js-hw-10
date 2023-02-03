import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import listOfCountries from './templates/listOfCountries.hbs'
import oneCountryCard from './templates/oneCountryCard.hbs'

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const oneCardEl = document.querySelector('.country-info');


function handleSearchInput(event){

    let nameOfCountry = event.target.value.trim()
    
    if (nameOfCountry === ''){
        clearInput()
        return
    };

    fetchCountries(nameOfCountry)
    .then(data => {
        if(data.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        return
        }

        if(data.length >= 2 && data.length <= 10){
            console.log(data)
            countriesList.innerHTML = listOfCountries(data);
            oneCardEl.innerHTML ="";
        }

        if(data.length === 1){
            oneCardEl.innerHTML = oneCountryCard(data);
            countriesList.innerHTML ="";
        }

    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearInput();
    });
}

function clearInput(){
    countriesList.innerHTML = "";
    oneCardEl.innerHTML = "";
}

inputEl.addEventListener("input", debounce(handleSearchInput, DEBOUNCE_DELAY));