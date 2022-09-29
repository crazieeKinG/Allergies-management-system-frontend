import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AuthenticationProvider from "./contexts/AuthenticationProvider";

import { CookiesProvider } from "react-cookie";

function App() {
    return (
        <div className="container py-3">
            <CookiesProvider>
                <AuthenticationProvider>
                    <AppRoutes />
                </AuthenticationProvider>
            </CookiesProvider>
        </div>
    );
}

export default App;
