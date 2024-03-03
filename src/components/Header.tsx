import Link from "next/link";

export function Header() {
    return (
        <div className="w-full absolute top-0 flex justify-start items-center px-5 py-2">
            <div className="flex items-center gap-5">
                <Link href='/ranking' className="text-lg font-extrabold text-white px-2 hover:text-yellow-400">Competitive Rank</Link>
                <Link href='/' className="text-lg font-extrabold text-white border-x px-5 hover:text-yellow-400">Clans</Link>
                <Link href='/' className="text-lg font-extrabold text-white px-2 hover:text-yellow-400">Matches</Link>

            </div>
        </div>
    )
}