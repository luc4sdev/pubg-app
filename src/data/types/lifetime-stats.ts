export interface LifetimeStats {
    type: string;
    attributes: {
        gameModeStats: {
            duo: {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1number: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
            "duo-fpp": {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1number: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
            solo: {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1number: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
            "solo-fpp": {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1number: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
            squad: {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1number: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
            "squad-fpp": {
                assists: number;
                boosts: number;
                dBNOs: number;
                dailyKills: number;
                dailyWins: number;
                damageDealt: number;
                days: number;
                headshotKills: number;
                heals: number;
                killPoints: number;
                kills: number;
                longestKill: number;
                longestTimeSurvived: number;
                losses: number;
                maxKillStreaks: number;
                mostSurvivalTime: number;
                rankPoints: number;
                rankPointsTitle: string;
                revives: number;
                rideDistance: number;
                roadKills: number;
                roundMostKills: number;
                roundsPlayed: number;
                suicides: number;
                swimDistance: number;
                teamKills: number;
                timeSurvived: number;
                tp1string: number;
                vehicleDestroys: number;
                walkDistance: number;
                weaponsAcquired: number;
                weeklyKills: number;
                weeklyWins: number;
                winPoints: number;
                wins: number;
            }
        }
        bestRankPoint: number;
    }
    relationships: {
        matchesSoloFPP: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }
        matchesDuo: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }
        matchesDuoFPP: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }

        matchesSquad: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }

        matchesSquadFPP: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }

        season: {
            data: {
                type: string;
                id: string;
            }
        }

        player: {
            data: {
                type: string;
                id: string;
            }
        }

        matchesSolo: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }
    }
}