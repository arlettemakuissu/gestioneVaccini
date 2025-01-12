import { useNavigate } from "react-router-dom";


const NavBarUser = ({ setActiveTab, activeTab }) => {

    const navigate = useNavigate();
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">User Dashboard</span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`btn btn-link ${
                  activeTab === "bambini" ? "text-warning" : "text-white"
                }`}
                onClick={() => setActiveTab("bambini")}
              >
                Bambini
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link ${
                  activeTab === "vaccini" ? "text-warning" : "text-white"
                }`}
                onClick={() => setActiveTab("vaccini")}
              >
                Vaccini
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link ${
                  activeTab === "statistiche" ? "text-warning" : "text-white"
                }`}
                onClick={() => setActiveTab("statistiche")}
              >
                Vaccinazioni
              </button>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>
    );
  };


export default NavBarUser;