"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { appToast } from "@/src/utils/toast";
import { login_user } from "@/src/features/auth/auth.service";
import logo from "@/assets/img_logo_psyclinic.png";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const loginSchema = z
        .object({
            email: z.string().email("E-mail inválido."),
            password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres.")
        });

    type LoginFormData = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login_user(data.email, data.password);
            appToast.success("Login realizado com sucesso!");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Erro ao fazer login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b2b33] via-[#0f3a44] to-[#0b2b33] overflow-hidden">
            <div className="w-full max-w-sm rounded-2xl bg-[#0e2f37]/90 p-5 shadow-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-2">
                    <Image
                        src={logo}
                        alt="PsyClinic"
                        width={220}
                        height={110}
                        className="mx-auto"
                        priority
                    />
                </div>

                {/* Título */}
                <div className="text-center mb-3">
                    <h1 className="text-xl font-heading font-semibold text-white">
                        Entrar
                    </h1>
                    <p className="text-xs text-gray-300">
                        Acesse sua conta para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* E-mail */}
                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder="E-mail"
                            {...register("email")}
                            className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 text-sm text-white placeholder-gray-300 focus:outline-none transition ${errors.email
                                ? "ring-2 ring-red-400"
                                : "focus:ring-2 focus:ring-white/40"
                                }`}
                        />
                        <p className="min-h-[14px] px-4 text-[11px] text-red-300">
                            {errors.email?.message}
                        </p>
                    </div>

                    {/* Senha */}
                    <div className="space-y-1">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                {...register("password")}
                                className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 pr-9 text-sm text-white placeholder-gray-300 focus:outline-none transition ${errors.password
                                    ? "ring-2 ring-red-400"
                                    : "focus:ring-2 focus:ring-white/40"
                                    }`}
                            />

                            <button
                                type="button"
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                                onTouchStart={() => setShowPassword(true)}
                                onTouchEnd={() => setShowPassword(false)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                                aria-label="Mostrar senha"
                            >
                                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>

                        <p className="min-h-[14px] px-4 text-[11px] text-red-300">
                            {errors.password?.message}
                        </p>
                    </div>

                    {error && (<p className="text-center text-[12px] text-red-300">{error}</p>)}

                    {/* Botão */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full rounded-full bg-white py-2 text-sm font-sans font-semibold text-[#0e2f37] cursor-pointer transition-all duration-200 ease-out hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0 active:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0e2f37] border-t-transparent" />
                        )}
                        {isSubmitting ? "Enviando..." : "Login"}
                    </button>

                    {/* Link para registrar */}
                    <div className="text-center pt-1">
                        <span className="text-xs text-gray-200">
                            Primeira vez aqui?{" "}
                            <Link
                                href="/register"
                                className="underline hover:text-white font-semibold"
                            >
                                Crie sua conta
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}