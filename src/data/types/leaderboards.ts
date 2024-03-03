export interface LeaderboardsData {
    data: {
        type: string;
        id: string;
        attributes: {
            seasonId: string;
            shardId: string;
            gameMode: string;
        }
        relationships: {
            players: {
                data: [
                    {
                        type: string;
                        id: string;
                    }
                ]
            }
        }
    }

}
export interface LeaderboardsIncluded {
    
            type: string;
            id: string;
            attributes: {
                name: string;
                rank: number;
                stats: {
                    rankPoints: number;
                    wins: number;
                    games: number;
                    winRatio: number;
                    averageDamage: number;
                    kills: number;
                    killDeathRatio: number;
                    kda: number;
                    averageRank: number;
                    tier: string;
                    subTier: string;
                }

            }
    
}