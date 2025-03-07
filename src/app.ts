import { HoYoLab } from "./lib/hoyolab";
import Secret from "./utils/secret";

async function main() {
    const hoyolab = new HoYoLab(Secret.cookies[0]);
    const info = await hoyolab.getGameRecordCards();

    console.log(JSON.stringify(info, null, 2));
}

main();
