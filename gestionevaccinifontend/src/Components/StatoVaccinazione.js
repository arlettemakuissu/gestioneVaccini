
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const StatoVaccinazione = ({bambinoId}) =>{

    const [statistiche, setStatistiche] = useState([]);

    // Fetch delle statistiche dal backend
    const fetchStatistiche = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/statovaccinazioni"
        );
        setStatistiche(response.data);
      } catch (err) {
        console.error("Errore nel recupero delle statistiche:", err);
      }
    };
  
    // Aggiorna lo stato di un vaccino
    const aggiornaStato = async (vaccinoId, nuovoStato) => {
      try {
        await axios.put("http://localhost:8081/api/updateStato", {
          bambinoId: bambinoId,
          vaccinoId: vaccinoId,
          stato: nuovoStato,
        });
        alert("Stato aggiornato con successo!");
        fetchStatistiche(); // Ricarica le statistiche aggiornate
      } catch (err) {
        console.error("Errore nell'aggiornamento dello stato:", err);
        alert("Errore nell'aggiornamento dello stato");
      }
    };
  
    // Effettua il fetch delle statistiche quando il componente è montato
    useEffect(() => {
      fetchStatistiche();
    }, [bambinoId]);
  
    return (
      <div>
        <h2>Statistiche Vaccinazioni</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
            <td>Età Somministrazione</td>
                <td>Stato Vaccinazione</td>
                <td>Vaccino </td>
                <td>Bambino ID</td>
            </tr>
          </thead>
          <tbody>
            {statistiche.map((stat) => (
              <tr key={stat.id}>
              <td>{stat.etaSomministrazione}</td>
              <td>{stat.statoSomministrazione}</td>
              <td>{stat.nomeVaccino}</td>
              <td>{stat.bambinoId}</td>
            
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}

export default StatoVaccinazione;