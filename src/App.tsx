import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CandidateDetails from './pages/CandidateDetails';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" as="main" py={8}>
          <Container maxW="6xl">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/candidate/:username" 
                element={
                  <ProtectedRoute>
                    <CandidateDetails />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Container>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;