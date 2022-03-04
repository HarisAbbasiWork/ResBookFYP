import React from 'react'
import Chart from 'react-apexcharts'
function HeatMap({series2}) {
  
  const options= {
    chart: {
      height: 350,
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: '#870404',
        opacity: 2
    }, 
    
      background: '#9c1717dc',
      foreColor: '#ffffff',
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
  
  return (
    <div style={{marginLeft:'40%', marginTop:'0%'}}>
      <br/>
      <br/>
      <Chart options={options} series={series2} type="heatmap" width={900} height={600} />
    </div>
  )
}

export default HeatMap
