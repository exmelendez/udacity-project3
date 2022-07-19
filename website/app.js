/* Global Variables */
const generateBtn = document.getElementById('generate');
const zipcodeInput = document.getElementById('zip');
const modalBtn = document.getElementById('modalBtn');
const modal = document.getElementById('modal');
const modalBtnArrow = document.getElementById('modalBtnArrow');
const modalKeyword = document.getElementById('modalKeyword');

modalBtn.addEventListener('click', () => {
  modalBtnArrow.classList.toggle('dataBx__arrow_rotate');
  modal.classList.toggle('show');
  
  if(modalKeyword.textContent === 'reveal') {
    modalKeyword.textContent = "hide";
  } else {
    modalKeyword.textContent = "reveal";
  }
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/*
fetch('/')
  .then(response => response.json())
  .then(data => console.log(data));
*/
const getLatLon = async (baseUrl, zip, apiKey) => {
  const geoUrl = `geo/1.0/zip?zip=${zip},US`;

  const res = await fetch(`${baseUrl}${geoUrl}${apiKey}`)
  try {
    const data = await res.json();
    return await data;
  } catch (err) {
    console.log('error:', err);
  }
};

const getWeather = async (baseUrl, lat, lon, apiKey) => {
  const weatherUrl = `data/2.5/weather?lat=${lat}&lon=${lon}`;

  const res = await fetch(`${baseUrl}${weatherUrl}${apiKey}&units=imperial`)
  try {
    const data = await res.json();
    return await data;
  } catch (err) {
    console.log('error:', err);
  }
};

const submitEntry = async zip => {
  const baseUrl = 'https://api.openweathermap.org/';
  const apiKey = '&appid=d5b6158d16fade3dcd73273e5729301b';

  const geoData = await getLatLon(baseUrl, zip, apiKey);
  const weatherData = await getWeather(baseUrl, geoData.lat, geoData.lon, apiKey);
  console.log('geoData:', geoData);
  console.log('weatherData:', weatherData);

  /*
  const res = await fetch(`${baseUrl}${geoUrl}${apiKey}`)
  try {
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log('error:', err);
  }
  */

  /*
  .then(response => response.json())
  .then(data => console.log(data));
  */
};

generateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  submitEntry(zipcodeInput.value);
  zipcodeInput.value = '';
});

/*
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  return await allData;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

retrieveData('http://127.0.0.1/:4000');
*/

/*
FETCH INFO TO USE ZIP TO OBTAIN LAT/LON
https://api.openweathermap.org/geo/1.0/zip?zip=10463,US&appid=d5b6158d16fade3dcd73273e5729301b


FETCH INFO FOR WEATHER
https://api.openweathermap.org/data/2.5/weather?lat=40.8798&lon=-73.9067&appid=d5b6158d16fade3dcd73273e5729301b
*/