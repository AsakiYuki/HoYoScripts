export interface HoYoLabFull {
    user_info: Userinfo;
    follow_relation: null;
    perm_game_list: any[];
    perm_common_list: any[];
    creator_info: Creatorinfo;
    paladin_info: Paladininfo;
    perm_expr_list: any[];
    collection_info: Collectioninfo;
    black_relation: Blackrelation;
    requesting_info: Requestinginfo;
    permission_module: Permissionmodule;
}

interface Permissionmodule {
    perms: Perm[];
    perm_game_list: any[];
    perm_common_list: any[];
    perm_expr_list: any[];
    perm_role: null;
}

interface Perm {
    id: string;
}

interface Requestinginfo {
    last_requesting_time: string;
    can_requesting: boolean;
}

interface Blackrelation {
    is_blacking: boolean;
    is_blacked: boolean;
}

interface Collectioninfo {
    num: number;
}

interface Paladininfo {
    path: string;
}

interface Creatorinfo {
    show_beta: boolean;
    can_top: boolean;
    can_collect: boolean;
    card_type: string;
    card_url: string;
}

interface Userinfo {
    uid: string;
    nickname: string;
    introduce: string;
    avatar: string;
    gender: number;
    certification: null;
    achieve: Achieve;
    community_info: Communityinfo;
    level: null;
    pendant: string;
    community_email: string;
    avatar_url: string;
    bg_url: string;
    pc_bg_url: string;
    nickname_times_left: string;
    badge: Badge;
    lantern: null;
    avatar_extra: Avatarextra;
}

interface Avatarextra {
    allow_custom_avatar: boolean;
    next_can_set_time: string;
    next_time_desc: string;
    latest_avatar_record_id: string;
    latest_rejected_at: string;
    latest_audit_avatar_url: string;
}

interface Badge {
    id: string;
    level: number;
    icon_url: string;
    badge_app_path: string;
    badge_web_path: string;
    center_app_path: string;
    center_web_path: string;
    total: number;
}

interface Communityinfo {
    is_realname: boolean;
    agree_status: boolean;
    silent_end_time: number;
    forbid_end_time: number;
    info_upd_time: number;
    privacy_invisible: Privacyinvisible;
    notify_disable: Notifydisable;
    silent_end_time_v2: string;
    forbid_end_time_v2: string;
    info_upd_time_v2: string;
}

interface Notifydisable {
    reply: boolean;
    upvote: boolean;
    follow: boolean;
    system: boolean;
}

interface Privacyinvisible {
    post: boolean;
    collect: boolean;
    watermark: boolean;
    gamerecord: boolean;
    follow: boolean;
    follower: boolean;
    recommend: Recommend;
    marketing: Marketing;
    post_main: boolean;
    post_reply: boolean;
    collection_album: boolean;
    topic: boolean;
    marketing_push: Marketing;
    marketing_email: Marketing;
    show_new_kr_terms: boolean;
    is_ip_authorized: boolean;
}

interface Marketing {
    is_opened: boolean;
    hint_type: number;
    expire: string;
    is_hint: boolean;
    is_operation: boolean;
}

interface Recommend {
    is_opened: boolean;
    hint_type: number;
    expire: string;
    is_hint: boolean;
    is_operation: boolean;
    is_tip: boolean;
}

interface Achieve {
    like_num: string;
    post_num: string;
    replypost_num: string;
    follow_cnt: string;
    followed_cnt: string;
    topic_cnt: string;
    new_follower_num: string;
    good_post_num: string;
    like_num_unit: string;
    post_num_unit: string;
    replypost_num_unit: string;
    follow_cnt_unit: string;
    followed_cnt_unit: string;
    topic_cnt_unit: string;
    new_follower_num_unit: string;
    good_post_num_unit: string;
}
