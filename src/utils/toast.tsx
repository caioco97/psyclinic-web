import { toast } from "sonner";
import React from "react";

function formatDateTime() {
    return new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function ToastContent({ message }: { message: string }) {
    return (
        <div className="flex flex-col gap-1 min-w-[220px]">
            <span className="font-semibold text-left">{message}</span>
            <div className="text-right">
                <span className="text-[10px] text-gray-500">
                    {formatDateTime()}
                </span>
            </div>
        </div>
    );
}

const DEFAULT_DURATION = 5000; // 5s

export const appToast = {
    success(message: string, duration = DEFAULT_DURATION) {
        toast.success(<ToastContent message={message} />, { duration });
    },
    error(message: string, duration = DEFAULT_DURATION) {
        toast.error(<ToastContent message={message} />, { duration });
    },
    info(message: string, duration = DEFAULT_DURATION) {
        toast.info(<ToastContent message={message} />, { duration });
    },
    warning(message: string, duration = DEFAULT_DURATION) {
        toast.warning(<ToastContent message={message} />, { duration });
    },
};