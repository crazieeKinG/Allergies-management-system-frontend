import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
    return (
        <div className="container py-3">
            <AppRoutes />
        </div>
    );
}

export default App;
