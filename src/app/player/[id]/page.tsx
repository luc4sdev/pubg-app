import { api } from "@/data/api";
import { Clan } from "@/data/types/clan";
import { LifetimeStats } from "@/data/types/lifetime-stats";
import { Player } from "@/data/types/player";
import { Accessibility, Car, Clock, Crosshair, Footprints, Hand, HeartPulse, Home, Ruler, Skull, ThumbsDown, Trophy, X, XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


interface PlayerProps {
    params: {
        id: string;
    }
}

async function getPlayerByName(id: string): Promise<[Player, LifetimeStats, Clan]> {
    const response = await api(`/shards/steam/players?filter[playerNames]=${id}`, {
        next: {
            revalidate: 60 * 60, // 1 hour
        }
    })

    const res = await response.json()
    const player = res.data[0]

    const response2 = await api(`/shards/steam/players/${player.id}/seasons/lifetime?filter[gamepad]=false
    `, {
        next: {
            revalidate: 60 * 60, // 1 hour
        }
    })

    const res2 = await response2.json()
    const status = res2.data


    const response3 = await api(`/shards/steam/clans/${player.attributes.clanId}`, {
        next: {
            revalidate: 60 * 60, // 1 hour
        }
    })

    const res3 = await response3.json()
    const clan = res3.data

    return [player, status, clan]
}

export async function generateMetadata({ params }: PlayerProps): Promise<Metadata> {

    const [player, status] = await getPlayerByName(params.id)

    return {
        title: player.attributes.name,
    }
}



export default async function PlayerPage({ params }: PlayerProps) {

    const [player, status, clan] = await getPlayerByName(params.id)


    function sumAllKills() {
        let kills = 0;

        kills += status.attributes.gameModeStats.duo.kills;
        kills += status.attributes.gameModeStats["duo-fpp"].kills;
        kills += status.attributes.gameModeStats.solo.kills;
        kills += status.attributes.gameModeStats["solo-fpp"].kills;
        kills += status.attributes.gameModeStats.squad.kills;
        kills += status.attributes.gameModeStats["squad-fpp"].kills;

        return kills
    }

    function sumAllDeaths() {
        let deaths = 0;

        deaths += status.attributes.gameModeStats.duo.losses;
        deaths += status.attributes.gameModeStats["duo-fpp"].losses;
        deaths += status.attributes.gameModeStats.solo.losses;
        deaths += status.attributes.gameModeStats["solo-fpp"].losses;
        deaths += status.attributes.gameModeStats.squad.losses;
        deaths += status.attributes.gameModeStats["squad-fpp"].losses;

        return deaths
    }

    function sumAllWins() {
        let wins = 0;

        wins += status.attributes.gameModeStats.duo.wins;
        wins += status.attributes.gameModeStats["duo-fpp"].wins;
        wins += status.attributes.gameModeStats.solo.wins;
        wins += status.attributes.gameModeStats["solo-fpp"].wins;
        wins += status.attributes.gameModeStats.squad.wins;
        wins += status.attributes.gameModeStats["squad-fpp"].wins;

        return wins
    }

    function sumAllLosses() {
        let losses = 0;

        losses += status.attributes.gameModeStats.duo.losses;
        losses += status.attributes.gameModeStats["duo-fpp"].losses;
        losses += status.attributes.gameModeStats.solo.losses;
        losses += status.attributes.gameModeStats["solo-fpp"].losses;
        losses += status.attributes.gameModeStats.squad.losses;
        losses += status.attributes.gameModeStats["squad-fpp"].losses;

        return losses
    }


    function getHighestKillstreak() {
        let killstreak = 0;

        if (status.attributes.gameModeStats.duo.roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats.duo.roundMostKills;
        }
        if (status.attributes.gameModeStats["duo-fpp"].roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats["duo-fpp"].roundMostKills;
        }
        if (status.attributes.gameModeStats.solo.roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats.solo.roundMostKills;
        }
        if (status.attributes.gameModeStats["solo-fpp"].roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats["solo-fpp"].roundMostKills;
        }
        if (status.attributes.gameModeStats.squad.roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats.squad.roundMostKills;
        }
        if (status.attributes.gameModeStats["squad-fpp"].roundMostKills > killstreak) {
            killstreak = status.attributes.gameModeStats["squad-fpp"].roundMostKills;
        }

        return killstreak
    }


    function getAndCalculateLongestTimeSurvived() {
        let longestTimeSurvived = 0;

        if (status.attributes.gameModeStats.duo.longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats.duo.longestTimeSurvived;
        }
        if (status.attributes.gameModeStats["duo-fpp"].longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats["duo-fpp"].longestTimeSurvived;
        }
        if (status.attributes.gameModeStats.solo.longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats.solo.longestTimeSurvived;
        }
        if (status.attributes.gameModeStats["solo-fpp"].longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats["solo-fpp"].longestTimeSurvived;
        }
        if (status.attributes.gameModeStats.squad.longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats.squad.longestTimeSurvived;
        }
        if (status.attributes.gameModeStats["squad-fpp"].longestTimeSurvived > longestTimeSurvived) {
            longestTimeSurvived = status.attributes.gameModeStats["squad-fpp"].longestTimeSurvived;
        }

        const longestTimeSurvivedInMinutes = Math.floor(longestTimeSurvived / 60);

        return longestTimeSurvivedInMinutes
    }


    function getLongestKill() {
        let longestKill = 0;

        if (status.attributes.gameModeStats.duo.longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats.duo.longestKill;
        }
        if (status.attributes.gameModeStats["duo-fpp"].longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats["duo-fpp"].longestKill;
        }
        if (status.attributes.gameModeStats.solo.longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats.solo.longestKill;
        }
        if (status.attributes.gameModeStats["solo-fpp"].longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats["solo-fpp"].longestKill;
        }
        if (status.attributes.gameModeStats.squad.longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats.squad.longestKill;
        }
        if (status.attributes.gameModeStats["squad-fpp"].longestKill > longestKill) {
            longestKill = status.attributes.gameModeStats["squad-fpp"].longestKill;
        }

        return longestKill
    }


    function getRoadKills() {
        let roadKills = 0;

        roadKills += status.attributes.gameModeStats.duo.roadKills;
        roadKills += status.attributes.gameModeStats["duo-fpp"].roadKills;
        roadKills += status.attributes.gameModeStats.solo.roadKills;
        roadKills += status.attributes.gameModeStats["solo-fpp"].roadKills;
        roadKills += status.attributes.gameModeStats.squad.roadKills;
        roadKills += status.attributes.gameModeStats["squad-fpp"].roadKills;

        return roadKills
    }

    function getAllHeadshotsKills() {
        let headshotKills = 0;

        headshotKills += status.attributes.gameModeStats.duo.headshotKills;
        headshotKills += status.attributes.gameModeStats["duo-fpp"].headshotKills;
        headshotKills += status.attributes.gameModeStats.solo.headshotKills;
        headshotKills += status.attributes.gameModeStats["solo-fpp"].headshotKills;
        headshotKills += status.attributes.gameModeStats.squad.headshotKills;
        headshotKills += status.attributes.gameModeStats["squad-fpp"].headshotKills;

        return headshotKills
    }


    function getAllTeamKills() {
        let teamKills = 0;

        teamKills += status.attributes.gameModeStats.duo.teamKills;
        teamKills += status.attributes.gameModeStats["duo-fpp"].teamKills;
        teamKills += status.attributes.gameModeStats.solo.teamKills;
        teamKills += status.attributes.gameModeStats["solo-fpp"].teamKills;
        teamKills += status.attributes.gameModeStats.squad.teamKills;
        teamKills += status.attributes.gameModeStats["squad-fpp"].teamKills;

        return teamKills
    }


    function getAllVehiclesDestroyed() {
        let vehicleDestroys = 0;

        vehicleDestroys += status.attributes.gameModeStats.duo.vehicleDestroys;
        vehicleDestroys += status.attributes.gameModeStats["duo-fpp"].vehicleDestroys;
        vehicleDestroys += status.attributes.gameModeStats.solo.vehicleDestroys;
        vehicleDestroys += status.attributes.gameModeStats["solo-fpp"].vehicleDestroys;
        vehicleDestroys += status.attributes.gameModeStats.squad.vehicleDestroys;
        vehicleDestroys += status.attributes.gameModeStats["squad-fpp"].vehicleDestroys;

        return vehicleDestroys
    }


    function getAllEnemiesKnockedOut() {
        let dBNOs = 0;

        dBNOs += status.attributes.gameModeStats.duo.dBNOs;
        dBNOs += status.attributes.gameModeStats["duo-fpp"].dBNOs;
        dBNOs += status.attributes.gameModeStats.solo.dBNOs;
        dBNOs += status.attributes.gameModeStats["solo-fpp"].dBNOs;
        dBNOs += status.attributes.gameModeStats.squad.dBNOs;
        dBNOs += status.attributes.gameModeStats["squad-fpp"].dBNOs;

        return dBNOs
    }


    function getAllDamageGiven() {
        let damageDealt = 0;

        damageDealt += status.attributes.gameModeStats.duo.damageDealt;
        damageDealt += status.attributes.gameModeStats["duo-fpp"].damageDealt;
        damageDealt += status.attributes.gameModeStats.solo.damageDealt;
        damageDealt += status.attributes.gameModeStats["solo-fpp"].damageDealt;
        damageDealt += status.attributes.gameModeStats.squad.damageDealt;
        damageDealt += status.attributes.gameModeStats["squad-fpp"].damageDealt;

        return damageDealt
    }

    function getAllWalkedDistance() {
        let walkDistance = 0;

        walkDistance += status.attributes.gameModeStats.duo.walkDistance;
        walkDistance += status.attributes.gameModeStats["duo-fpp"].walkDistance;
        walkDistance += status.attributes.gameModeStats.solo.walkDistance;
        walkDistance += status.attributes.gameModeStats["solo-fpp"].walkDistance;
        walkDistance += status.attributes.gameModeStats.squad.walkDistance;
        walkDistance += status.attributes.gameModeStats["squad-fpp"].walkDistance;

        return walkDistance
    }

    return (
        <div className="w-screen h-screen px-20 py-5 flex flex-col justify-start items-center gap-5 overflow-y-auto">
            <div className="w-full flex justify-center items-center relative">
                <Link href='/' ><Home className="absolute left-0 hover:brightness-150" /></Link>
                <h1 className="text-3xl font-bold">Status de {player.attributes.name}</h1>
            </div>

            <div className="flex-1 w-full 2xl:w-2/3">
                <div className=" bg-zinc-900 grid grid-cols-3">

                    <div className="flex flex-col justify-around items-center p-5 border-b">
                        <h2 className="text-2xl font-normal">Kill/Death</h2>
                        <p className="text-5xl font-normal">{(sumAllKills() / sumAllDeaths()).toFixed(2)}</p>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">

                                <p className="text-lg font-semibold">Kills</p>

                                <div className="flex justify-center items-center gap-1">
                                    <p className="text-lg font-semibold">{sumAllKills()}  </p>
                                    <X className="w-full text-red-500" />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Deaths</p>

                                <div className="flex justify-center items-center gap-1">
                                    <p className="text-lg font-semibold">{sumAllDeaths()}</p>
                                    <Skull className="w-full text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-around items-center p-5 border-x border-b">
                        <h2 className="text-2xl font-normal">Wins/Lose</h2>
                        <p className="text-5xl font-normal">{(sumAllWins() / sumAllLosses()).toFixed(2)}</p>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Win</p>

                                <div className="flex justify-center items-center gap-1">
                                    <p className="text-lg font-semibold">{sumAllWins()}</p>
                                    <Trophy className="w-full text-yellow-300" />
                                </div>

                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Loses</p>

                                <div className="flex justify-center items-center gap-1">
                                    <p className="text-lg font-semibold">{sumAllLosses()}</p>
                                    <XCircle className="w-full text-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-around items-center p-5 border-b">
                        <h2 className="text-2xl font-normal">Highest Killstreak</h2>
                        <p className="text-5xl font-normal">{getHighestKillstreak()}</p>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <p className="text-lg font-semibold">Longest time survived</p>

                                <div className="w-full flex justify-center items-center gap-1">
                                    <Clock className="text-cyan-300" />
                                    <p className="text-lg font-semibold">{getAndCalculateLongestTimeSurvived()} Minutes</p>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-around items-center p-5 border-b">
                        <h2 className="text-2xl font-normal">Longest Kill</h2>

                        <div className="w-full flex justify-center items-center gap-2">
                            <Ruler className="text-yellow-200" />
                            <p className="text-5xl font-normal">{getLongestKill().toFixed(2)} m</p>
                        </div>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Roadkills</p>

                                <div className="w-full flex justify-center items-center gap-2">
                                    <Accessibility className="text-green-500" />
                                    <p className="text-lg font-semibold">{getRoadKills()}</p>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-around items-center p-5 border-x border-b">
                        <h2 className="text-2xl font-normal">Headshost</h2>

                        <div className="w-full flex justify-center items-center gap-2">
                            <p className="text-5xl font-normal">{getAllHeadshotsKills()}</p>
                            <Crosshair className="text-green-500" />
                        </div>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Teamkills</p>

                                <div className="w-full flex justify-center items-center gap-2">
                                    <p className="text-lg font-semibold">{getAllTeamKills()}</p>
                                    <ThumbsDown className="text-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-around items-center p-5 border-b">
                        <h2 className="text-2xl font-normal">Vehicles destroyed</h2>

                        <div className="w-full flex justify-center items-center gap-2">
                            <p className="text-5xl font-normal">{getAllVehiclesDestroyed()}</p>
                            <Car className="text-orange-500" />
                        </div>

                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Enemies knocked out</p>


                                <div className="w-full flex justify-center items-center gap-2">
                                    <p className="text-lg font-semibold">{getAllEnemiesKnockedOut()}</p>
                                    <Hand className="text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col justify-around items-center p-5 col-span-3">
                        <h2 className="text-2xl font-normal">Damage given</h2>

                        <div className="w-full flex justify-center items-center gap-2">
                            <p className="text-5xl font-normal">{getAllDamageGiven().toFixed(0)}</p>
                            <HeartPulse className="text-red-500" />
                        </div>


                        <div className="flex justify-around items-center gap-10">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-semibold">Walked distance</p>

                                <div className="w-full flex justify-center items-center gap-2">
                                    <p className="text-lg font-semibold">{getAllWalkedDistance().toFixed(2)} km</p>
                                    <Footprints className="text-gray-500" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 grid grid-cols-1 mt-10">
                    <div className="flex flex-col justify-center items-center p-5 col-span-3 gap-5">
                        <h2 className="text-3xl font-normal">Clan</h2>

                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            <p className="text-5xl font-normal">{clan.attributes.clanName} <span className="text-red-500">[{clan.attributes.clanTag}]</span></p>

                            <p className="text-3xl font-normal">Members: {clan.attributes.clanMemberCount}/100</p>

                            <p className="text-3xl font-normal">Level: {clan.attributes.clanLevel}</p>
                        </div>
                    </div>
                </div>

                
            </div>


        </div>
    )
}