import { aKey } from './key.js';

const main = document.querySelector('main');
const wet = document.getElementById('wet');
const search = document.getElementById('search');
console.log(search);

const searchBtn = search.lastElementChild;
const searchInput = search.children[1];
let cityname;
let countrycode;

let sectionToday = document.createElement('section');
let pToday = document.createElement('p');
let pClouds = document.createElement('p');
let pHumidity = document.createElement('p');
sectionToday.setAttribute('id', 'today');
let cityh2 = document.createElement('h2');
sectionToday.append(cityh2);
sectionToday.append(pToday);
sectionToday.append(pClouds);
sectionToday.append(pHumidity);
search.insertAdjacentElement('afterend', sectionToday);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let input = e.target.value;
    let city_country = input.split(',', 2);
    cityname = city_country[0];
    countrycode = city_country[1];
    console.log(cityname);
    searchFunction(openW(lat, lon));
  }
});

searchBtn.addEventListener('click', (e) => {
  let input = searchInput.value;
  let city_country = input.split(',', 2);
  cityname = city_country[0];
  countrycode = city_country[1];
  console.log(cityname);
  searchFunction(openW(lat, lon));
});

let lat;
let lon;
const searchFunction = (lat, lon) => {
  const geoloc = fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${countrycode}&limit=1&appid=${aKey}`,
  )
    .then((res) => res.json())
    .then((o) => {
      console.log(o);
      console.log(o[0].lat);
      lat = o[0].lat;
      lon = o[0].lon;
      console.log(lat);
      console.log(lon);
    })
    .then(() => openW(lat, lon))
    .catch((err) => console.log('err', err));
};
searchBtn.addEventListener('click', (e) => {
  console.log('hello mr search button');
});

const last = () => {
  // moment.setAttribute('id', 'last-moment');
  console.log('hahahahahhaa');
};

const creationEl = (timeDay, el, date_time, lastItem) => {
  if (lastItem === 0) {
    console.log('fuckyeah');
    let moment = document.createElement('div');
    let temp = document.createElement('p');
    let date = document.createElement('p');
    let time = document.createElement('p');
    moment.setAttribute('class', 'moment');

    // moment.append(date);
    moment.append(time);
    moment.append(temp);

    let pClouds = document.createElement('p');
    let pHumidity = document.createElement('p');

    moment.append(pClouds);
    moment.append(pHumidity);

    timeDay.append(moment);

    pHumidity.innerText = `Humidity ${el.main.humidity}%`;
    pClouds.innerText = `Clouds ${el.clouds.all}%`;

    temp.innerText = el.main.temp;
    temp.innerText = temp.innerText.concat(' ', '°C');
    time.innerText = date_time[1];
    // date.innerText = date_time[0];

    moment.id = 'last-moment';
    let lasty = document.getElementById('last-moment');
    console.log(lasty);
  } else {
    let moment = document.createElement('div');
    let temp = document.createElement('p');
    let date = document.createElement('p');
    let time = document.createElement('p');
    moment.setAttribute('class', 'moment');

    // moment.append(date);
    moment.append(time);
    moment.append(temp);

    let pClouds = document.createElement('p');
    let pHumidity = document.createElement('p');

    moment.append(pClouds);
    moment.append(pHumidity);

    timeDay.append(moment);

    pHumidity.innerText = `Humidity ${el.main.humidity}%`;
    pClouds.innerText = `Clouds ${el.clouds.all}%`;

    temp.innerText = el.main.temp;
    temp.innerText = temp.innerText.concat(' ', '°C');
    time.innerText = date_time[1];
    // date.innerText = date_time[0];
  }
};

const openW = (lat, lon) => {
  const fetching = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aKey}&units=metric`,
  )
    .then((res) => res.json())
    .then((w) => {
      console.log(w);
      console.log(w.city.name);

      cityh2.textContent = w.city.name;
      // +
      // ' has a population of ' +
      // w.city.population +
      // w.list[0].main.temp +
      // '   ' +
      // w.list[0].dt;

      wet.innerHTML = `
      <div>
    <div class="week"><h2>${w.city.name}</h2></div>
    <div class="container">
    <div class="morning"> <h2>morning</h2></div>
    <div class="noon"><h2>noon</h2> </div>
    <div class="evening"> <h2>evening</h2></div>
    <div class="night"> <h2>night</h2></div>
    
    </div></div>`;

      let week = document.getElementsByClassName('week')[0];
      let currentDate = new Date().toJSON().slice(0, 10);
      let cDate = new Date();

      for (let a = 1; a < 6; a++) {
        let nextDay = new Date(cDate);
        nextDay.setDate(cDate.getDate() + a);
        console.log(nextDay.toDateString().slice(0, 10));

        let weekday = document.createElement('h3');
        weekday.textContent = nextDay.toDateString().slice(0, 10);

        week.append(weekday);
      }
      w.list.forEach((el, idx) => {
        const date_time = el.dt_txt.split(' ', 2);
        // console.log(date_time);

        const morning = document.getElementsByClassName('morning')[0];
        const noon = document.getElementsByClassName('noon')[0];
        const evening = document.getElementsByClassName('evening')[0];
        const night = document.getElementsByClassName('night')[0];
        /// show date of today separate
        /// if datenow is not equal to today

        if (date_time[0] !== currentDate) {
          switch (date_time[1]) {
            case '06:00:00':
              if (idx == w.list.length - 1) {
                // console.log('hurray');
                creationEl(morning, el, date_time, last);
              }
              creationEl(morning, el, date_time);
              break;
            case '12:00:00':
              if (
                idx == w.list.length - 1 ||
                (idx === w.list.length - 2 && date_time[1] == '12:00:00')
              ) {
                //   console.log('hurray');
                alert('fuck');
                creationEl(noon, el, date_time, 0);
              } else {
                creationEl(noon, el, date_time);
              }

              break;
            case '18:00:00':
              if (idx == w.list.length - 1) {
                console.log('hurray');
              }
              creationEl(evening, el, date_time);
              break;
            case '21:00:00':
              if (idx == w.list.length - 1) {
                console.log('hurray');
              }
              creationEl(night, el, date_time);
              break;
            default:
              break;
          }
        } else {
          if (el == w.list[0]) {
            pHumidity.innerText = `Humidity ${w.list[0].main.humidity}%`;
            pClouds.innerText = `Clouds ${w.list[0].clouds.all}%`;
            pToday.innerText = w.list[0].main.temp;
            pToday.innerText = pToday.innerText.concat(' ', '°C');
          }
        }
        console.log(w.list.length);
      });
    })
    .catch((err) => console.log('err', err));
};
// openW();

let currentDate = new Date().toJSON().slice(0, 10);
console.log(currentDate); // "2022-06-17"
