import { api } from "@/data/api";
import { Clan } from "@/data/types/clan";
import { LifetimeStats } from "@/data/types/lifetime-stats";
import { Player } from "@/data/types/player";

type PlayerData = [Player, LifetimeStats, Clan];

export async function getPlayerByName(id: string): Promise<PlayerData> {


    try {
        const response = await api(`/shards/steam/players?filter[playerNames]=${id}`, {
            next: {
                revalidate: 60 * 60, // 1 hour
            }
        })

        const res = await response.json()
        const player = res.data && res.data.length > 0 ? res.data[0] : null;
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
        const clan: Clan = res3.data

        if (!clan) {
            const clan: Clan = {
                id: null,
                type: null,
                attributes: null
            }
            return [player, status, clan]
        }

        return [player, status, clan]
    }
    catch (error) {
        return Promise.reject(error);
    }

}

export function sumAllKills(status: LifetimeStats) {
    let kills = 0;

    kills += status.attributes.gameModeStats.duo.kills;
    kills += status.attributes.gameModeStats["duo-fpp"].kills;
    kills += status.attributes.gameModeStats.solo.kills;
    kills += status.attributes.gameModeStats["solo-fpp"].kills;
    kills += status.attributes.gameModeStats.squad.kills;
    kills += status.attributes.gameModeStats["squad-fpp"].kills;

    return kills
}

export function sumAllDeaths(status: LifetimeStats) {
    let deaths = 0;

    deaths += status.attributes.gameModeStats.duo.losses;
    deaths += status.attributes.gameModeStats["duo-fpp"].losses;
    deaths += status.attributes.gameModeStats.solo.losses;
    deaths += status.attributes.gameModeStats["solo-fpp"].losses;
    deaths += status.attributes.gameModeStats.squad.losses;
    deaths += status.attributes.gameModeStats["squad-fpp"].losses;

    return deaths
}

export function sumAllWins(status: LifetimeStats) {
    let wins = 0;

    wins += status.attributes.gameModeStats.duo.wins;
    wins += status.attributes.gameModeStats["duo-fpp"].wins;
    wins += status.attributes.gameModeStats.solo.wins;
    wins += status.attributes.gameModeStats["solo-fpp"].wins;
    wins += status.attributes.gameModeStats.squad.wins;
    wins += status.attributes.gameModeStats["squad-fpp"].wins;

    return wins
}

export function sumAllLosses(status: LifetimeStats) {
    let losses = 0;

    losses += status.attributes.gameModeStats.duo.losses;
    losses += status.attributes.gameModeStats["duo-fpp"].losses;
    losses += status.attributes.gameModeStats.solo.losses;
    losses += status.attributes.gameModeStats["solo-fpp"].losses;
    losses += status.attributes.gameModeStats.squad.losses;
    losses += status.attributes.gameModeStats["squad-fpp"].losses;

    return losses
}


export function getHighestKillstreak(status: LifetimeStats) {
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


export function getAndCalculateLongestTimeSurvived(status: LifetimeStats) {
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


export function getLongestKill(status: LifetimeStats) {
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


export function getRoadKills(status: LifetimeStats) {
    let roadKills = 0;

    roadKills += status.attributes.gameModeStats.duo.roadKills;
    roadKills += status.attributes.gameModeStats["duo-fpp"].roadKills;
    roadKills += status.attributes.gameModeStats.solo.roadKills;
    roadKills += status.attributes.gameModeStats["solo-fpp"].roadKills;
    roadKills += status.attributes.gameModeStats.squad.roadKills;
    roadKills += status.attributes.gameModeStats["squad-fpp"].roadKills;

    return roadKills
}

export function getAllHeadshotsKills(status: LifetimeStats) {
    let headshotKills = 0;

    headshotKills += status.attributes.gameModeStats.duo.headshotKills;
    headshotKills += status.attributes.gameModeStats["duo-fpp"].headshotKills;
    headshotKills += status.attributes.gameModeStats.solo.headshotKills;
    headshotKills += status.attributes.gameModeStats["solo-fpp"].headshotKills;
    headshotKills += status.attributes.gameModeStats.squad.headshotKills;
    headshotKills += status.attributes.gameModeStats["squad-fpp"].headshotKills;

    return headshotKills
}


export function getAllTeamKills(status: LifetimeStats) {
    let teamKills = 0;

    teamKills += status.attributes.gameModeStats.duo.teamKills;
    teamKills += status.attributes.gameModeStats["duo-fpp"].teamKills;
    teamKills += status.attributes.gameModeStats.solo.teamKills;
    teamKills += status.attributes.gameModeStats["solo-fpp"].teamKills;
    teamKills += status.attributes.gameModeStats.squad.teamKills;
    teamKills += status.attributes.gameModeStats["squad-fpp"].teamKills;

    return teamKills
}


export function getAllVehiclesDestroyed(status: LifetimeStats) {
    let vehicleDestroys = 0;

    vehicleDestroys += status.attributes.gameModeStats.duo.vehicleDestroys;
    vehicleDestroys += status.attributes.gameModeStats["duo-fpp"].vehicleDestroys;
    vehicleDestroys += status.attributes.gameModeStats.solo.vehicleDestroys;
    vehicleDestroys += status.attributes.gameModeStats["solo-fpp"].vehicleDestroys;
    vehicleDestroys += status.attributes.gameModeStats.squad.vehicleDestroys;
    vehicleDestroys += status.attributes.gameModeStats["squad-fpp"].vehicleDestroys;

    return vehicleDestroys
}


export function getAllEnemiesKnockedOut(status: LifetimeStats) {
    let dBNOs = 0;

    dBNOs += status.attributes.gameModeStats.duo.dBNOs;
    dBNOs += status.attributes.gameModeStats["duo-fpp"].dBNOs;
    dBNOs += status.attributes.gameModeStats.solo.dBNOs;
    dBNOs += status.attributes.gameModeStats["solo-fpp"].dBNOs;
    dBNOs += status.attributes.gameModeStats.squad.dBNOs;
    dBNOs += status.attributes.gameModeStats["squad-fpp"].dBNOs;

    return dBNOs
}


export function getAllDamageGiven(status: LifetimeStats) {
    let damageDealt = 0;

    damageDealt += status.attributes.gameModeStats.duo.damageDealt;
    damageDealt += status.attributes.gameModeStats["duo-fpp"].damageDealt;
    damageDealt += status.attributes.gameModeStats.solo.damageDealt;
    damageDealt += status.attributes.gameModeStats["solo-fpp"].damageDealt;
    damageDealt += status.attributes.gameModeStats.squad.damageDealt;
    damageDealt += status.attributes.gameModeStats["squad-fpp"].damageDealt;

    return damageDealt
}

export function getAllWalkedDistance(status: LifetimeStats) {
    let walkDistance = 0;

    walkDistance += status.attributes.gameModeStats.duo.walkDistance;
    walkDistance += status.attributes.gameModeStats["duo-fpp"].walkDistance;
    walkDistance += status.attributes.gameModeStats.solo.walkDistance;
    walkDistance += status.attributes.gameModeStats["solo-fpp"].walkDistance;
    walkDistance += status.attributes.gameModeStats.squad.walkDistance;
    walkDistance += status.attributes.gameModeStats["squad-fpp"].walkDistance;

    return walkDistance
}