import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "./routes";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import PopularPage from "./pages/PopularPage";
import TVShowsPage from "./pages/TVShowsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not authenticated, redirect to the Auth page.
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  // If authenticated, render the element
  return element;
};

const AppContent = () => {
  const location = useLocation();

  const hideNavbarOn = [ROUTES.AUTH];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        {/* Protected Routes */}
        <Route
          path={ROUTES.HOME}
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path={ROUTES.POPULAR}
          element={<ProtectedRoute element={<PopularPage />} />}
        />
        <Route
          path={ROUTES.TV_SHOWS}
          element={<ProtectedRoute element={<TVShowsPage />} />}
        />
        <Route
          path={ROUTES.MY_LIBRARY}
          element={<ProtectedRoute element={<Home />} />}
        />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
