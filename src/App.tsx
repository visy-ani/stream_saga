import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import PopularPage from "./pages/PopularPage";

const AppContent = () => {
  const location = useLocation();

  const hideNavbarOn = [ROUTES.AUTH];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.POPULAR} element={<PopularPage />} />
        <Route path={ROUTES.TV_SHOWS} element={<Home />} />
        <Route path={ROUTES.MY_LIBRARY} element={<Home />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
