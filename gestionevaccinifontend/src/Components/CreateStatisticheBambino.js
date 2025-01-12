
import axios from "axios";

 const CreateStatisticheBambino = ({bambinoId,
  onSuccess}) => {

 const createStatistiche = async () =>{

    try {
        await axios.post(`http://localhost:8081/api/statovaccinazione/${bambinoId}`);
        alert("Statistiche create con successo!");
        if (onSuccess) onSuccess(); // Callback per aggiornare la vista
      } catch (err) {
        console.error("Errore durante la creazione delle statistiche:", err);
        alert("Errore durante la creazione delle statistiche.");
      }



 }

      return (<div>

        <button onClick={createStatistiche} className="btn btn-primary">CreateStatistiche</button>
      </div>)

}

export default CreateStatisticheBambino;

