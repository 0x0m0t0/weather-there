import { aKey } from './key.js';

const main = document.querySelector('main');
const wet = document.getElementById('wet');
const search = document.getElementById('search');
// console.log(search);

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

    searchFunction(openW(lat, lon));
  }
});

searchBtn.addEventListener('click', (e) => {
  let input = searchInput.value;
  let city_country = input.split(',', 2);
  cityname = city_country[0];
  countrycode = city_country[1];

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
      // console.log(o);
      // console.log(o[0].lat);
      lat = o[0].lat;
      lon = o[0].lon;
      console.log(lat);
      console.log(lon);
    })
    .then(() => openW(lat, lon))
    .catch((err) => console.log('err', err));
};

const creationEl = (newDay, el, date_time, lastItem) => {
  let day = document.createElement('div');
  let moment = document.createElement('div');

  let temp = document.createElement('p');
  let date = document.createElement('p');
  let time = document.createElement('p');

  moment.setAttribute('class', 'moment');

  // moment.append(date);
  moment.append(time);
  moment.append(temp);

  let pClouds = document.createElement('div');
  let pHumidity = document.createElement('div');

  moment.append(pClouds);
  moment.append(pHumidity);

  day.append(moment);
  pHumidity.innerText = `Humidity ${el.main.humidity}%`;
  pClouds.innerText = `Clouds ${el.clouds.all}%`;

  // //// fix humidity levels with icons
  // if (el.clouds.all > 75) {
  //   pClouds.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path d="M18.286 22C20.337 22 22 20.42 22 18.47c0-1.544-1.045-2.857-2.5-3.336C19.295 13.371 17.72 12 15.81 12c-2.052 0-3.715 1.58-3.715 3.53c0 .43.082.844.23 1.226a2.948 2.948 0 0 0-.54-.05C10.248 16.706 9 17.89 9 19.353C9 20.815 10.247 22 11.786 22h6.5Z"/><path d="M21.551 14.55a5.261 5.261 0 0 0-.751-.486c-.66-2.101-2.686-3.564-4.99-3.564c-2.754 0-5.124 2.1-5.212 4.87c-1.321.37-2.41 1.342-2.867 2.63H6.286C3.919 18 2 16.104 2 13.765c0-2.34 1.919-4.236 4.286-4.236c.284 0 .562.028.83.08a5.576 5.576 0 0 1-.354-1.962C6.762 4.528 9.32 2 12.476 2c2.94 0 5.361 2.194 5.68 5.015C20.392 7.78 22 9.881 22 12.353c0 .78-.16 1.522-.449 2.197Z"/></g></svg>`;
  // } else if (el.clouds.all > 50) {
  //   pClouds.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 20q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20h-12Z"/></svg>`;
  // } else if (el.clouds.all < 25) {
  //   pClouds.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="512" viewBox="0 0 640 512"><path fill="currentColor" d="M575.2 325.7c.2-1.9.8-3.7.8-5.6c0-35.3-28.7-64-64-64c-12.6 0-24.2 3.8-34.1 10c-17.6-38.8-56.5-66-101.9-66c-61.8 0-112 50.1-112 112c0 3 .7 5.8.9 8.7c-49.6 3.7-88.9 44.7-88.9 95.3c0 53 43 96 96 96h272c53 0 96-43 96-96c0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3c43.7-43.7 114.7-43.7 158.4 0c9.7 9.7 16.9 20.9 22.3 32.7c9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2L237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2L81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8l-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4l-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5c-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3c8-4.7 16.3-8.8 25.2-11.7c5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z"/></svg>`;
  // } else if (el.clouds.all < 50) {
  //   pClouds.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M116 32V16a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm80 96a68 68 0 1 1-68-68a68.07 68.07 0 0 1 68 68Zm-24 0a44 44 0 1 0-44 44a44.05 44.05 0 0 0 44-44ZM51.51 68.49a12 12 0 1 0 17-17l-12-12a12 12 0 0 0-17 17Zm0 119l-12 12a12 12 0 0 0 17 17l12-12a12 12 0 1 0-17-17ZM196 72a12 12 0 0 0 8.49-3.51l12-12a12 12 0 0 0-17-17l-12 12A12 12 0 0 0 196 72Zm8.49 115.51a12 12 0 0 0-17 17l12 12a12 12 0 0 0 17-17ZM44 128a12 12 0 0 0-12-12H16a12 12 0 0 0 0 24h16a12 12 0 0 0 12-12Zm84 84a12 12 0 0 0-12 12v16a12 12 0 0 0 24 0v-16a12 12 0 0 0-12-12Zm112-96h-16a12 12 0 0 0 0 24h16a12 12 0 0 0 0-24Z"/></svg>`;
  // }

  temp.innerText = el.main.temp;
  temp.innerText = temp.innerText.concat(' ', '°C');
  time.innerText = date_time[1];
  // date.innerText = date_time[0];
  if (lastItem === 0) {
    moment.id = 'last-moment';
  }
};
let daysOf = 0;
let current;

const openW = (lat, lon) => {
  const fetching = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aKey}&units=metric`,
  )
    .then((res) => res.json())
    .then((w) => {
      console.log(w);
      console.log(w.list);
      cityh2.textContent = w.city.name;

      let weekTemps = [];

      let today = new Date();
      let nextDay = new Date(today);
      let nextString = nextDay.toISOString().split('T')[0];
      let objWeek;
      w.list.forEach((date) => {
        let apiDate = date.dt_txt.slice('', -9);

        if (apiDate == nextString) {
          if (weekTemps !== []) {
            for (const key of weekTemps) {
              if (apiDate == key.Date) {
                key.list.push(date);
              }
            }
          }
        } else {
          nextDay.setDate(nextDay.getDate() + 1);
          console.log(nextDay);
          nextString = nextDay.toISOString().split('T')[0];
          weekTemps.push({ Date: apiDate, list: [] });

          if (weekTemps !== []) {
            for (const key of weekTemps) {
              if (apiDate == key.Date) {
                key.list.push(date);
              }
            }
          }
        }
      });
      console.log(weekTemps);
      console.log(objWeek);

      w.list.forEach((time) => {
        let apiDate = time.dt_txt.slice('', -9);

        if ((apiDate = week)) {
        }
      });

      let cleanData = w.list.map((item) => ({
        date: item.dt_txt.slice('', -9),
        time: item.dt_txt.slice(-8),
        clouds: item.clouds,
        temp: item.main.temp,
        humidity: item.main.humidity,
        country: w.city.country,
        id: w.city.id,
        wind: item.wind,
        temp_min: item.main.temp_max,
        temp_max: item.main.temp_min,
      }));

      // const lool = Object.entries(w.city).map((it) => ({
      //   id: w.city.id,
      //   country: w.country,
      //   name: w.name,
      // }));

      // const newTest = cleanData.map((ob, ind) => ({
      //   ...ob,
      //   ...w.city,
      // }));

      // let week = document.getElementsByClassName('week')[0];
    })
    .catch((err) => console.log('err', err));
};
// openW();
