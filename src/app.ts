import { HoYoLab } from "./lib/hoyolab";
import Secret from "./utils/secret";

async function main() {
    const hoyolab = new HoYoLab(Secret.cookies[0]);
    const starRail = (await hoyolab.starRail("prod_official_asia"))!;
    const starRailRedeem = starRail.redeem();

    console.log(await starRail.index());
    console.log(await starRailRedeem.redeem("IFYOUAREREADINGTHIS"));
}

main();
