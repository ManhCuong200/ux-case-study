import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/utils/schema"
import { useAuth } from "@/hooks/useAuth"
import Login from "@/components/auth/login"
import type { LoginData } from "@/shared/types"

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginData) => {
        setLoading(true)
        setError("")

        try {
            await login(data)
            navigate("/dashboard")
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Login 
            register={register}
            errors={errors}
            loading={loading}
            error={error}
            onLogin={handleSubmit(onSubmit)}
        />
    )
}

export default LoginPage