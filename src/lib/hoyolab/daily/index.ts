import { GAME_ID } from "../getGameRecordCards";
import { HTTPRequest } from "../HTTPRequest";

interface DailyAPI {
    claim: string;
    awards: string;
    extraAwards: string;
    info: string;
    act: string;
    signgame: string;
}

export class Daily {
    protected httpRequest: HTTPRequest;

    protected api: DailyAPI;

    constructor(
        cookie: string,
        language: string = "en-us",
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
                    extraAwards:
                        "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/extra_award",
                    info: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/info",
                    claim: "https://sg-public-api.hoyolab.com/event/luna/hkrpg/os/sign",
                    act: "e202303301540311",
                    signgame: "hkrpg",
                };
                break;
        }
    }

    async claim() {
        const response = await this.httpRequest.fetch(this.api.claim, {
            method: "POST",
            headers: {
                "x-rpc-signgame": this.api.signgame,
            },
            searchParams: {
                act_id: this.api.act,
            },
        });

        return response;
    }
}
