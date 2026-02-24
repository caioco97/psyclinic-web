import { showGlobalLoading, hideGlobalLoading } from "@/src/lib/loadingController";

export async function apiFetch<T = any>(path: string, options: RequestInit = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        showGlobalLoading();

        const res = await fetch(`${baseUrl}${path}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        });

        const data = await res.json();

        if (!res.ok || data.status === false) {
            const message =
                (data.errors && data.errors.length && data.errors.join(", ")) ||
                data.message ||
                "Erro na requisição";

            throw new Error(message);
        }

        return data;
    } finally {
        hideGlobalLoading();
    }
}