import { Cookie } from "../../Cookie";
import { GAME_ID } from "../getGameRecordCards";
import { HTTPRequest } from "../HTTPRequest";
import { DailyAwards } from "./awards";
import { DailyExtraAward } from "./extraAward";
import { DailyInfo } from "./info";

interface DailyAPI {
    sign: string;
    awards: string;
    extraAward: string;
    info: string;
    act: string;
    signgame: string;
}

export class Daily {
    protected httpRequest: HTTPRequest;
    protected api: DailyAPI;

    constructor(
        cookie: Cookie,
        protected language: string = "en-us",
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

    private setupAPI() {
        switch (this.game) {
            case GAME_ID.HONKAI_STAR_RAIL:
                this.api = {
                    awards: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/home",
                    extraAward: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/extra_award",
                    info: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/info",
                    sign: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/sign",
                    act: "e202303301540311",
                    signgame: "hkrpg",
                };
                break;
        }
    }

    async sign() {
        const response = await this.httpRequest.fetch<null>(this.api.sign, {
            method: "POST",
            headers: {
                "x-rpc-signgame": this.api.signgame,
            },
            searchParams: {
                lang: this.language,
                act_id: this.api.act,
            },
        });

        return response;
    }

    async extraAward() {
        const response = await this.httpRequest.fetch<DailyExtraAward>(this.api.extraAward, {
            searchParams: {
                act_id: this.api.act,
                lang: this.language,
            },
        });

        return response;
    }

    async info() {
        const response = await this.httpRequest.fetch<DailyInfo>(this.api.info, {
            searchParams: {
                act_id: this.api.act,
                lang: this.language,
            },
        });

        return response;
    }

    async awards() {
        const response = await this.httpRequest.fetch<DailyAwards>(this.api.awards, {
            searchParams: {
                act_id: this.api.act,
                lang: this.language,
            },
        });

        return response;
    }

    async claim() {
        const message = await this.sign();
        const [awards, info] = await Promise.all([this.awards(), this.info()]);
        const award = awards?.data?.awards[info?.data?.total_sign_day! - 1];

        return {
            retcode: message?.retcode!,
            message: message?.message!,
            data: {
                award,
            },
        };
    }
}
