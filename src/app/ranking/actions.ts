import { api } from "@/data/api"
import { LeaderboardsIncluded } from "@/data/types/leaderboards"
import { Season } from "@/data/types/season"

export async function getRankCurrentSeason(): Promise<[LeaderboardsIncluded[], currentSeasonId: string]> {
    const response = await api('/shards/steam/seasons', {
        next: {
            revalidate: 60 * 60, // 1 hour
        }
    })

    const res = await response.json()
    const seasons = res.data

    const currentSeason: Season[] = seasons.filter((season: Season) => season.attributes.isCurrentSeason === true)


    const currentSeasonId = currentSeason[0].id

    const response2 = await api(`/shards/pc-sa/leaderboards/${currentSeasonId}/squad-fpp`, {
        next: {
            revalidate: 60 * 30, // 30 minutes
        }
    })

    const res2 = await response2.json()
    const leaderboards = res2.included
    console.log(leaderboards)

    return [leaderboards, currentSeasonId]
}