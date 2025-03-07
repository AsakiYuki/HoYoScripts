import { WebhookSearchParams } from "./interface";

export class Webhook {
    constructor(protected url: string) {}

    protected buildUrl(searchParams?: WebhookSearchParams) {
        let url = this.url;

        // If there are no searchParams, return the URL
        if (!searchParams) return url;

        // Add the searchParams to the URL
        for (const key in searchParams) {
            url += `${url.includes("?") ? "&" : "?"}${key}=${searchParams[key]}`;
        }

        // Return the URL
        return url;
    }

    async execute(query: object, searchParams?: WebhookSearchParams) {
        const webhook = this.buildUrl(searchParams);

        return await fetch(webhook, {
            method: "POST",
            body: JSON.stringify(query),
        });
    }
}
