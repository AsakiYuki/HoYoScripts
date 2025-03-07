export interface GetGameRecordCards {
    list: List[];
}

export enum GAME_ID {
    HONKAI_IMPACT_3RD = 1,
    GENSHIN_IMPACT,
    HONKAI_STAR_RAIL = 6,
    ZENLESS_ZONE_ZERO = 8,
}

interface List {
    has_role: boolean;
    game_id: GAME_ID;
    game_role_id: string;
    nickname: string;
    region: string;
    level: number;
    background_image: string;
    is_public: boolean;
    data: Datum[];
    region_name: string;
    url: string;
    data_switches: Dataswitch[];
    h5_data_switches: any[];
    background_color: string;
    background_image_v2: string;
    logo: string;
    game_name: string;
}

interface Dataswitch {
    switch_id: number;
    is_public: boolean;
    switch_name: string;
}

interface Datum {
    name: string;
    type: number;
    value: string;
}
