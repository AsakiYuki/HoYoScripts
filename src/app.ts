import { Database } from "./lib/database";
import Secret from "./utils/secret";

(async () => {
    const webhook = new Database(Secret.database.api, Secret.database.key);

    const test = await webhook.deleteDatabase("TEST");
})();
