import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import HomePage from "./pages/homePage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Layout from "./components/common/Layout"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <Layout>
                <HomePage />
              </Layout>
            } 
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App


