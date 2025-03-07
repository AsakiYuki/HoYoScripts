import { Webhook } from "../webhook";

export class Database {
    protected webhook: Webhook;

    constructor(protected API: string, protected DATA_KEY: string) {
        this.webhook = new Webhook(API);
    }

    protected async fetchContent(id: string | number) {
        const message = await this.webhook.getWebhookMessage(id);
        return message.content;
    }

    protected async fetchJson(id: string | number) {
        const content = await this.fetchContent(id);

        try {
            return JSON.parse(content);
        } catch (error) {
            console.error("\0x1b[31m[ERROR]\0x1b[0m", error);
            return null;
        }
    }

    async fetch() {
        return await this.fetchJson(this.DATA_KEY);
    }

    async write(data: object) {
        return await this.webhook.editWebhookMessage(this.DATA_KEY, {
            content: JSON.stringify(data),
        });
    }

    async getDatabase(ACCESS_KEY: string) {
        const keys = await this.fetch();

        if (keys[ACCESS_KEY]) {
            return new Database(this.API, keys[ACCESS_KEY]);
        } else {
            const execute = await this.webhook.executeWait({
                content: "{}",
            });

            keys[ACCESS_KEY] = `${execute.id}`;
            await this.write(keys);

            return new Database(this.API, `${execute.id}`);
        }
    }

    async deleteDatabase(ACCESS_KEY: string) {
        const data = await this.fetch();

        await this.webhook.deleteWebhookMessage(data[ACCESS_KEY]);
        delete data[ACCESS_KEY];
        await this.write(data);
    }
}
