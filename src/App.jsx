import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css'

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`
        flex flex-col w-full max-w-5xl mx-auto p-4 flex-grow
      `}>
        {!isLoginPage && <Navigation />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
