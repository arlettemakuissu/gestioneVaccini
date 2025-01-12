import { useState, useEffect } from "react";
import axios from "axios";


export const GestioneAdmin = () => {
  const [vaccini, setVaccini] = useState([]);
  const [bambini, setBambini] = useState([]);
  const [statistiche, setStatistiche] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedBambino, setSelectedBambino] = useState(null);
  const [statoVaccinazione, setStatoVaccinazione] = useState([]);
  const [selectedVaccino, setSelectedVaccino] = useState(null);
  const [newVaccino, setNewVaccino] = useState({ nome: "",descrizione:"" ,etaSomministrazione: "",intervalloCalcolazione:"" });
 


  const fetchVaccini = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/vaccini");
      setVaccini(response.data);
      console.log("Vaccini caricati:", response.data);
    } catch (error) {
      console.error("Errore nel caricamento dei vaccini:", error);
    }
  };

  const fetchBambini = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/bambini");
      setBambini(response.data);
      console.log("Bambini caricati:", response.data);
    } catch (error) {
      console.error("Errore nel caricamento dei bambini:", error);
    }
  };

  
 
   const onDeleteVaccino =  async (id) =>{
    
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8081/api/deleteVaccino/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Elemento con ID ${id} eliminato con successo!`);
        
        setVaccini((prev) => prev.filter((vaccino) => vaccino.id !== id));
      } else {
        console.error('Errore durante l\'eliminazione:', response.statusText);
      }
    } catch (error) {
      console.error('Errore nella connessione:', error);
    }
  };

   
  const fetchStatoVaccinazione = (bambinoId) => {
    console.log(`Caricamento stato vaccinazione per bambino: ${bambinoId}`);
    fetch(`http://localhost:8081/api/statovaccinazione/${bambinoId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Errore durante il recupero dello stato vaccinazione"
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("Stato Vaccinazione:", data);
        setStatoVaccinazione(data);
        setSelectedBambino(bambinoId);
        setActiveTab("statoVaccinazione"); 
      })
      .catch((err) =>
        console.error(
          "Errore durante il recupero dello stato vaccinazione:",
          err
        )
      );
  };
  const aggiornaStato = (bambinoId, vaccinoId, nuovoStato) => {
    console.log(bambinoId, vaccinoId, nuovoStato);
    fetch(`http://localhost:8081/api/updateStato`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bambinoId, vaccinoId, stato: nuovoStato }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Stato aggiornato con successo");
          selectedBambino === bambinoId
            ? fetchStatoVaccinazione(bambinoId)
            : fetchStatistiche();
        } else {
          console.error("Errore durante l'aggiornamento dello stato.");
        }
      })
      .catch((err) => console.error("Errore:", err));
  };

  

  const fetchStatistiche = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/statovaccinazioni"
      );
      setStatistiche(response.data);
      console.log("Statistiche caricate:", response.data);
    } catch (error) {
      console.error("Errore nel caricamento delle statistiche:", error);
    }
  };

  useEffect(() => {
    fetchVaccini();
    fetchBambini();
    fetchStatistiche();
    fetchStatoVaccinazione();
  }, []);
  
  const onAddVaccino = (e) =>{
    console.log(newVaccino);
    e.preventDefault();
    fetch("http://localhost:8081/api/vaccini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVaccino),
      
     
    })
      .then((res) => {
        if (res.ok) {
          setNewVaccino({ nome: "", descrizione: "", etaSomministrazione: "",intervalloCalcolazione:"" });
          fetchVaccini();
          setActiveTab("vaccini");
          
        } else {
          console.error("Errore durante l'aggiunta del vaccino.");
        }
      })
      .catch((err) => console.error("Errore:", err));
  };
  
  const updateVaccino = (vaccino) =>{
   setActiveTab("onUpdateForm")
   setSelectedVaccino(vaccino)

  }
 const handleUpdate = async(e) =>{
  console.log("eee")
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:8081/api/vaccino/${selectedVaccino.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedVaccino),
    });

    if (response.ok) {
      console.log("Vaccino aggiornato con successo!");
      fetchVaccini(); 
      setActiveTab("vaccini"); 
    } else {
      console.error("Errore durante l'aggiornamento del vaccino:", response.statusText);
    }
  } catch (error) {
    console.error("Errore nella connessione:", error);
  }

 }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVaccino({ ...selectedVaccino, [name]: value });
  };
  
  const renderContent = () => {
    if (activeTab === "vaccini") {
      return (
        <div>
          <h3 className="text-center">Lista dei Vaccini Disponibili</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome Vaccino</th>
                <th>Descrizione</th>
                <th>Età Somministrazione</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {vaccini.map((vaccino, index) => (
                <tr key={index}>
                  <td>{vaccino.nome}</td>
                  <td>{vaccino.descrizione}</td>
                  <td>{vaccino.etaSomministrazione}</td>
                  <td>
                    <button class="btn btn-primary" onClick={() =>updateVaccino(vaccino)}>
                      <i class="bi bi-pencil"></i> Update
                    </button>
                    <button class="btn btn-danger" onClick={() =>onDeleteVaccino(vaccino.id)}>
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            class="d-flex justify-content-center align-items-center"
           
          >
            <button class="btn btn-primary"  onClick={ () =>setActiveTab("addVaccini")}>Aggiungi Vaccino</button>
          </div>
        </div>
      );
    }
    
    if (activeTab==="addVaccini"){

      return <div>
       <h2 className="text-center">Aggiungi Nuovi Vaccini</h2>
      <form
        onSubmit={onAddVaccino}
        className="p-4 shadow rounded bg-info"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">nomeVaccino</label>
          <input
            type="text"
            className="form-control"
            value={newVaccino.nome}
            onChange={(e) => setNewVaccino({ ...newVaccino, nome: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <input
            type="text"
            className="form-control"
            value={newVaccino.descrizione}
            onChange={(e) => setNewVaccino({ ...newVaccino, descrizione: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">etaSomministrazione</label>
          <input
            type="number"
            className="form-control"
            value={newVaccino.etaSomministrazione}
            onChange={(e) => setNewVaccino({ ...newVaccino, etaSomministrazione: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">intervalloCalcolazione</label>
          <input
            type="number"
            className="form-control"
            value={newVaccino.intervalloCalcolazione}
            onChange={(e) => setNewVaccino({ ...newVaccino, intervalloCalcolazione: e.target.value })}
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
            onClick={() => setActiveTab("vaccini")}
           
          >
            Annulla
          </button>
        </div>
      </form>
      </div>
    }
     
    if(activeTab==="onUpdateForm"){
      return (
        <form
        onSubmit={handleUpdate}
        className="p-4 shadow rounded bg-light"
        style={{ maxWidth: "500px", margin: "0 auto", marginTop: "50px" }}
      >
        <h2 className="text-center mb-4">Aggiorna Vaccino</h2>
      
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={selectedVaccino.nome}
            onChange={handleInputChange}
            required
          />
        </div>
      
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <input
            type="text"
            className="form-control"
            name="descrizione"
            value={selectedVaccino.descrizione}
            onChange={handleInputChange}
            required
          />
        </div>
      
        <div className="mb-3">
          <label className="form-label">Età Somministrazione</label>
          <input
            type="text"
            className="form-control"
            name="etaSomministrazione"
            value={selectedVaccino.etaSomministrazione}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">IntervalloCalcolazione</label>
          <input
            type="text"
            className="form-control"
            name="intervalloCalcolazione"
            value={selectedVaccino.intervalloCalcolazione}
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
            onClick={() => setActiveTab("vaccini")} 
          >
            Annulla
          </button>
        </div>
      </form>
      )
    }


    if (activeTab === "statoVaccinazione") {
      return (
        <div>
          <h3 className="text-center">
            Stato Vaccinazione - Bambino #{selectedBambino}
          </h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Età Somministrazione</td>
                <td>Stato Vaccinazione</td>
                <td>Vaccini</td>
                <td>Intervallo Vaccinazione</td>
                <td>Azione</td>
              </tr>
            </thead>
            <tbody>
              {statoVaccinazione.length > 0 ? (
                statoVaccinazione.map((stat) => (
                  <tr key={stat.id}>
                    <td>{stat.etaSomministrazione}</td>
                    <td>{stat.statoSomministrazione}</td>
                    <td>{stat.nomeVaccino}</td>
                    <td>{stat.intervalloSomministrazione}</td>
                    <td>
                      {stat.statoSomministrazione === "INCOMPLETO" ? (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            aggiornaStato(
                              stat.bambinoId,
                              stat.vaccinoId,
                              "COMPLETO"
                            )
                          }
                        >
                          Completa
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            aggiornaStato(
                              stat.bambinoId,
                              stat.vaccinoId,
                              "INCOMPLETO"
                            )
                          }
                        >
                          Ripristina
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Nessuna statistica disponibile per questo bambino.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-center mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setStatoVaccinazione(null);
                setSelectedBambino(null);
                setActiveTab("bambini");
              }}
            >
              Torna alla lista
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === "bambini") {
      return (
        <div>
          <h3 className="text-center">Lista dei Bambini Registrati</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Nome</td>
                <td>Età (mesi)</td>
                <td>Data Nascita</td>
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
                      onClick={() => fetchStatoVaccinazione(bambino.id)}
                    >
                      Visualizza Vaccinazione
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "statistiche") {
      return (
        <div>
          <h3 className="text-center">Statistiche sulle Vaccinazioni</h3>
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

    return (
      <div>
        <h1 className="display-4 text-primary">Benvenuto!</h1>
        <p className="lead">
          Gestisci i vaccini, i bambini e analizza le statistiche in modo
          semplice ed efficace.
        </p>
      </div>
    );
  };

  return (
    <div className="d-flex">
      <nav
        className="bg-primary text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="text-center py-3 border-bottom">Gestione Vaccini</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link text-white ${
                activeTab === "dashboard" ? "active bg-secondary" : ""
              } rounded mb-2`}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${
                activeTab === "vaccini" ? "active bg-secondary" : ""
              } rounded mb-2`}
              onClick={() => setActiveTab("vaccini")}
            >
              <i className="fas fa-syringe"></i> Vaccini
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${
                activeTab === "statistiche" ? "active bg-secondary" : ""
              } rounded mb-2`}
              onClick={() => setActiveTab("statistiche")}
            >
              <i className="fas fa-chart-bar"></i> Statistiche
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${
                activeTab === "bambini" ? "active bg-secondary" : ""
              } rounded mb-2`}
              onClick={() => setActiveTab("bambini")}
            >
              <i className="fas fa-child"></i> Bambini
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex-grow-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default GestioneAdmin;
