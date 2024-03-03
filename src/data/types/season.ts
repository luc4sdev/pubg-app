export interface Season {
    type: string;
    id: string;
    attributes: {
        isCurrentSeason: boolean;
        isOffseason: boolean;
    }
}