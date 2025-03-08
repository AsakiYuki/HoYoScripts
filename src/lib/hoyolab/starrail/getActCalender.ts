export interface ActCalender {
    avatar_card_pool_list: Avatarcardpoollist[];
    equip_card_pool_list: Equipcardpoollist[];
    act_list: Actlist[];
    challenge_list: Challengelist[];
    now: string;
    cur_game_version: string;
}

interface Challengelist {
    group_id: number;
    name_mi18n: string;
    challenge_type: string;
    total_progress: number;
    current_progress: number;
    status: string;
    time_info: Timeinfo;
    reward_list: Rewardlist2[];
    special_reward: Rewardlist2;
    show_text: string;
}

interface Rewardlist2 {
    item_id: number;
    name: string;
    icon: string;
    wiki_url: string;
    num: number;
    rarity: string;
}

interface Actlist {
    id: number;
    version: string;
    name: string;
    act_type: string;
    act_status: string;
    reward_list: Rewardlist[];
    total_progress: number;
    current_progress: number;
    time_info: Timeinfo;
    panel_id: number;
    panel_desc: string;
    strategy: string;
    multiple_drop_type: number;
    multiple_drop_type_list: number[];
    count_refresh_type: number;
    count_value: number;
    drop_multiple: number;
    is_after_version: boolean;
    sort_weight: number;
    special_reward: Rewardlist;
    all_finished: boolean;
    show_text: string;
    act_time_type: string;
}

interface Rewardlist {
    item_id: number;
    name: string;
    icon: string;
    wiki_url: string;
    num: number;
    rarity: string;
    reward_type: string;
}

interface Equipcardpoollist {
    name: string;
    type: string;
    avatar_list: any[];
    equip_list: Equiplist[];
    is_after_version: boolean;
    time_info: Timeinfo;
    version: string;
    id: string;
}

interface Equiplist {
    item_id: string;
    item_name: string;
    item_url: string;
    avatar_base_type: string;
    rarity: string;
    is_forward: boolean;
    wiki_url: string;
}

interface Avatarcardpoollist {
    name: string;
    type: string;
    avatar_list: Avatarlist[];
    equip_list: any[];
    is_after_version: boolean;
    time_info: Timeinfo;
    version: string;
    id: string;
}

interface Timeinfo {
    start_ts: string;
    end_ts: string;
    start_time: string;
    end_time: string;
    now: string;
}

interface Avatarlist {
    item_id: string;
    item_name: string;
    icon_url: string;
    damage_type: string;
    rarity: string;
    avatar_base_type: string;
    is_forward: boolean;
    wiki_url: string;
    item_avatar_icon_path: string;
    damage_type_name: string;
}
