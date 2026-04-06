import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import ScreenDetailPage from "./pages/ScreenDetailPage"
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
          <Route
            path="/apps/:id"
            element={
              <Layout>
                <ProjectDetailPage />
              </Layout>
            }
          />
          <Route
            path="/apps/:id/screens/:screenId"
            element={
              <Layout>
                <ScreenDetailPage />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
