import { Cookie } from "./lib/Cookie";
import { HoYoLab } from "./lib/hoyolab";
import { GetGameRecordCards } from "./lib/hoyolab/getGameRecordCards";
import { StarRail } from "./lib/hoyolab/starrail";
import { StarRailIndex } from "./lib/hoyolab/starrail/index.interface";
import { Webhook } from "./lib/webhook";
import { WebhookEmbedAuthor } from "./lib/webhook/interface";
import { calcAvgImgColor } from "./utils/color";
import Secret from "./utils/secret";
import Cache from "./utils/cache";
import { timestamp } from "./utils/timer";

const cookie = new Cookie(Secret.cookies[0]);

// HoYoLab classes
const hoyolab = new HoYoLab(cookie);

// Discord Webhook classes
const webhook = new Webhook(Secret.hoyolog.api, {
    avatar_url: Secret.hoyolog.avatar,
    username: Secret.hoyolog.name,
});

function webhookAuthor(
    index: StarRailIndex,
    recordCard: GetGameRecordCards["list"][number]
): WebhookEmbedAuthor {
    return {
        name: `${recordCard.nickname} - ${recordCard.game_role_id} - Lv.${recordCard.level}`,
        url: recordCard.url,
        icon_url: index.cur_head_icon_url,
    };
}

async function wait(duration: number) {
    return new Promise((res, rej) => {
        if (duration > 0) setTimeout(res, duration);
        else rej("duration must be greater than 0");
    });
}

async function claimHSRDaily(
    hsr: StarRail,
    index: StarRailIndex,
    recordCard: GetGameRecordCards["list"][number]
) {
    // Daily module
    const daily = hsr.daily();

    // claim
    const {
        retcode,
        data: { award },
    } = await daily.claim();

    if (!retcode) {
        const avgColor = await calcAvgImgColor(award?.icon!);

        await webhook.execute({
            embeds: [
                {
                    author: webhookAuthor(index, recordCard),
                    color: avgColor,
                    thumbnail: {
                        url: award?.icon!,
                    },
                    description: `### Honkai: Star Rail - Daily checkin.\nToday daily checkin completed, Trailblazer~\n### Rewards\n- ${award?.name} x${award?.cnt}`,
                    timestamp: timestamp(),
                },
            ],
        });
    }
}

async function claimHSRCodes(
    hsr: StarRail,
    index: StarRailIndex,
    recordCard: GetGameRecordCards["list"][number]
) {
    // redeem classes
    const redeemtion = hsr.redeem();

    // fetch star rail active codes
    const codes = await redeemtion.fetch();
    const activeCodes = codes.active;

    // save only active codes
    const activeRedeemedCodes = (Cache.redeemedCodes || []).filter(redeemedCode =>
        activeCodes.find(({ code }) => code === redeemedCode)
    );

    // get new active codes
    const newActiveCodes = activeCodes.filter(({ code }) => !activeRedeemedCodes.includes(code));

    // save rewards info
    const awards: string[] = [];

    // start to redeems
    for (const redeemInfo of newActiveCodes) {
        // get message and response code
        const { retcode, message } = (await redeemtion.redeem(redeemInfo.code))!;

        // if redeem complete then push notify to awards
        if (!retcode) {
            console.log(`Redeem completed: ${redeemInfo.code}`);
            awards.push(
                `- [${redeemInfo.code}](https://hsr.hoyoverse.com/gift?code=${
                    redeemInfo.code
                }): ${redeemInfo.rewards.join(", ")}`
            );
        }
        // if redeem unsuccessful then log error
        else {
            console.log(`Redeem failed with message '${message}' -> ${retcode}`);
        }

        // save the code
        activeRedeemedCodes.push(redeemInfo.code);

        // await 6 seconds avoid API spam
        if (newActiveCodes[newActiveCodes.length - 1].code !== redeemInfo.code) await wait(6e3);
    }

    // if at least one reward is redeemed, push the notify.
    if (awards.length) {
        webhook.execute({
            embeds: [
                {
                    author: webhookAuthor(index, recordCard),
                    description: [
                        "### Honkai: Star Rail - Redeemtion codes",
                        "Redeem all active codes completed, Trailblazer~",
                        "### Rewards",
                        ...awards,
                    ].join("\n"),
                    color: 0xeeff54,
                    timestamp: timestamp(),
                },
            ],
        });
    }
    // save all redeemed codes
    Cache.redeemedCodes = activeRedeemedCodes;
}

async function main() {
    try {
        // Get HSR Classes
        const hsr = await hoyolab.starRail("prod_official_asia");

        if (hsr) {
            // Get some data
            const [index, recordCard] = await Promise.all([hsr.index(), hsr.getRecordCard()]);

            console.log("Account name:", recordCard.nickname);
            console.log("UID:", recordCard.game_role_id);

            await Promise.all([
                claimHSRDaily(hsr, index?.data!, recordCard),
                claimHSRCodes(hsr, index?.data!, recordCard),
            ]);

            console.log("Script run completed!");
        }
    } catch (error) {
        console.error("[ERROR]", error);
    }
}
main();
