import { HoYoLabFull } from "./full";
import { GAME_ID, GetGameRecordCards } from "./getGameRecordCards";
import { HTTPRequest } from "./HTTPRequest";
import { StarRail } from "./starrail";

export class HoYoLab {
    private httpRequest: HTTPRequest;

    constructor(
        protected cookie: string,
        protected language: string = "en-us",
        httpRequest?: HTTPRequest
    ) {
        if (httpRequest) {
            this.httpRequest = httpRequest;
        } else {
            this.httpRequest = new HTTPRequest(cookie, language);
        }
    }

    async full() {
        const response = await this.httpRequest.fetch<HoYoLabFull>(
            "https://bbs-api-os.hoyolab.com/community/painter/wapi/user/full",
            {
                method: "POST",
            }
        );

        return response;
    }

    async getGameRecordCards(uid?: string | number) {
        if (!uid) {
            const info = await this.full();
            uid = info?.data?.user_info.uid!;
        }

        const response = await this.httpRequest.fetch<GetGameRecordCards>(
            "https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard",
            {
                searchParams: {
                    uid: uid,
                },
            }
        );

        return response;
    }

    async starRail(server: string, uid?: number | string) {
        try {
            if (!uid) {
                const gameCards = await this.getGameRecordCards();
                const starRailCard = gameCards?.data?.list.find(game => {
                    return game.game_id === GAME_ID.HONKAI_STAR_RAIL && game.region === server;
                });

                if (starRailCard) {
                    uid = starRailCard.game_role_id;
                } else throw "Game account not found!";
            }

            return new StarRail(this.cookie, server, this.language, uid, this.httpRequest, this);
        } catch (error) {
            console.error("[ERROR]", error);
            return null;
        }
    }
}
