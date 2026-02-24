"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { registerLoadingHandlers } from "@/src/lib/loadingController";

type LoadingContextType = {
    show: () => void;
    hide: () => void;
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const show = () => setIsLoading(true);
    const hide = () => setIsLoading(false);

    useEffect(() => {
        registerLoadingHandlers(show, hide);
    }, []);

    return (
        <LoadingContext.Provider value={{ show, hide, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
    return ctx;
}