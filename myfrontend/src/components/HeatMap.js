import React from 'react'
import Chart from 'react-apexcharts'
function HeatMap({series2}) {
  
  const options= {
    chart: {
      height: 350,
      background: '#fff',
      fontFamily: 'Helvetica, Arial, sans-serif',
      type: 'heatmap',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: 'HeatMap Chart (Single color)'
    },
  }
  const series= [{
    name: 'January',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'February',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'March',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'April',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'May',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'June',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'July',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:2 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'August',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'September',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'October',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'November',
    data: [{x: "Ginyaki",y: 1},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  },
  {
    name: 'December',
    data: [{x: "Ginyaki",y: 0},{x: "DOMINO'S PIZZA",y:1 },{x: "SUBWAY F10",y:1},{x: "Jessies",y:1 },{x: "Subway",y:1},{x: "Pait Pooja",y: 1},{x: "Tehzeeb Bakers",y:1 },{x: "Doka Mocca",y:1 },{x: "Rayyans Fast Food",y:1 },{x: "Salt N'Pepper",y:1 }]
  }
  ]
  return (
    <div style={{marginLeft:'28%'}}>
      <br/>
      <br/>
      <Chart options={options} series={series2} type="heatmap" width={700} height={500} />
    </div>
  )
}

export default HeatMap
