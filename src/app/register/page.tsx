"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appToast } from "@/src/utils/toast";
import { register_user } from "@/src/features/auth/auth.service";
import Link from "next/link";
import logo from "@/assets/img_logo_psyclinic.png";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const registerSchema = z
  .object({
    name: z.string().min(3, "Informe seu nome completo."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Telefone inválido.",
    }),
    federalRegistration: z.string().min(14, "CPF deve ter no mínimo 11 caracteres."),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmedPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function formatCPF(value: string) {
  const cpf = value.replace(/\D/g, "").slice(0, 11);

  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error && err.message) {
    return err.message;
  }

  return "Erro ao fazer cadastro.";
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      federalRegistration: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (formValues: RegisterFormData) => {
    try {
      await register_user(
        formValues.email,
        formValues.name,
        formValues.password,
        formValues.phone,
        formValues.federalRegistration.replace(/\D/g, "")
      );

      appToast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (err) {
      appToast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b2b33] via-[#0f3a44] to-[#0b2b33] overflow-hidden">
      <div className="w-full max-w-lg rounded-2xl bg-[#0e2f37]/90 p-6 shadow-2xl">
        <div className="flex justify-center mb-3">
          <Image
            src={logo}
            alt="PsyClinic"
            width={220}
            height={110}
            className="mx-auto"
            priority
          />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-xl font-heading font-semibold text-white">Registre-se</h1>
          <p className="text-xs text-gray-300">Crie sua conta para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Nome completo"
              {...register("name")}
              className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 text-sm text-white placeholder-gray-300 focus:outline-none transition ${
                errors.name ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-white/40"
              }`}
            />
            <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.name?.message}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1 md:col-span-2">
              <input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 text-sm text-white placeholder-gray-300 focus:outline-none transition ${
                  errors.email ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-white/40"
                }`}
              />
              <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.email?.message}</p>
            </div>

            <div className="space-y-1">
              <Controller
                name="federalRegistration"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="CPF"
                    value={field.value}
                    onChange={(event) => field.onChange(formatCPF(event.target.value))}
                    maxLength={14}
                    className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 text-sm text-white placeholder-gray-300 focus:outline-none transition ${
                      errors.federalRegistration ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-white/40"
                    }`}
                  />
                )}
              />
              <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.federalRegistration?.message}</p>
            </div>

            <div className="space-y-1">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    country="br"
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    enableSearch
                    placeholder="Telefone"
                    containerClass="!w-full"
                    inputClass={`!w-full !h-[42px] !text-sm !font-heading !rounded-full !bg-[#355a63] !py-2 !pl-11 !pr-4 !text-white !placeholder-gray-300 !border-none focus:!outline-none transition ${
                      errors.phone ? "!ring-2 !ring-red-400" : "focus:!ring-2 focus:!ring-white/40"
                    }`}
                    buttonClass="!bg-[#355a63] !border-none !rounded-l-full !w-10 !flex !items-center !justify-center"
                    dropdownClass="!bg-[#0e2f37] !text-white !border-none !rounded-xl !shadow-xl !w-[260px]"
                    searchClass="!bg-[#0e2f37] !text-white !border !border-white/10 !rounded-md !placeholder-gray-400"
                  />
                )}
              />
              <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.phone?.message}</p>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  {...register("password")}
                  className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 pr-9 text-sm text-white placeholder-gray-300 focus:outline-none transition ${
                    errors.password ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-white/40"
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
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.password?.message}</p>
            </div>

            <div className="space-y-1">
              <input
                type="password"
                placeholder="Confirmar senha"
                {...register("confirmedPassword")}
                className={`w-full h-[42px] font-heading rounded-full bg-[#355a63] py-2 px-4 text-sm text-white placeholder-gray-300 focus:outline-none transition ${
                  errors.confirmedPassword ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-white/40"
                }`}
              />
              <p className="min-h-[14px] px-4 text-[11px] text-red-300">{errors.confirmedPassword?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-white py-2 text-sm font-sans font-semibold text-[#0e2f37] transition-all duration-200 ease-out hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0 active:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Registrar"}
          </button>

          <div className="text-center pt-1">
            <Link href="/login" className="text-xs text-gray-200 hover:text-white underline">
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
