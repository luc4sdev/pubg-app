import { Accessibility, Car, Clock, Crosshair, Footprints, Hand, HeartPulse, Home, Ruler, Skull, ThumbsDown, Trophy, X, XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllDamageGiven, getAllEnemiesKnockedOut, getAllHeadshotsKills, getAllTeamKills, getAllVehiclesDestroyed, getAllWalkedDistance, getAndCalculateLongestTimeSurvived, getHighestKillstreak, getLongestKill, getPlayerByName, getRoadKills, sumAllDeaths, sumAllKills, sumAllLosses, sumAllWins } from "./actions";


interface PlayerProps {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params }: PlayerProps): Promise<Metadata> {

    const [player] = await getPlayerByName(params.id)

    return {
        title: player.attributes.name,
    }
}



export default async function PlayerPage({ params }: PlayerProps) {
    try {
        const [player, status, clan] = await getPlayerByName(params.id);

        return (
            <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 md:px-20 py-10 flex flex-col justify-start items-center gap-8 overflow-y-auto">
                <div className="w-full flex flex-col justify-center items-center relative">
                    <Link href="/">
                        <Home className="md:absolute left-0 text-white hover:text-yellow-500 transition duration-300 cursor-pointer" size={32} />
                    </Link>
                    <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent 
    bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 animate-gradient">
                        Status de {player.attributes.name}
                    </h1>


                </div>

                <div className="w-full 2xl:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Kill/Death</h2>
                        <p className="text-5xl text-center font-bold text-sky-500 mb-4">{(sumAllKills(status) / sumAllDeaths(status)).toFixed(2)}</p>
                        <div className="flex justify-around items-center gap-4">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-medium text-gray-300">Kills</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-xl font-bold text-red-500">{sumAllKills(status)}</p>
                                    <X className="text-red-500" size={24} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-medium text-gray-300">Deaths</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-xl font-bold text-gray-500">{sumAllDeaths(status)}</p>
                                    <Skull className="text-gray-500" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Wins/Lose</h2>
                        <p className="text-5xl text-center font-bold text-yellow-500 mb-4">{(sumAllWins(status) / sumAllLosses(status)).toFixed(2)}</p>
                        <div className="flex justify-around items-center gap-4">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-medium text-gray-300">Wins</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-xl font-bold text-yellow-300">{sumAllWins(status)}</p>
                                    <Trophy className="text-yellow-300" size={24} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-medium text-gray-300">Loses</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-xl font-bold text-red-500">{sumAllLosses(status)}</p>
                                    <XCircle className="text-red-500" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Highest Killstreak</h2>
                        <p className="text-5xl text-center font-bold text-purple-500 mb-4">{getHighestKillstreak(status)}</p>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium text-gray-300">Longest time survived</p>
                            <div className="flex items-center gap-1">
                                <Clock className="text-cyan-300" size={24} />
                                <p className="text-xl font-bold text-cyan-300">{getAndCalculateLongestTimeSurvived(status)} Minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Longest Kill</h2>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Ruler className="text-yellow-200" size={24} />
                            <p className="text-5xl font-bold text-yellow-200">{getLongestKill(status).toFixed(2)} m</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium text-gray-300">Roadkills</p>
                            <div className="flex items-center gap-1">
                                <Accessibility className="text-green-500" size={24} />
                                <p className="text-xl font-bold text-green-500">{getRoadKills(status)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Headshots</h2>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <p className="text-5xl font-bold text-green-500">{getAllHeadshotsKills(status)}</p>
                            <Crosshair className="text-green-500" size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium text-gray-300">Teamkills</p>
                            <div className="flex items-center gap-1">
                                <p className="text-xl font-bold text-red-500">{getAllTeamKills(status)}</p>
                                <ThumbsDown className="text-red-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Vehicles Destroyed</h2>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <p className="text-5xl font-bold text-orange-500">{getAllVehiclesDestroyed(status)}</p>
                            <Car className="text-orange-500" size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium text-gray-300">Enemies Knocked Out</p>
                            <div className="flex items-center gap-1">
                                <p className="text-xl font-bold text-purple-500">{getAllEnemiesKnockedOut(status)}</p>
                                <Hand className="text-purple-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl col-span-full">
                        <h2 className="text-2xl text-center font-semibold text-white mb-4">Damage Given</h2>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <p className="text-5xl font-bold text-red-500">{getAllDamageGiven(status).toFixed(0)}</p>
                            <HeartPulse className="text-red-500" size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium text-gray-300">Walked Distance</p>
                            <div className="flex items-center gap-1">
                                <p className="text-xl font-bold text-gray-500">{getAllWalkedDistance(status).toFixed(2)} km</p>
                                <Footprints className="text-gray-500" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full 2xl:w-2/3 bg-zinc-800 rounded-lg p-6 mt-10 hover:bg-zinc-700 transition duration-300 shadow-lg hover:shadow-xl">
                    <h2 className="text-2xl text-center font-semibold text-white mb-4">Clan</h2>
                    <div className="text-center">
                        <p className="text-3xl md:text-5xl font-bold text-sky-500">
                            {clan.attributes?.clanName || 'Not available'} <span className="text-red-500">[{clan.attributes?.clanTag || 'Not available'}]</span>
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-gray-300 mt-2">
                            Members: {clan.attributes?.clanMemberCount || 'Not available'}/100
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-gray-300 mt-2">
                            Level: {clan.attributes?.clanLevel || 'Not available'}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-gray-900 to-black">
                <p className="text-2xl font-bold text-white">Player não encontrado.</p>
                <Link href="/">
                    <Home className="text-white hover:text-sky-500 transition duration-300" size={32} />
                </Link>
            </div>
        );
    }
}