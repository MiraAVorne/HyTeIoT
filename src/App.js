import React, { useState } from 'react';
import './App.css';
import Chart from 'react-google-charts';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Portfolio from './components/Portfolio';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const initWeather = []; //esimerkiksi mahdollisia tulevia haun filtteröintejä varten tarvitaan state. Esim. näytetäänkö hakutuloksista vain tasatunnein mitatut
  const [weather, setWeather] = useState(initWeather);

  function convertUTCDateToLocalDate(date) {
    new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
    return date;
  }
  let chartHumData = [
    ['Aika', '%'],
    ['Please wait...', 0]
  ];
  let chartTempData = [
    ['Aika', '°C'],
    ['Please wait...', 0]
  ];
  fetch('https://iot-opettaja.azurewebsites.net/api/HttpTriggerCSharp2?code=mDniSJtbOvdFMvOqapzzY506azTIbraWxtejgzhX8Ti4sY2p/kjoDg==&deviceId=1f0038001847393035313138&amount=10')
    .then(response => response.json())
    .then(json => setWeather([...json]));
  let humtempkey = 1;
  const rows = () => weather.reverse().map(temphum => { //loopataan läpi uusimmat 10kpl (amount=10) mittaustuloksia
    if(chartHumData[1][0] === 'Please wait...'){
      chartHumData.pop();
    }
    if(chartTempData[1][0] === 'Please wait...'){
      chartTempData.pop();
    }
    chartHumData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Hum)])
    chartTempData.push([String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4], parseInt(temphum.Temp)])
    return <div key={humtempkey++}>
      <b>Klo:</b> {String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' ')[4]} &nbsp;
      <b>Ilmankosteus:</b> {temphum.Hum} % &nbsp;
      <b>Lämpötila:</b> {temphum.Temp} °C &nbsp;
      <b>Kastepiste:</b> {temphum.DP} °C 
    </div>
  }) 
  return (
    <Router>
      <div className="App">
      <Header />
      <Switch>
        <Route path="/portfolio">
            <Portfolio />
        </Route>
        <Route path="/">
          <div className="chartDiv">
            {rows()}
            <div>
              <Chart width={'100%'} height={300} chartType="ColumnChart" loader={<div>Loading Chart</div>} data={chartHumData} options={{title: 'Ilmankosteus', chartArea: { width: '50%' }, vAxis: { minValue: 0 }}} />
            </div>
            <div>
              <Chart width={'100%'} height={300} chartType="LineChart" loader={<div>Loading Chart</div>} data={chartTempData} options={{title: 'Lämpötila', chartArea: { width: '50%' }, vAxis: { minValue: 0 }}} />
              <a href="https://github.com/MiraAVorne/HyTeIoT" target="_BLANK" rel="noopener noreferrer">Projektin GitHub</a>
            </div> 
          </div>
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>
  );
}
export default App;
