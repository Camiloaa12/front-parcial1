import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import './Convertidor.css'

const ConvertidorMoneda = () => {
  const [valor, setValor] = useState('')
  const [unidadOrigen, setUnidadOrigen] = useState('USD')
  const [unidadDestino, setUnidadDestino] = useState('COP')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const unidadesMoneda = [
    { valor: 'USD', etiqueta: 'Dólar Estadounidense (USD)' },
    { valor: 'EUR', etiqueta: 'Euro (EUR)' },
    { valor: 'COP', etiqueta: 'Peso Colombiano (COP)' },
    { valor: 'GBP', etiqueta: 'Libra Esterlina (GBP)' }
  ]

  const convertir = async () => {
    if (!valor || isNaN(valor)) {
      setError('Por favor ingresa un valor numérico válido')
      return
    }

    setCargando(true)
    setError('')
    
    try {
      const respuesta = await fetch(API_ENDPOINTS.moneda, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor: parseFloat(valor),
          unidadOrigen,
          unidadDestino
        })
      })

      const datos = await respuesta.json()
      
      if (respuesta.ok) {
        setResultado(datos)
      } else {
        setError(datos.error || 'Error en la conversión')
      }
    } catch (error) {
      setError('Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="convertidor">
      <h2>💰 Convertidor de Moneda</h2>
      
      <div className="formulario">
        <div className="campo">
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setValor(value);
              }
            }}
            placeholder="Ingresa el valor"
            inputMode="decimal"
          />
        </div>

        <div className="campo">
          <label>De:</label>
          <select value={unidadOrigen} onChange={(e) => setUnidadOrigen(e.target.value)}>
            {unidadesMoneda.map(unidad => (
              <option key={unidad.valor} value={unidad.valor}>
                {unidad.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>A:</label>
          <select value={unidadDestino} onChange={(e) => setUnidadDestino(e.target.value)}>
            {unidadesMoneda.map(unidad => (
              <option key={unidad.valor} value={unidad.valor}>
                {unidad.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={convertir} 
          disabled={cargando}
          className="boton-convertir"
        >
          {cargando ? 'Convirtiendo...' : 'Convertir'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {resultado && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <p>
            <strong>{resultado.valorOriginal}</strong> {resultado.unidadOrigen} = 
            <strong> {resultado.valorConvertido.toFixed(2)}</strong> {resultado.unidadDestino}
          </p>
        </div>
      )}
    </div>
  )
}

export default ConvertidorMoneda