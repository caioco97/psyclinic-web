import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include", 
        });

        const text = await res.text();

        if (!res.ok) {
            return NextResponse.json(
                { error: "Erro da API", details: text },
                { status: res.status }
            );
        }

        const data = JSON.parse(text);

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: "Erro interno no Next", details: String(err) },
            { status: 500 }
        );
    }
}