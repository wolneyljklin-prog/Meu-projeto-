import { useEffect, useState } from "react";

export default function App() {
  const [viaturas, setViaturas] = useState({});
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://copom-interativo.onrender.com/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 🚔 viatura GPS
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

  return (
    <div style={{display:"flex", height:"100vh", background:"#111", color:"#fff"}}>

      {/* COLUNA OCORRÊNCIAS */}
      <div style={{width:"25%", padding:"10px", borderRight:"1px solid #333"}}>
        <h3>🚨 OCORRÊNCIAS</h3>

        {ocorrencias.map((o,i)=>(
          <div key={i} style={{background:"#600", padding:"8px", marginTop:"5px"}}>
            {o?.natureza || "Ocorrência"} 
          </div>
        ))}
      </div>

      {/* COLUNA CENTRAL */}
      <div style={{flex:1, padding:"10px"}}>
        <h2>🗺️ Mapa / Monitoramento</h2>

        {Object.values(viaturas).map((v,i)=>(
          <div key={i} style={{background:"#222", marginTop:"5px", padding:"10px"}}>
            🚔 {v.prefixo} - {v.lat}, {v.lng}
          </div>
        ))}
      </div>

      {/* VIATURAS */}
      <div style={{width:"25%", padding:"10px", borderLeft:"1px solid #333"}}>
        <h3>📡 VIATURAS</h3>

        {Object.keys(viaturas).map(k=>(
          <div key={k} style={{background:"#030", marginTop:"5px", padding:"5px"}}>
            {k}
          </div>
        ))}
      </div>

    </div>
  );
}
