///// chartjs

const ctx = document.querySelector('#myChart').getContext('2d');

console.log(ctx);
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(58,123,231,1');
gradient.addColorStop(1, 'rgba(58,123,231,0.1');
const labels = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023,
];
const data = {
  labels,
  datasets: [
    {
      data: [201, 121, 2012, 23, 345],
      label: 'test stuff',
      fill: true,
      backgroundColor: gradient,
      tension: 0.6,
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return 'test ' + value + ' °C';
          },
        },
      },
    },
  },
  plugins: [],
};

const myChart = new Chart(ctx, config);

////
