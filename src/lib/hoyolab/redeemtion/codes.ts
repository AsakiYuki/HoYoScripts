export interface RedeemtionCodes {
    active: Active[];
    inactive: Active[];
}

interface Active {
    code: string;
    rewards: string[];
}
