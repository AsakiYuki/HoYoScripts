export interface StarRailIndex {
    stats: Stats;
    avatar_list: Avatarlist[];
    cur_head_icon_url: string;
    phone_background_image_url: string;
}

interface Avatarlist {
    id: number;
    level: number;
    name: string;
    element: string;
    icon: string;
    rarity: number;
    rank: number;
    is_chosen: boolean;
    equip: Equip | null;
    base_type: number;
    figure_path: string;
    element_id: number;
}

interface Equip {
    id: number;
    level: number;
    rank: number;
    name: string;
    desc: string;
    icon: string;
    rarity: number;
}

interface Stats {
    active_days: number;
    avatar_num: number;
    achievement_num: number;
    chest_num: number;
    abyss_process: string;
    field_ext_map: Fieldextmap;
    dream_paster_num: number;
    season_title: string;
}

interface Fieldextmap {
    avatar_num: Avatarnum;
    achievement_num: Avatarnum;
    chest_num: Avatarnum;
    dream_paster_num: Avatarnum;
    season_title: Avatarnum;
    active_days: Avatarnum;
}

interface Avatarnum {
    link: string;
    backup_link: string;
}
