import { useState } from "react";
import { Form,Alert,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUser  = () => {

  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        password: "",
        role: "",
      });
    
      const [validated, setValidated] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
      
        if (!formData.role) {
          setErrorMessage("Please select a role.");
          return;
        }
      
        setErrorMessage(""); 
      
        try {
         console.log(formData);
          const response = await axios.post("http://localhost:8081/api/user", formData);
      
          console.log(response)
          if (response.status === 201 || response.status === 200 ) {
            alert("Registration Successful!");
            console.log("Dati inviati al backend:", response.data);
            navigate("/")
          } else {
            setErrorMessage("Errore durante la registrazione. Riprova.");
          }
        } catch (error) {
          console.error("Errore durante la richiesta:", error);
          setErrorMessage("Errore durante la registrazione. Controlla i dati e riprova.");
        }
      };
    
      return (
        <div className="container mt-5">
      <div className="row justify-content-center">
      
        <div className="col-md-5">
          <h4>Registrati!</h4>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                <option value="admin">admin</option>
                <option value="madre">madre</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a role.
              </Form.Control.Feedback>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
        </div>
        </div>
      );



    
}


export default RegisterUser