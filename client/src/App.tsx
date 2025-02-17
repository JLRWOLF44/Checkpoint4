import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPage from "./pages/Administrateur/AdminPage";
import FormulaireReserv from "./pages/FormulaireReserv/FormulaireReserv";
import Home from "./pages/Home";
import Reservation from "./pages/ReservationPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

// Ajouter un composant ErrorBoundary pour gérer les erreurs
function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <>{children}</>;
}

// Layout global
function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Outlet /> {/* Affiche la page courante */}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Le Layout englobe toutes les pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/reservation/:id/form" element={<FormulaireReserv />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      {/* Ajoute une route pour gérer les erreurs */}
      <Route
        path="*"
        element={<ErrorBoundary>Page non trouvée</ErrorBoundary>}
      />
    </Routes>
  );
}

export default App;
