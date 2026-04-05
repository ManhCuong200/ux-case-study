import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/utils/schema"
import { useAuth } from "@/hooks/useAuth"
import Register from "@/components/auth/register"
import type { RegisterData } from "@/shared/types"

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { register: registerUser } = useAuth()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: any) => {
        setLoading(true)
        setError("")

        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            } as RegisterData)
            navigate("/login")
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Register 
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            loading={loading}
            error={error}
            onRegister={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterPage