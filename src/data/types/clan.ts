export interface Clan {
    type: string;
    id: string;
    attributes: {
        clanName: string;
        clanTag: string;
        clanLevel: number;
        clanMemberCount: number;
    }
}