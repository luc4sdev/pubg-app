import Image from "next/image"
import Link from "next/link"

import bronze from '@/../../public/bronze.png'
import silver from '@/../../public/silver.png'
import gold from '@/../../public/gold.png'
import platinum from '@/../../public/platinum.png'
import diamond from '@/../../public/diamond.png'
import master from '@/../../public/master.png'
import { Home } from "lucide-react"
import { getRankCurrentSeason } from "./actions"



export function generateMetadata() {
    return {
        title: 'Ranking',
    }
}


export default async function Ranking() {

    const [leaderboards, currentSeasonId] = await getRankCurrentSeason()
    leaderboards.sort((a, b) => a.attributes.rank - b.attributes.rank);


    return (
        <div className="w-screen h-screen md:px-20 py-5 flex flex-col justify-start items-center gap-5 overflow-y-auto">
            <div className="w-full flex flex-col justify-center items-center relative">
                <Link href='/' ><Home className="md:absolute left-0 hover:brightness-150" /></Link>
                <h1 className="text-xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">Season {currentSeasonId.slice(-2)} SA Ranking</h1>
            </div>
            <div className="flex-1 bg-zinc-800 w-full md:w-4/5">
                <div className="flex flex-col justify-center items-center p-5 gap-5">

                    <div className="w-full grid grid-cols-5 bg-zinc-600 p-2 rounded-lg">
                        <p className="col-span-2 font-extrabold text-xl">Name</p>
                        <p className="font-extrabold text-xl">Rank</p>
                        <p className="font-extrabold text-xl">Wins</p>
                        <p className="font-extrabold text-xl">Tier</p>
                    </div>

                    {leaderboards.map(player => {
                        return (
                            <div key={player.id} className="w-full grid grid-cols-5 bg-zinc-700 p-2 rounded-lg">
                                <p
                                    className={`col-span-2 flex items-center font-extrabold text-lg hover:brightness-125 ${player.attributes.rank === 1 ? 'text-yellow-400' : player.attributes.rank === 2 ? 'text-zinc-300' : player.attributes.rank === 3 ? 'text-amber-600' : ''}`}><Link href={`/player/${player.attributes.name}`}>{player.attributes.name}</Link></p>

                                <p
                                    className={`flex items-center font-extrabold text-lg ${player.attributes.rank === 1 ? 'text-yellow-400' : player.attributes.rank === 2 ? 'text-zinc-300' : player.attributes.rank === 3 ? 'text-amber-600' : ''}`}>{player.attributes.rank}</p>

                                <p
                                    className={`flex items-center font-extrabold text-lg ${player.attributes.rank === 1 ? 'text-yellow-400' : player.attributes.rank === 2 ? 'text-zinc-300' : player.attributes.rank === 3 ? 'text-amber-600' : ''}`}>{player.attributes.stats.wins}</p>

                                <p
                                    className='font-extrabold text-lg'>
                                    <Image src={player.attributes.stats.tier === 'Bronze' ? bronze : player.attributes.stats.tier === 'Silver' ? silver : player.attributes.stats.tier === 'Gold' ? gold : player.attributes.stats.tier === 'Platinum' ? platinum : player.attributes.stats.tier === 'Diamond' ? diamond : player.attributes.stats.tier === 'Master' ? master : ''} className="rounded-lg" width={60} height={60} alt="Tier" />
                                </p>

                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
