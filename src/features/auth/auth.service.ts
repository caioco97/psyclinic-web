import { apiFetch } from "@/src/services/api";

export async function login_user(email: string, password: string) {
    return apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function register_user(email: string, name: string, password: string, phone: string, federalRegistration: string) {
    return apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, name, password, phone, federalRegistration }),
    });
}