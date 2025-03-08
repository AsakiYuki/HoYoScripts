import { HoYoLab } from "./lib/hoyolab";
import Secret from "./utils/secret";

async function main() {
    const hoyolab = new HoYoLab(Secret.cookies[0], "vi-vn");
    const starRail = (await hoyolab.starRail("prod_official_asia"))!;
    const starRailDaily = starRail.daily();

    console.log(await starRailDaily.claim());
}

main();
