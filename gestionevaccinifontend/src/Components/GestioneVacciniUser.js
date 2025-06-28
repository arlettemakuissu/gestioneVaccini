
import { useState ,useEffect} from "react";
import NavBarUser from "./NavBarUser";
import { useUser } from "./context/UserContext";
import axios from "axios";
import CreateStatisticheBambino from "./CreateStatisticheBambino";
import StatoVaccinazione from './StatoVaccinazione';

const GestioneVacciniUser = () =>{

  const { user } = useUser();
const [activeTab, setActiveTab] = useState("bambini");
const [bambini, setBambini] = useState([]);
const [addForm, setAddForm] = useState(false);
const [newBambino, setNewBambino] = useState({ nome: "", dataNascita: "" });
const [vaccini, setVaccini] = useState([]);
const [statistiche, setStatistiche] = useState(null); 
const [selectedBambino, setSelectedBambino] = useState(null); 
const [statoVaccinazione,setStatoVaccinazione] = useState([]);


  const fetchBambini = () => {
    fetch("http://localhost:8081/api/bambini")
      .then((res) => res.json())
      .then((data) => setBambini(data))
      .catch((err) => console.error("Errore durante il caricamento dei bambini:", err));
  };

  const aggiornaStato = (bambinoId, vaccinoId, nuovoStato) =>{

    console.log(bambinoId, vaccinoId, nuovoStato)
    fetch(`http://localhost:8081/api/updateStato`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bambinoId, vaccinoId, stato: nuovoStato }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Stato aggiornato con successo");
          selectedBambino === bambinoId ? fetchStatistiche(bambinoId) : fetchStatoVaccinazione();
        } else {
          console.error("Errore durante l'aggiornamento dello stato.");
        }
      })
      .catch((err) => console.error("Errore:", err));
  };

  const fetchVaccini = () => {
    fetch("http://localhost:8081/api/vaccini")
      .then((res) => res.json())
      .then((data) => setVaccini(data))
      .catch((err) => console.error("Errore durante il caricamento dei vaccini:", err));
  };
  const fetchStatoVaccinazione = () => {
    fetch("http://localhost:8081/api/statovaccinazioni")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatoVaccinazione(data);
        
      })
      .catch((err) => console.error("Errore durante il recupero delle statistiche:", err));
  };
  const fetchStatistiche = (bambinoId) => {
    console.log(bambinoId);
    fetch(`http://localhost:8081/api/statovaccinazione/${bambinoId}`)
  
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore durante il recupero delle statistiche");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setStatistiche(data); // Supponendo che data sia un array di statistiche
      setSelectedBambino(bambinoId);
    })
    .catch((err) => console.error("Errore durante il recupero delle statistiche:", err));
  }
  useEffect(() => {
    if (activeTab === "bambini") {
      fetchBambini();
    }else if(activeTab === "vaccini") {
      fetchVaccini();
    }else if(activeTab === "statistiche"){
      fetchStatoVaccinazione() ;
    }
  }, [activeTab]);
  
  const onAddBambino = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/api/bambino/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBambino),
    })
      .then((res) => {
        if (res.ok) {
          fetchBambini();
          setAddForm(false);
        } else {
          console.error("Errore durante l'aggiunta del bambino.");
        }
      })
      .catch((err) => console.error("Errore:", err));
  };
  
  
  const updateBambino = (bambino)  =>{
   setActiveTab("updateBambino");
   setSelectedBambino(bambino)

  }

  const handleInputChange  = (e) =>{
    const { name, value } = e.target;
    setSelectedBambino({ ...selectedBambino, [name]: value });
  }
  const handleUpdate = async(e) =>{
    console.log("eee")
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/bambino/${selectedBambino.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedBambino),
      });
  
      if (response.ok) {
        console.log("Vaccino aggiornato con successo!");
        fetchBambini(); 
        setActiveTab("bambini"); 
      } else {
        console.error("Errore durante l'aggiornamento del vaccino:", response.statusText);
      }
    } catch (error) {
      console.error("Errore nella connessione:", error);
    }
  }
  const onDeleteBambino = async (bambino) => {
    console.log(bambino.id);
    console.log("eeee");
    try {
      const response = await fetch(`http://localhost:8081/api/deleteBambino/${bambino.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Elemento con ID ${bambino.id} eliminato con successo!`);
        
        setBambini((prev) => prev.filter((getBambino) => getBambino.id !== bambino.id));
      } else {
        console.error('Errore durante l\'eliminazione:', response.statusText);
      }
    } catch (error) {
    
          
  }
}
  
  const renderBambini = () => (
    <div>
      <h2 className="text-center">Lista dei Bambini</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Età(mesi)</td>
            <td>DataNascita</td>
            <td>Azioni</td>
          </tr>
        </thead>
        <tbody>
          {bambini.map((bambino) => (
            <tr key={bambino.id}>
              <td>{bambino.nome}</td>
              <td>{bambino.eta}</td>
              <td>{bambino.dataNascita}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => fetchStatistiche(bambino.id)}
                >
                  Visualizza Vaccinazione
                </button>
                
              </td>
              <td>
                    <button class="btn btn-primary" onClick={() =>updateBambino(bambino)}>
                      <i class="bi bi-pencil"></i> Update
                    </button>
                    <button class="btn btn-danger" onClick={() =>onDeleteBambino(bambino)}>
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={() => setAddForm(true)}>
          Aggiungi Bambino
        </button>
      </div>
    </div>
  );
   

      


   
  const renderStatoVaccinazione=() =>(
    <div>
      <h3 className="text-center">Stato delle Vaccinazioni</h3>
    <table className="table table-striped">
            <thead>
              <tr>
                <td>Età Somministrazione</td>
                <td>Stato Vaccinazione</td>
                <td>Vaccino </td>
                <td>Bambino ID</td>
              </tr>
            </thead>
            <tbody>
              {statoVaccinazione.map((stat) => (
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
  )
  const renderStatistiche = () => (
    <div>
      <h2 className="text-center">Statistiche per il Bambino</h2>
      {statistiche && statistiche.length > 0 ? (
        <div>
          <p><strong>Bambino ID:</strong> {selectedBambino}</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Età Somministrazione</td>
                <td>Stato Vaccinazione</td>
                <td>Vaccini</td>
                
                <td>IntervalloVaccinazione</td>
                <td>Azione</td>
              </tr>
            </thead>
            <tbody>
              {statistiche.map((stat) => (
                <tr key={stat.id}>
                  <td>{stat.etaSomministrazione}</td>
                  <td>{stat.statoSomministrazione}</td>
                  <td>{stat.nomeVaccino}</td>
                  <td>{stat.intervalloSomministrazione}</td>

                 <td>
                 {stat.statoSomministrazione === "INCOMPLETO" ? (
                <button
                  className="btn btn-success"
                  onClick={() => aggiornaStato(stat.bambinoId, stat.vaccinoId, "COMPLETO")}
                >Completa</button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => aggiornaStato(stat.bambinoId, stat.vaccinoId, "INCOMPLETO")}
                >Ripristina</button>
              )}
                </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Nessuna statistica disponibile per questo bambino.</p>
      )}
      <div className="text-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setStatistiche(null);
            setSelectedBambino(null);
          }}
        >
          Torna alla lista
        </button>
      </div>
    </div>
  );
  const renderVaccini = () => (
    <div>
      <h2 className="text-center">Lista dei Vaccini</h2>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Età Somministrazione (mesi)</td>
            <td>Descrizione</td>
            <td>IntervalloCalcolazione</td>
           
          </tr>
        </thead>
        <tbody>
          {vaccini.map((vaccino) => (
            <tr key={vaccino.id}>
              <td>{vaccino.nome}</td>
              <td>{vaccino.etaSomministrazione}</td>
              <td>{vaccino.descrizione}</td>
              <td>{vaccino.intervalloCalcolazione}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderAddForm = () => (
    <div>
      <h2 className="text-center">Aggiungi Nuovo Bambino</h2>
      <form
        onSubmit={onAddBambino}
        className="p-4 shadow rounded bg-info"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={newBambino.nome}
            onChange={(e) => setNewBambino({ ...newBambino, nome: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data Nascita</label>
          <input
            type="date"
            className="form-control"
            value={newBambino.dataNascita}
            onChange={(e) => setNewBambino({ ...newBambino, dataNascita: e.target.value })}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">
            Salva
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAddForm(false)}
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
    const renderUpdateBambino = () => ( 
      <form
      onSubmit={handleUpdate}
      className="p-4 shadow rounded bg-light"
      style={{ maxWidth: "500px", margin: "0 auto", marginTop: "50px" }}
    >
      <h2 className="text-center mb-4">Aggiorna Bambino</h2>
    
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="nome"
          value={selectedBambino.nome}
          onChange={handleInputChange}
          required
        />
      </div>
    
      <div className="mb-3">
        <label className="form-label">DataNascita</label>
        <input
          type="date"
          className="form-control"
          name="dataNascita"
          value={selectedBambino.dataNascita}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-success">
          Aggiorna
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setActiveTab("bambini")} 
        >
          Annulla
        </button>
      </div>
    </form>
    )
  

  
  return (
    <div>
      <NavBarUser setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="container mt-4">
        {activeTab === "bambini" &&
          (statistiche ? renderStatistiche() : addForm ? renderAddForm() : renderBambini())}
          {activeTab === "vaccini" && renderVaccini()}
          {activeTab === "statistiche" && renderStatoVaccinazione()}
          {activeTab === "updateBambino" &&  renderUpdateBambino()}
      </div>
    </div>
  );
}
 export default GestioneVacciniUser;


