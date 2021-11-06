import { useAuth } from "../../providers/Auth";

import "./style.css";

const Dashboard = () => {
    const { user, Logout } = useAuth();
    return (
        <div className="dashboard">
        <div className="container-dashboard">
            <div className="welcome">
                Bem-vindo, {user}
            </div>
            <button className="btn-grad" type="submit" onClick={Logout}>Sair</button>
        </div>
        </div>
    )
}

export default Dashboard;