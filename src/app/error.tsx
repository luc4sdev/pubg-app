'use client'

import { Home } from "lucide-react"
import Link from "next/link"

export default function Error() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
            <p className="text-2xl font-extrabold">Ocorreu um erro. Tente novamente mais tarde.</p>
            <Link href='/' ><Home className="hover:brightness-150" /></Link>
        </div>
    )
}