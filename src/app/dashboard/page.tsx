import RightSidebar from "@/src/components/RightSidebar";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-100 flex">
            <main className="flex-1 p-6 pr-72">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="font-medium">Usuários</h2>
                        <p className="text-2xl mt-2">128</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="font-medium">Atendimentos</h2>
                        <p className="text-2xl mt-2">42</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="font-medium">Agenda</h2>
                        <p className="text-2xl mt-2">7 hoje</p>
                    </div>
                </div>
            </main>

            {/* Menu lateral direito */}
            <RightSidebar />
        </div>
    );
}