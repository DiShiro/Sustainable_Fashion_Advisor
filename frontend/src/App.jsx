import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ComparePage from './pages/ComparePage';
import EducationPage from './pages/EducationPage';
import BrandDetailPage from './pages/BrandDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/brand/:id" element={<BrandDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
            <p>Sustainable Fashion Assistant — делайте осознанный выбор</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;