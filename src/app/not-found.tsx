import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
            <h1 className="text-3xl font-extrabold">Página não encontrada</h1>
            <Link href='/' ><Home className="hover:brightness-150" /></Link>
        </div>
    )
}