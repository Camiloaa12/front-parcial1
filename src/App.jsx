import { useState } from 'react'
import ConvertidorTiempo from './componentes/ConvertidorTiempo'
import ConvertidorPeso from './componentes/ConvertidorPeso'
import ConvertidorTemperatura from './componentes/ConvertidorTemperatura'
import ConvertidorMoneda from './componentes/ConvertidorMoneda'
import './App.css'

function App() {
  const [tipoConvertidor, setTipoConvertidor] = useState('tiempo')

  const renderizarConvertidor = () => {
    switch (tipoConvertidor) {
      case 'tiempo':
        return <ConvertidorTiempo />
      case 'peso':
        return <ConvertidorPeso />
      case 'temperatura':
        return <ConvertidorTemperatura />
      case 'moneda':
        return <ConvertidorMoneda />
      default:
        return <ConvertidorTiempo />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src="/logo.svg" alt="Logo Convertidor" className="logo" />
          <div className="header-text">
            <h1>Convertidor</h1>
          </div>
        </div>
      </header>
      
      <div className="main-container">
        <nav className="navegacion">
          <button 
            className={`boton-nav ${tipoConvertidor === 'tiempo' ? 'activo' : ''}`}
            onClick={() => setTipoConvertidor('tiempo')}
          >
             Tiempo
          </button>
          <button 
            className={`boton-nav ${tipoConvertidor === 'peso' ? 'activo' : ''}`}
            onClick={() => setTipoConvertidor('peso')}
          >
             Peso
          </button>
          <button 
            className={`boton-nav ${tipoConvertidor === 'temperatura' ? 'activo' : ''}`}
            onClick={() => setTipoConvertidor('temperatura')}
          >
             Temperatura
          </button>
          <button 
            className={`boton-nav ${tipoConvertidor === 'moneda' ? 'activo' : ''}`}
            onClick={() => setTipoConvertidor('moneda')}
          >
             Moneda
          </button>
        </nav>

        <main className="contenido">
          {renderizarConvertidor()}
        </main>
      </div>
    </div>
  )
}

export default App
