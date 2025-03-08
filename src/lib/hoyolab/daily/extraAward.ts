export interface DailyExtraAward {
    awards: Award[];
    total_cnt: number;
    ys_first_award: boolean;
    has_short_act: boolean;
    short_act_info: Shortactinfo;
}

interface Shortactinfo {
    awards: any[];
    start_timestamp: string;
    end_timestamp: string;
    total_cnt: number;
}

interface Award {
    id: number;
    icon: string;
    name: string;
    cnt: number;
    sign_day: number;
}
