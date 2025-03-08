import { HoYoLab } from "..";
import { Daily } from "../daily";
import { GAME_ID } from "../getGameRecordCards";
import { HTTPRequest } from "../HTTPRequest";
import { ActCalender } from "./getActCalender";
import { StarRailIndex } from "./index.interface";

export class StarRail {
    private httpRequest: HTTPRequest;
    private hoyolab: HoYoLab;

    constructor(
        protected cookie: string,
        protected server: string,
        protected language: string = "en-us",
        protected roleId: number | string,
        httpRequest?: HTTPRequest,
        hoyolab?: HoYoLab
    ) {
        if (httpRequest) {
            this.httpRequest = httpRequest;
        } else {
            this.httpRequest = new HTTPRequest(cookie, language);
        }

        if (hoyolab) {
            this.hoyolab = hoyolab;
        } else {
            this.hoyolab = new HoYoLab(cookie, language, this.httpRequest);
        }
    }

    daily() {
        return new Daily(this.cookie, this.language, GAME_ID.HONKAI_STAR_RAIL, this.httpRequest);
    }

    async index() {
        const response = this.httpRequest.fetch<StarRailIndex>(
            "https://sg-public-api.hoyolab.com/event/game_record/hkrpg/api/index",
            {
                security: true,
                searchParams: {
                    role_id: this.roleId,
                    server: this.server,
                },
            }
        );

        return response;
    }

    async getRecordCard() {
        const recordCards = await this.hoyolab.getGameRecordCards();
        const starRailCard = recordCards?.data?.list.find(card => {
            return card.game_id === GAME_ID.HONKAI_STAR_RAIL && card.region === this.server;
        });

        return starRailCard!;
    }

    async getActCalender() {
        const response = this.httpRequest.fetch<ActCalender>(
            "https://sg-public-api.hoyolab.com/event/game_record/hkrpg/api/get_act_calender",
            {
                security: true,
                searchParams: {
                    role_id: this.roleId,
                    server: this.server,
                },
            }
        );

        return response;
    }
}
