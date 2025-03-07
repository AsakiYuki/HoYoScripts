import { HoYoLabFull } from "./full";
import { GetGameRecordCards } from "./getGameRecordCards";
import { HTTPRequest } from "./HTTPRequest";

export class HoYoLab {
    private httpRequest: HTTPRequest;

    constructor(cookie: string, language: string = "en-us", httpRequest?: HTTPRequest) {
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
}
