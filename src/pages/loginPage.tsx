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
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginData) => {
        setLoading(true)

        try {
            await login(data)
            navigate("/dashboard")
        } catch (err: any) {
            const message = err.response?.data?.message || "Invalid email or password"

            // Nếu thông báo lỗi chứa từ 'email' hoặc 'user' -> Hiện dưới ô Email
            if (message.toLowerCase().includes("email") || message.toLowerCase().includes("user") || message.toLowerCase().includes("found")) {
                setError("email", { type: "manual", message })
            } else {
                // Mặc định các lỗi khác (Password sai, Invalid credentials) sẽ hiện dưới ô Password
                setError("password", { type: "manual", message })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Login
            register={register}
            errors={errors}
            loading={loading}
            error={errors.root?.message || ""}
            onLogin={handleSubmit(onSubmit)}
        />
    )
}

export default LoginPage
