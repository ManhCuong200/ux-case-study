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
    const navigate = useNavigate()
    const { register: registerUser } = useAuth()

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: any) => {
        setLoading(true)

        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            } as RegisterData)
            navigate("/login")
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed. Try again."
            
            // Map server error to form fields for a better UX
            if (message.toLowerCase().includes("email")) {
                setError("email", { type: "manual", message })
            } else if (message.toLowerCase().includes("name")) {
                setError("fullName", { type: "manual", message })
            } else {
                // Fallback for general errors
                setError("root", { type: "manual", message })
            }
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
            error={errors.root?.message || ""}
            onRegister={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterPage