import { useState } from "react"
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";

import { useUser } from "./context/UserContext";




const Homepage = () => {

  
  const {setUser} = useUser()
  const [loginData,  setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Gestione del login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post("http://localhost:8081/api/user/login", loginData);
      console.log(response.data);
      setUser(response.data)
      if (response.data.role === "admin") {

        alert("Sei logato come admin!");
        navigate("/gestioneadmin");
      } else if (response.data.role === "madre") {
        alert("Sei logato come madre!");
        navigate("/gestionuser");
      } else {
        setError("Ruolo non riconosciuto. Contatta l'amministratore.");
      }
    } catch (err) {
      setError("Credenziali non valide. Riprova.");
    }
  };

  const handleRegistrazione = () => {

       navigate("/registrati")
  }

  // Gestione della registrazione
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/api/user/register", registerData);
      alert("Registrazione avvenuta con successo! Ora puoi fare il login.");
    } catch (err) {
      setError("Errore durante la registrazione. Riprova.");
    }
  };

  // Gestione del cambiamento nei campi del form (Login)
  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Gestione del cambiamento nei campi del form (Registrazione)
  const handleRegisterInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Form per Login */}
        <div className="col-md-5">
          <h4 className="text-center">Sei un Utente,Fai Login! </h4>
          <form onSubmit={handleLoginSubmit} className="bg-light p-4 rounded shadow">
            {error && <div className="alert alert-danger">{error}</div>} {/* Mostra l'errore se presente */}

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Inserisci la tua email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Inserisci la tua password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <div className="text-right mt-2">
            <button type="submit" className="btn btn-primary btn-block" onClick={handleRegistrazione}>
            Registarti
            </button>
            </div>
            <div className="text-right mt-2">
              <a href="#">Hai dimenticato la password?</a>
            </div>
          </form>
         
        </div>
       
       </div>

      </div>  

            
          
  );
};

    
export default Homepage

