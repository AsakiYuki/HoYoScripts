export class Cookie {
    cookie: Map<string, any>;

    protected parser(cookie: string) {
        const value = cookie.split(";");
        const data: Map<string, any> = new Map();

        for (const cookie of value) {
            const [key, value] = cookie.split("=").map(v => v.trim());

            data.set(key, decodeURIComponent(value));
        }

        return data;
    }

    constructor(cookie: string) {
        const map = this.parser(cookie);

        this.cookie = map;

        const ltuid = map.get("ltuid");
        const accountId = map.get("account_id");
        const accountIdV2 = map.get("account_id_v2");

        if (ltuid && !accountId) {
            map.set("account_id", ltuid);
        } else if (!ltuid && accountId) {
            map.set("ltuid", accountId);
        }

        if (!accountIdV2 && (accountId || ltuid) !== null) {
            map.set("account_id_v2", accountId || ltuid);
        }

        if (!map.get("ltoken_v2") || !map.get("ltuid_v2")) {
            throw new Error("Cookie key ltuid or ltoken doesnt exist !");
        }
    }

    get() {
        const cookies: string[] = [];

        this.cookie.forEach((value, key) => {
            cookies.push(`${key}=${encodeURIComponent(value)}`);
        });

        return cookies.join("; ");
    }

    setCookie(setCookie: string | Cookie) {
        const cookies = setCookie instanceof Cookie ? setCookie.cookie : this.parser(setCookie);

        cookies.forEach((value, key) => {
            this.cookie.set(key, value);
        });
    }
}
