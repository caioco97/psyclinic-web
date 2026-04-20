"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import RightSidebar from "@/src/components/RightSidebar";
import { appToast } from "@/src/utils/toast";

const registerSchema = z
    .object({
        shortName: z.string().min(5, "Informe o nome fantasia."),
        cnpj: z.string().min(18, "CNPJ deve ter no mínimo 14 caracteres."),
        phone: z.string().refine((val) => val.replace(/\D/g, "").length >= 10, {
            message: "Telefone inválido.",
        })
    });

type AgreementFormData = z.infer<typeof registerSchema>;

export default function AgreementPage() {
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AgreementFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            shortName: "",
            cnpj: "",
            phone: ""
        },
    });

    const router = useRouter();

    function formatCNPJ(value: string) {
        const cnpj = value.replace(/\D/g, "").slice(0, 14);

        return cnpj
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    const onSubmit = async (param: AgreementFormData) => {
        const data = {
            shortName: param.shortName,
            cnpj: param.cnpj.replace(/\D/g, ""),
            phone: param.phone
        };

        try {
            // await register_user(
            //     data.email,
            //     data.name,
            //     data.password,
            //     data.phone,
            //     data.federalRegistration
            // );
            appToast.success("Registro realizado com sucesso.");
            reset();
        } catch (err: any) {
            appToast.error(err.message || "Erro ao fazer cadastro");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <main className="flex-1 p-6 pr-72 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Cadastro de Convênio
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Preencha os dados abaixo para cadastrar um novo convênio.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                Nome Fantasia
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Clínica Saúde Total"
                                {...register("shortName")}
                                className={`!w-full !h-11 !pl-5 !pr-3 !rounded-xl !border !border-slate-300 !text-sm !bg-white !text-slate-800 focus:!outline-none focus:!ring-2 focus:!ring-slate-400 ${errors.shortName
                                    ? "ring-2 ring-red-400"
                                    : "focus:ring-2 focus:ring-white/40"
                                    }`}
                            />
                            <p className="min-h-[14px] px-4 text-[11px] text-red-300">
                                {errors.shortName?.message}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-700">
                                    CNPJ
                                </label>
                                <Controller
                                    name="cnpj"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            placeholder="00.000.000/0000-00"
                                            value={field.value}
                                            onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                                            maxLength={18}
                                            className={`!w-full !h-11 !pl-5 !pr-3 !rounded-xl !border !border-slate-300 !text-sm !bg-white !text-slate-800 focus:!outline-none focus:!ring-2 focus:!ring-slate-400 ${errors.cnpj
                                                ? "ring-2 ring-red-400"
                                                : "focus:ring-2 focus:ring-white/40"
                                                }`}
                                        />
                                    )}
                                />
                                <p className="min-h-[14px] px-4 text-[11px] text-red-300">
                                    {errors.cnpj?.message}
                                </p>
                            </div>

                            {/* Telefone */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Telefone
                                </label>
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
                                            containerClass="w-full h-11"
                                            inputClass={`!w-full !h-11 !pl-14 !pr-3 !rounded-xl !border !border-slate-300 !text-sm !bg-white !text-slate-800 focus:!outline-none focus:!ring-2 focus:!ring-slate-400 ${errors.phone ? "!ring-2 !ring-red-400 !border-red-400" : ""
                                                }`}
                                            buttonClass="!h-11 !rounded-l-xl !border !border-slate-300 !bg-white"
                                            dropdownClass="!bg-white !text-slate-800 !border !border-slate-200 !rounded-xl !shadow-lg"
                                            searchClass="!bg-white !text-slate-800 !border !border-slate-300 !rounded-md"
                                        />
                                    )}
                                />
                                <p className="min-h-[14px] px-4 text-[11px] text-red-300">
                                    {errors.phone?.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl bg-slate-800 cursor-pointer text-white hover:bg-slate-700 transition"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <RightSidebar />
        </div>
    );
}