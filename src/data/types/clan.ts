export interface Clan {
    type: string | null;
    id: string | null;
    attributes: {
        clanName: string;
        clanTag: string;
        clanLevel: number;
        clanMemberCount: number;
    } | null
}