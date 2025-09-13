import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from "./components/Header";
import Favoritos from './pages/Favoritos';
import Registrar from "./pages/Registrar";
import Login from "./pages/Login";
import PrivateRoute from './components/PrivateRoute'; // Importe o componente PrivateRoute

function RouteApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Rota privada */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                            <Favoritos />
                        </PrivateRoute>
                    }
                />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favorito" element={<Favoritos />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;