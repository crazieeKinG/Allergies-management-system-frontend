import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AuthenticationProvider from "./contexts/AuthenticationProvider";

import { AxiosInterceptor } from "./api/axiosConfig";

function App() {
    return (
        <div className="container py-3">
            <AuthenticationProvider>
                <AxiosInterceptor>
                    <AppRoutes />
                </AxiosInterceptor>
            </AuthenticationProvider>
        </div>
    );
}

export default App;
