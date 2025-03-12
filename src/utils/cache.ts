import fs from "fs";

// get cache datas
interface Cache {
    redeemedCodes?: string[];
}

const cache: Cache = fs.existsSync("cache.json")
    ? JSON.parse(fs.readFileSync("cache.json", "utf-8"))
    : {};

export default cache;

let exitAble = true;
process.on("beforeExit", () => {
    if (exitAble) {
        fs.writeFileSync("cache.json", JSON.stringify(cache), "utf-8");
        exitAble = false;
    }
});
