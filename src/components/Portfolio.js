import React from 'react';
import React, { useState } from 'react';

function Portfolio() {

  const initPulse = []; 
  const [pulse, setPulse] = useState(initPulse);

  fetch('https://iot-opettaja.azurewebsites.net/api/HttpTriggerCSharp2?code=mDniSJtbOvdFMvOqapzzY506azTIbraWxtejgzhX8Ti4sY2p/kjoDg==&deviceId=1f0038001847393035313138&amount=10')
    .then(response => response.json())
    .then(json => setPulse([...json]));

    return (
      <div>
        Kirjoita tänne sähköinen CV sekä tietoa opiskeluprojekteistasi tulevia työnantajia varten :)
      </div>
    )
}
    
export default Portfolio;