import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Login from "@/components/auth/login"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        setError("")

        try {
            await login({ email, password })
            navigate("/")
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            error={error}
            onLogin={handleLogin}
        />
    )
}

export default LoginPage