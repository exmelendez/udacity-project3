/* GLOBAL VARIABLES */
const generateBtn = document.getElementById('generate');
const modalBtn = document.getElementById('modalBtn');
const modalKeyword = document.getElementById('modalKeyword');
const zipcodeInput = document.getElementById('zip');
const inputText= document.getElementById('feelings');
const zipError = document.getElementById('zipErr');
const textError = document.getElementById('textErr');

const showModalBtn = () => {
  modalBtn.style.display = "flex";
};

const showError = (err) => {
  // TODO Add error handler
  console.log('Error modal');
};

const updateMainUi = data => {
  const tempDisplay = document.getElementById('tempDisplay');
  const weatherDesc = document.getElementById('weatherDesc');
  const weatherImg = document.getElementById('weatherImg');
  const weatherDivide = document.getElementById('weatherDivide');
  const wthrImgBaseUrl = 'https://openweathermap.org/img/wn/';
  const wthrImgExtUrl = '@2x.png';
  const wthrImgFormUrl = `${wthrImgBaseUrl}${data.icon}${wthrImgExtUrl}`;

  inputText.value = "";
  zipcodeInput.style.border = '0';

  tempDisplay.textContent = data.temp;
  weatherDesc.textContent = data.weatDescription;

  tempDisplay.style.visibility = 'visible';

  weatherDivide.style.display = 'flex';
  weatherImg.style.backgroundImage = `url(${wthrImgFormUrl})`;
  weatherImg.style.display = 'flex';

  zipError.classList.remove('input-error_show');
  textError.classList.remove('input-error_show');
};

const updateModalUi = data => {
  const entryDT = document.getElementById('entryDT');
  const temp = document.getElementById('temp');
  const textEntry = document.getElementById('textEntry');

  entryDT.textContent = data.entryDT;
  temp.textContent = data.temp;
  textEntry.textContent = data.text;
};

const getData = async () => {
  fetch('/data')
  .then(res => res.json())
  .then(data => {
    const isEmpty = Object.keys(data).length === 0;

    if(!isEmpty){
      showModalBtn();
      updateModalUi(data);
    } else {
      showError();
    }
  })
  .catch(error => console.log(error));
};


const getLatLon = async (baseUrl, zip, apiKey) => {
  const geoUrl = `geo/1.0/zip?zip=${zip},US`;

  const res = await fetch(`${baseUrl}${geoUrl}${apiKey}`)
  try {
    const data = await res.json();
    return await data;
  } catch (err) {
    showError(err);
  }
};

const getWeather = async (baseUrl, lat, lon, apiKey) => {
  const weatherUrl = `data/2.5/weather?lat=${lat}&lon=${lon}`;

  const res = await fetch(`${baseUrl}${weatherUrl}${apiKey}&units=imperial`)
  try {
    const data = await res.json();
    return await data;
  } catch (err) {
    showError(err);
  }
};

const postData = async ( url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    showError(err);
  }
};

const submitEntry = async () => {
  const baseUrl = 'https://api.openweathermap.org/';
  const apiKey = '&appid=d5b6158d16fade3dcd73273e5729301b';
  const subObj = {};

  const geoData = await getLatLon(baseUrl, zipcodeInput.value, apiKey);
  const weatherData = await getWeather(baseUrl, geoData.lat, geoData.lon, apiKey);

  subObj.temp = weatherData.main.temp.toFixed();
  subObj.text = inputText.value;
  subObj.icon = weatherData.weather[0].icon;
  subObj.weatDescription = weatherData.weather[0].main;

  const serverData = await postData('/addEntry', subObj);
  await updateModalUi(serverData);
  await updateMainUi(serverData);
  await showModalBtn();
};

modalBtn.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  const modalBtnArrow = document.getElementById('modalBtnArrow');

  modalBtnArrow.classList.toggle('dataBx__arrow_rotate');
  modal.classList.toggle('show');
  
  if(modalKeyword.textContent === "reveal") {
    modalKeyword.textContent = "hide";
  } else {
    modalKeyword.textContent = "reveal";
  }
});

generateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if(!zipcodeInput.value) {
    zipError.classList.add('input-error_show');
  } else if(!inputText.value) {
    textError.classList.add('input-error_show');
  } else {
    submitEntry();
  }
});

getData();