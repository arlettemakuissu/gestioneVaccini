
import 'bootstrap/dist/css/bootstrap.css';
import { Router,Routes,Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import GestioneAdmin from './Components/GestioneAdmin';
import GestioneVacciniUser from './Components/GestioneVacciniUser';
import RegistrazioneUser from './Components/RegistrazioneUser';
import AddVaccini from './Components/AddVaccini';


function App() {
  return (
    <div>
      <Routes>
     
        <Route path="/"element={<Homepage />} />
        <Route path="/registrati" element={<RegistrazioneUser/>} />
        <Route path="/gestioneadmin" element={<GestioneAdmin />} />
        <Route path="/gestionuser" element={<GestioneVacciniUser />} />
        <Route path="/addVaccini" element={<AddVaccini />} />
      </Routes>
    </div>
  );
}

export default App;
