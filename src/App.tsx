import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import ForgotPasswordPage from "./pages/forgotPasswordPage"
import DashboardPage from "./pages/dashboardPage"
import ProfilePage from "./pages/profilePage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Layout from "./components/common/Layout"
import { Toaster } from "sonner"

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            } 
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App


