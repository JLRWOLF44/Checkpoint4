import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminPage from "./pages/Administrateur/AdminPage";
import FormulaireReserv from "./pages/FormulaireReserv/FormulaireReserv";
import Home from "./pages/Home";
import ReservationPage from "./pages/ReservationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "reservation/:id",
        element: <ReservationPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "reservation/:id/form",
        element: <FormulaireReserv />,
      },
    ],
  },
]);

export default router;
