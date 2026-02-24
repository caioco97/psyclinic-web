
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RightSidebar() {
    const router = useRouter();

    const handleLogout = () => {
        // Em produção, o ideal é chamar um endpoint de logout na API
        document.cookie = "access_token=; path=/; max-age=0";
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen fixed right-0 top-0 flex flex-col p-4">
            <div className="text-xl font-semibold mb-8">PsyClinic</div>

            <nav className="flex flex-col gap-3 flex-1">
                <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded hover:bg-slate-700"
                >
                    📊 Dashboard
                </Link>

                <Link
                    href="/dashboard/profile"
                    className="px-3 py-2 rounded hover:bg-slate-700"
                >
                    👤 Perfil
                </Link>
            </nav>

            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
            >
                🚪 Sair
            </button>
        </aside>
    );
}