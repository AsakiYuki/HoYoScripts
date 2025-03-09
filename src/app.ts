import { HoYoLab } from "./lib/hoyolab";
import { GetGameRecordCards } from "./lib/hoyolab/getGameRecordCards";
import { StarRail } from "./lib/hoyolab/starrail";
import { StarRailIndex } from "./lib/hoyolab/starrail/index.interface";
import { Webhook } from "./lib/webhook";
import { WebhookEmbedAuthor } from "./lib/webhook/interface";
import { calcAvgImgColor } from "./utils/color";
import Secret from "./utils/secret";

// HoYoLab classes
const hoyolab = new HoYoLab(Secret.cookies[0]);

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
    const redeemtion = hsr.redeem();
    const codes = await redeemtion.fetch();

    const activeCodes = codes.active;

    const awards: string[] = [];

    for (const redeemInfo of activeCodes) {
        const { retcode } = (await redeemtion.redeem(redeemInfo.code))!;

        if (!retcode) {
            console.log(`Redeem completed: ${redeemInfo.code}`);
            awards.push(
                `- [${redeemInfo.code}](https://hsr.hoyoverse.com/gift?code=${
                    redeemInfo.code
                }): ${redeemInfo.rewards.join(", ")}`
            );
        }

        await wait(6000);
    }

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
                },
            ],
        });
    }
}

async function main() {
    try {
        const hsr = await hoyolab.starRail("prod_official_asia");

        if (hsr) {
            // Get some data
            const index = await hsr.index();
            const recordCard = await hsr.getRecordCard();

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
