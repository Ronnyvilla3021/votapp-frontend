// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VotingProvider } from './context/VotingContext';
import { Layout } from './components/common/Layout';
import { Home } from './pages/Home';
import { Vote } from './pages/Vote';
import { Admin } from './pages/Admin';
import { Results } from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <VotingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/results/:code" element={<Results />} />
          </Routes>
        </Layout>
      </VotingProvider>
    </BrowserRouter>
  );
}

export default App;