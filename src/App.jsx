import { useEffect, useState } from "react";

const API = "https://copom-interativo.onrender.com";
const WS = "wss://copom-interativo.onrender.com/ws";

export default function App() {
  const [viaturas, setViaturas] = useState({});
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(WS);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 🚔 GPS
      if (data.prefixo) {
        setViaturas(prev => ({
          ...prev,
          [data.prefixo]: data
        }));
      }

      // 🚨 ocorrência
      if (data.tipo === "ocorrencia") {
        setOcorrencias(prev => [data.data, ...prev]);
      }

      // 🚨 pânico
      if (data.tipo === "panico") {
        alert("🚨 ALERTA DE APOIO URGENTE");
      }
    };
  }, []);

  // 🚨 criar ocorrência
  async function novaOcorrencia() {
    await fetch(API + "/ocorrencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        natureza: "DISPARO DE ARMA DE FOGO"
      })
    });
  }

  // 🚨 pânico
  async function panico() {
    await fetch(API + "/panico", {
      method: "POST"
    });
  }

  return (
    <div style={{display:"flex", height:"100vh", color:"#fff"}}>

      {/* COLUNA ESQUERDA */}
      <div style={{
        width:"25%",
        background:"#1a1a1a",
        padding:"10px",
        borderRight:"1px solid #333"
      }}>
        <h3>🚨 OCORRÊNCIAS</h3>

        <button onClick={novaOcorrencia}>Nova Ocorrência</button>

        {ocorrencias.map((o,i)=>(
          <div key={i} style={{
            background:"#600",
            marginTop:"5px",
            padding:"8px"
          }}>
            {o.natureza}
          </div>
        ))}
      </div>

      {/* COLUNA CENTRAL */}
      <div style={{
        flex:1,
        background:"#111",
        padding:"10px"
      }}>
        <h2>🗺️ MONITORAMENTO</h2>

        <button onClick={panico}>🚨 Pânico</button>

        {Object.values(viaturas).map((v,i)=>(
          <div key={i} style={{
            background:"#222",
            marginTop:"5px",
            padding:"10px"
          }}>
            🚔 {v.prefixo} | LAT: {v.lat} | LNG: {v.lng}
          </div>
        ))}
      </div>

      {/* COLUNA DIREITA */}
      <div style={{
        width:"25%",
        background:"#1a1a1a",
        padding:"10px",
        borderLeft:"1px solid #333"
      }}>
        <h3>📡 VIATURAS</h3>

        {Object.keys(viaturas).map(k=>(
          <div key={k} style={{
            background:"#030",
            marginTop:"5px",
            padding:"5px"
          }}>
            🚔 {k}
          </div>
        ))}
      </div>

    </div>
  );
}
