import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import AuthPage from './pages/AuthPage';
import Home from './pages/HomePage';

const App = () => (
  <Router>
    <Routes>
      <Route path={ROUTES.AUTH} element={<AuthPage />} />
      <Route path={ROUTES.HOME} element={<Home/>} />
    </Routes>
  </Router>
);

export default App;
