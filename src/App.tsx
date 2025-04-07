import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ROUTES } from './routes';

const App = () => (
  <Router>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;
