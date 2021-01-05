import React, {Fragment, useState, useEffect} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';

function App() {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: "",
    pais: ""
  });

  const [ consultar, guardarConsultar ] = useState(false);
  const [ resutltado, guardarResultado ] = useState({});
  const [ error, gurdarError ] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    
    const consultarAPI = async () => {
      if(consultar){
        const appID = "4c3703a0069350ed1dc22059b49eb390"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);
        guardarConsultar(false);

        //Detectar si una ciudad no existe
        if(resultado.cod === "404"){
            gurdarError(true);
        }else{
           gurdarError(false);
        }
      
      }

    }

    consultarAPI();
    // eslint-disable-next-line
  },[consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados." /> 
  }else{
    componente = <Clima
                  resultado={resutltado}
                />
  }

  return (
      <Fragment>
        <Header
          titulo="Clima react App "
        />

        <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                      <Formulario
                        busqueda={busqueda}
                        guardarBusqueda={guardarBusqueda}
                        guardarConsultar={guardarConsultar}
                      />
                    </div>
                    <div className="col m6 s12">
                        {componente}
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
  );
}

export default App;
