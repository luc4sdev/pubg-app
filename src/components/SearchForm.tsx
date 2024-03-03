'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function SearchForm() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q')

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        const query = data.q

        if (!query) {
            return null
        }

        router.push(`/player/${query}`)
    }

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col items-center gap-3">
            <input name="q" defaultValue={query ?? ''} placeholder="XxMiraTortaxX" className="w-[320px] rounded-lg bg-zinc-900 px-5 py-3 ring-zinc-700 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" type="text" />
            <button type="submit" className="w-1/2 bg-yellow-500 rounded-lg p-2 text-gray-950 font-semibold text-lg hover:brightness-105">Buscar</button>
        </form>
    )
}