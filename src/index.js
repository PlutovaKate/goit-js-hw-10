import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const oneCardEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleSearchInput, DEBOUNCE_DELAY));

function handleSearchInput(event) {
  let nameOfCountry = event.target.value.trim();

  if (nameOfCountry === '') {
    clearInput();
    return;
  }

  fetchCountries(nameOfCountry)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length >= 2 && data.length <= 10) {
        renderCountriesList(data);
      }

      if (data.length === 1) {
        renderOneCountry(data);
      }
      
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearInput();
    });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
           <b>${country.name.official}</p>
                  </li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}



function renderOneCountry(countries) {

  const markup = countries
    .map(country => {
      return `<li>
    <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
       <b>${country.name.official}</b></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages).join(', ')}</p>
              </li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function clearInput() {
  countriesList.innerHTML = '';
  oneCardEl.innerHTML = '';
}
