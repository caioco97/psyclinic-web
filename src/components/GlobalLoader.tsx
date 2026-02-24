"use client";

import { useLoading } from "@/src/components/LoadingContext";

export function GlobalLoader() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                <span className="text-white text-sm">Carregando...</span>
            </div>
        </div>
    );
}