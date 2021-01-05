import React from 'react';
import PropTypes from 'prop-types'; 

const Clima = ({resultado}) => {

    // Extraer los valores
    const { name, main, wind } = resultado;

    if(!name)return null;

    // Restar a grados Kelvin

    const kelvin = 273.15;
    const millas = 1.609;

    return ( 
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es: </h2>
                <p className="temperatura">
                    { parseFloat( main.temp - kelvin, 10 ).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Temperatura Maxima: 
                     { parseFloat( main.temp_max - kelvin, 10 ).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Temperatura Minima: 
                     { parseFloat( main.temp_min - kelvin, 10 ).toFixed(2)} <span> &#x2103; </span>
                </p>
                <p>Humedad:  
                     { main.humidity} %
                </p>
                <p>Presion Atmosferica:  
                     { main.pressure} hPa
                </p>
                <p>Viento:  
                     { parseFloat( wind.speed * millas, 10 ).toFixed(2)} Km/h 
                </p>

            </div>
        </div>
     );
}

Clima.propTypes = {
     resultado: PropTypes.object.isRequired
}
 
export default Clima;
