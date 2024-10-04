import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CryptoConverter from './features/cryptoConverter';
import TickersPage from './features/tickers';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="p-4 bg-gray-50 mb-4 border-2">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/" className="text-blue-700 font-bold hover:border-gray-700 border-transparent hover:border-current">Crypto Calculator</Link>
            </li>
            <li>
              <Link to="/tickers" className="text-blue-700 font-bold hover:border-gray-700 border-transparent hover:border-current">Tickers</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<CryptoConverter />} />
          <Route path="/tickers" element={<TickersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
