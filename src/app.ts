import { HTTPRequest } from "./lib/hoyolab/HTTPRequest";
import Secret from "./utils/secret";

const request = new HTTPRequest(Secret.cookies[0]);

request
    .fetch("https://sg-public-api.hoyolab.com/event/game_record/card/wapi/getGameRecordCard", {
        searchParams: {
            uid: 246916273,
        },
        security: true,
    })
    .then(v => {
        console.log(v);
    });
