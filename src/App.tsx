// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VotingProvider } from './context/VotingContext.tsx';
import { Layout } from './components/common/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Vote } from './pages/Vote.tsx';
import { Admin } from './pages/Admin.tsx';
import { Results } from './pages/Results.tsx';

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