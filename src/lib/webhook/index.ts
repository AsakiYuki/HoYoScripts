import {
    WebhookExecute,
    WebhookExecuteQueryParams,
    WebhookExecuteCompatibleQueryParams,
    WebhookGetMessage,
    WebhookMessage,
    WebhookEditMessage,
} from "./interface";

export class Webhook {
    constructor(protected url: string) {}

    protected buildUrl(searchParams?: Record<string, any>, path?: string) {
        let url = this.url;

        if (path) url += `/${path}`;

        // If there are no searchParams, return the URL
        if (!searchParams) return url;

        // Add the searchParams to the URL
        for (const key in searchParams) {
            url += `${url.includes("?") ? "&" : "?"}${key}=${searchParams[key]}`;
        }

        // Return the URL
        return url;
    }

    async execute(query: WebhookExecute, queryParams?: WebhookExecuteQueryParams) {
        const webhook = this.buildUrl(queryParams);

        return await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
        });
    }

    async executeWait(
        query: WebhookExecute,
        queryParams?: WebhookExecuteQueryParams
    ): Promise<WebhookMessage> {
        (queryParams ||= {}).wait = true;

        return await this.execute(query, queryParams).then(v => v.json());
    }

    async executeSlack(queryParams?: WebhookExecuteCompatibleQueryParams) {
        const webhook = this.buildUrl(queryParams, "slack");

        return await fetch(webhook, {
            method: "POST",
        });
    }

    async executeGithub(queryParams?: WebhookExecuteCompatibleQueryParams) {
        const webhook = this.buildUrl(queryParams, "github");

        return await fetch(webhook, {
            method: "POST",
        });
    }

    async getWebhookMessage(
        messageId: string | number,
        queryParams?: WebhookGetMessage
    ): Promise<WebhookMessage> {
        const webhook = this.buildUrl(queryParams, `messages/${messageId}`);

        return await fetch(webhook).then(v => v.json());
    }

    async editWebhookMessage(
        messageId: string | number,
        params?: WebhookExecute,
        queryParams?: WebhookEditMessage
    ) {
        const webhook = this.buildUrl(queryParams, `messages/${messageId}`);

        return await fetch(webhook, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
    }

    async deleteWebhookMessage(messageId: string | number, queryParams?: WebhookGetMessage) {
        const webhook = this.buildUrl(queryParams, `messages/${messageId}`);

        return await fetch(webhook, {
            method: "DELETE",
        });
    }
}
