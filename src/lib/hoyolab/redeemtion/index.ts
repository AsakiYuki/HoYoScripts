import { Cookie } from "../../Cookie";
import { GAME_ID } from "../getGameRecordCards";
import { HTTPRequest } from "../HTTPRequest";
import { RedeemtionCodes } from "./codes";

interface RedeemtionAPI {
    game: string;
    fetch: string;
}

export class Redeemtion {
    protected httpRequest: HTTPRequest;
    protected api: RedeemtionAPI;

    constructor(
        cookie: Cookie,
        protected language: string = "en-us",
        protected roleId: number | string,
        protected server: string,
        protected game: GAME_ID,
        httpRequest?: HTTPRequest
    ) {
        if (httpRequest) {
            this.httpRequest = httpRequest;
        } else {
            this.httpRequest = new HTTPRequest(cookie, language);
        }

        this.setupAPI();
    }

    protected setupAPI() {
        switch (this.game) {
            case GAME_ID.HONKAI_STAR_RAIL:
                this.api = {
                    game: "hkrpg_global",
                    fetch: "starrail",
                };
                break;
        }
    }

    async redeem(code: string) {
        const response = await this.httpRequest.fetch(
            "https://sg-hkrpg-api.hoyolab.com/common/apicdkey/api/webExchangeCdkeyHyl",
            {
                method: "GET",
                searchParams: {
                    lang: this.language.split("-")[0],
                    game_biz: this.api.game,
                    uid: this.roleId,
                    region: this.server,
                    cdkey: code,
                },
            }
        );

        return response;
    }

    async fetch(): Promise<RedeemtionCodes> {
        const response = await fetch(
            `https://api.allorigins.win/raw?url=https://api.ennead.cc/mihoyo/${this.api.fetch}/codes`
        );
        const data = await response.json();
        return data;
    }
}
