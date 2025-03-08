export interface DailyAwards {
    month: number;
    awards: Award[];
    biz: string;
    resign: boolean;
    short_extra_award: Shortextraaward;
}

interface Shortextraaward {
    has_extra_award: boolean;
    start_time: string;
    end_time: string;
    list: any[];
    start_timestamp: string;
    end_timestamp: string;
}

interface Award {
    icon: string;
    name: string;
    cnt: number;
}
