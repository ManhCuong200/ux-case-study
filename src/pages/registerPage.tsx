import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchemaType } from "@/utils/schema"
import { useAuth } from "@/hooks/useAuth"
import { AxiosError } from "axios"
import Register from "@/components/auth/Register"
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
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterSchemaType) => {
        setLoading(true)

        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            } as RegisterData)
            navigate("/login")
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
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