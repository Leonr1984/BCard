import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { CardDetail } from "./components/pages/CardDetail";
import { CreateCard } from "./components/pages/CreateCard";
import { EditCard } from "./components/pages/EditCard";
import { MyCards } from "./components/pages/MyCards";
import { Favorites } from "./components/pages/Favorites";
import { About } from "./components/pages/About";
import { Profile } from "./components/pages/Profile";
import { CRM } from "./components/pages/CRM";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/card/:id" element={<CardDetail />} />

                <Route
                  path="/my-cards"
                  element={
                    <ProtectedRoute>
                      <MyCards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-card"
                  element={
                    <ProtectedRoute requiredRole="business">
                      <CreateCard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-card/:id"
                  element={
                    <ProtectedRoute requiredRole="business">
                      <EditCard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crm"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <CRM />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
