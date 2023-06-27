import { aKey } from './key.js';

const main = document.querySelector('main');
const wet = document.getElementById('wet');
const search = document.getElementById('search');
console.log(search);

const searchBtn = search.lastElementChild;
const searchInput = search.children[1];
let cityname;
let countrycode;

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let input = e.target.value;
    let city_country = input.split(',', 2);
    cityname = city_country[0];
    countrycode = city_country[1];
    console.log(cityname);
    searchFunction();
  }
});
let lat;
let lon;
const searchFunction = () => {
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
    .catch((err) => console.log('err', err));
  openW(lat, lon);
};
searchBtn.addEventListener('click', (e) => {
  console.log('hello mr search button');
});
const creationEl = (timeDay, el, date_time) => {
  let moment = document.createElement('div');
  let temp = document.createElement('p');
  let date = document.createElement('p');
  let time = document.createElement('p');
  moment.setAttribute('class', 'moment');
  moment.append(date);
  moment.append(time);
  moment.append(temp);
  timeDay.append(moment);
  temp.innerText = el.main.temp;

  time.innerText = date_time[1];
  date.innerText = date_time[0];
};

const openW = (lat, lon) => {
  const fetching = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aKey}&units=metric`,
  )
    .then((res) => res.json())
    .then((w) => {
      console.log(w);
      console.log(w.city.name);
      let p = document.createElement('p');
      p.textContent =
        w.city.name +
        ' has a population of ' +
        w.city.population +
        w.list[0].main.temp +
        '   ' +
        w.list[0].dt;
      wet.append(p);
      console.log(wet);

      wet.innerHTML = `
    <div><h2>${w.city.name}</h2>
    <div class="container">
    <div class="morning"> morning</div>
    <div class="noon">noon </div>
    <div class="evening"> evening</div>
    <div class="night">night </div>
    
    </div></div>`;

      w.list.forEach((el) => {
        const date_time = el.dt_txt.split(' ', 2);
        // console.log(date_time);

        const morning = document.getElementsByClassName('morning')[0];
        const noon = document.getElementsByClassName('noon')[0];
        const evening = document.getElementsByClassName('evening')[0];
        const night = document.getElementsByClassName('night')[0];

        /// show date of today separate
        /// if datenow is not equal to today
        switch (date_time[1]) {
          case '06:00:00':
            creationEl(morning, el, date_time);
            break;
          case '12:00:00':
            creationEl(noon, el, date_time);
            break;
          case '18:00:00':
            creationEl(evening, el, date_time);
            break;
          case '00:00:00':
            creationEl(night, el, date_time);
            break;
          default:
            console.log("idk what i'm doing");
        }
      });
    })
    .catch((err) => console.log('err', err));
};
// openW();
