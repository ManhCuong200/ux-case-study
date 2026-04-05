import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Register from "@/components/auth/register"

const RegisterPage = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { register } = useAuth()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!fullName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)
        setError("")

        try {
            await register({ fullName, email, password })
            navigate("/login")
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Register 
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loading={loading}
            error={error}
            onRegister={handleRegister}
        />
    )
}

export default RegisterPage