import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// Import all pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
// import DashboardPage from '@/pages/DashboardPage';
import PricingPage from '@/pages/PricingPage';
// ... etc

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } /> */}
          {/* Add all other routes */}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
