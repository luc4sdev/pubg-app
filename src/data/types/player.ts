export interface Player {
    type: string;
    id: string;

    attributes: {
        shardId: string;
        patchVersion: string;
        banType: string;
        clanId: string;
        name: string;
        stats: string;
        titleId: string;
    }

    relationships: {
        assets: {
            data: []
        }

        matches: {
            data: [
                {
                    type: string;
                    id: string;
                }
            ]
        }
    }

    links: {
        self: string;
        schema: string;
    }
}