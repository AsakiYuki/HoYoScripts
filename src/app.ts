import { HoYoLab } from "./lib/hoyolab";
import { GetGameRecordCards } from "./lib/hoyolab/getGameRecordCards";
import { StarRail } from "./lib/hoyolab/starrail";
import { StarRailIndex } from "./lib/hoyolab/starrail/index.interface";
import { Webhook } from "./lib/webhook";
import { calcAvgImgColor } from "./utils/color";
import Secret from "./utils/secret";

// HoYoLab classes
const hoyolab = new HoYoLab(Secret.cookies[0]);

// Discord Webhook classes
const webhook = new Webhook(Secret.hoyolog.api, {
    avatar_url: Secret.hoyolog.avatar,
    username: Secret.hoyolog.name,
});

async function claimHSRDaily(
    hsr: StarRail,
    index: StarRailIndex,
    recordCard: GetGameRecordCards["list"][number]
) {
    // Daily module
    const daily = hsr.daily();

    // ingame avatar
    const avatar = index.cur_head_icon_url;

    // ingame info
    const nickname = recordCard.nickname;
    const uid = recordCard.game_role_id;
    const level = recordCard.level;

    // claim
    const {
        retcode,
        message,
        data: { award },
    } = await daily.claim();

    if (retcode !== 0 || true) {
        const avgColor = await calcAvgImgColor(award?.icon!);
        console.log(avgColor);
    }
}

async function main() {
    try {
        const hsr = await hoyolab.starRail("prod_official_asia");

        if (hsr) {
            // Get some data
            const index = await hsr.index();
            const recordCard = await hsr.getRecordCard();

            claimHSRDaily(hsr, index?.data!, recordCard);
        }
    } catch (error) {
        console.error("[ERROR]", error);
    }
}
main();
