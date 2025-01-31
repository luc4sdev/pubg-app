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
        const [player, status, clan] = await getPlayerByName(params.id)


        return (
            <div className="w-screen h-screen px-20 py-5 flex flex-col justify-start items-center gap-5 overflow-y-auto">
                <div className="w-full flex flex-col justify-center items-center relative">
                    <Link href='/' ><Home className="md:absolute left-0 hover:brightness-150" /></Link>
                    <h1 className="text-xl md:text-3xl font-bold">Status de {player.attributes.name}</h1>
                </div>

                <div className="flex-1 w-full 2xl:w-2/3">
                    <div className=" bg-zinc-900 grid grid-cols-3">

                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 gap-5 border-b">
                            <h2 className="text-2xl font-normal">Kill/Death</h2>
                            <p className="text-5xl font-normal">{(sumAllKills(status) / sumAllDeaths(status)).toFixed(2)}</p>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">

                                    <p className="text-lg font-semibold">Kills</p>

                                    <div className="flex justify-center items-center gap-1">
                                        <p className="text-lg font-semibold">{sumAllKills(status)}  </p>
                                        <X className="w-full text-red-500" />
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Deaths</p>

                                    <div className="flex justify-center items-center gap-1">
                                        <p className="text-lg font-semibold">{sumAllDeaths(status)}</p>
                                        <Skull className="w-full text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 md:border-x border-b gap-5">
                            <h2 className="text-2xl font-normal">Wins/Lose</h2>
                            <p className="text-5xl font-normal">{(sumAllWins(status) / sumAllLosses(status)).toFixed(2)}</p>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Win</p>

                                    <div className="flex justify-center items-center gap-1">
                                        <p className="text-lg font-semibold">{sumAllWins(status)}</p>
                                        <Trophy className="w-full text-yellow-300" />
                                    </div>

                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Loses</p>

                                    <div className="flex justify-center items-center gap-1">
                                        <p className="text-lg font-semibold">{sumAllLosses(status)}</p>
                                        <XCircle className="w-full text-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 border-b gap-5">
                            <h2 className="text-2xl font-normal">Highest Killstreak</h2>
                            <p className="text-5xl font-normal">{getHighestKillstreak(status)}</p>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <p className="text-lg font-semibold">Longest time survived</p>

                                    <div className="w-full flex justify-center items-center gap-1">
                                        <Clock className="text-cyan-300" />
                                        <p className="text-lg font-semibold">{getAndCalculateLongestTimeSurvived(status)} Minutes</p>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 border-b gap-5">
                            <h2 className="text-2xl font-normal">Longest Kill</h2>

                            <div className="w-full flex justify-center items-center gap-2">
                                <Ruler className="text-yellow-200" />
                                <p className="text-5xl font-normal">{getLongestKill(status).toFixed(2)} m</p>
                            </div>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Roadkills</p>

                                    <div className="w-full flex justify-center items-center gap-2">
                                        <Accessibility className="text-green-500" />
                                        <p className="text-lg font-semibold">{getRoadKills(status)}</p>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 md:border-x border-b gap-5">
                            <h2 className="text-2xl font-normal">Headshost</h2>

                            <div className="w-full flex justify-center items-center gap-2">
                                <p className="text-5xl font-normal">{getAllHeadshotsKills(status)}</p>
                                <Crosshair className="text-green-500" />
                            </div>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Teamkills</p>

                                    <div className="w-full flex justify-center items-center gap-2">
                                        <p className="text-lg font-semibold">{getAllTeamKills(status)}</p>
                                        <ThumbsDown className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-3 md:col-span-1 flex flex-col justify-around items-center p-5 border-b gap-5">
                            <h2 className="text-2xl font-normal">Vehicles destroyed</h2>

                            <div className="w-full flex justify-center items-center gap-2">
                                <p className="text-5xl font-normal">{getAllVehiclesDestroyed(status)}</p>
                                <Car className="text-orange-500" />
                            </div>

                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Enemies knocked out</p>


                                    <div className="w-full flex justify-center items-center gap-2">
                                        <p className="text-lg font-semibold">{getAllEnemiesKnockedOut(status)}</p>
                                        <Hand className="text-purple-500" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col justify-around items-center p-5 col-span-3">
                            <h2 className="text-2xl font-normal">Damage given</h2>

                            <div className="w-full flex justify-center items-center gap-2">
                                <p className="text-5xl font-normal">{getAllDamageGiven(status).toFixed(0)}</p>
                                <HeartPulse className="text-red-500" />
                            </div>


                            <div className="flex justify-around items-center gap-10">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-semibold">Walked distance</p>

                                    <div className="w-full flex justify-center items-center gap-2">
                                        <p className="text-lg font-semibold">{getAllWalkedDistance(status).toFixed(2)} km</p>
                                        <Footprints className="text-gray-500" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 bg-zinc-900 grid grid-cols-1 mt-10">
                        <div className="flex flex-col justify-center items-center p-5 col-span-3 gap-5">
                            <h2 className="text-3xl font-normal">Clan</h2>

                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <p className="text-2xl md:text-5xl font-normal">{clan.attributes?.clanName || 'Não disponível'} <span className="text-red-500">[{clan.attributes?.clanTag || 'Não disponível'}]</span></p>

                                <p className="text-3xl font-normal">Members: {clan.attributes?.clanMemberCount || 'Não disponível'}/100</p>

                                <p className="text-3xl font-normal">Level: {clan.attributes?.clanLevel || 'Não disponível'}</p>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        )

    } catch (error) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
                <p className="text-2xl font-extrabold">Player não encontrado.</p>
                <Link href='/' ><Home className="hover:brightness-150" /></Link>
            </div>
        );
    }




}