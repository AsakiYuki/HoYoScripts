import { createHash } from "crypto";
import { HTTPRequestInit, HTTPResponse } from "./interface";

const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "sec-ch-ua": '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.46",
    "x-rpc-app_version": "1.5.0",
    "x-rpc-client_type": "5",
};

export class HTTPRequest {
    private headers: Record<string, string>;

    constructor(cookie: string, lang: string = "") {
        this.headers = {
            ...headers,
            Cookie: cookie,
            "x-rpc-language": lang,
        };
    }

    /**
     * Get the DS
     * @returns {string} The DS
     */
    getDs() {
        // Get the current time in seconds
        const t = Math.floor(Date.now() / 1000);

        // Generate a random string of 6 characters
        const r = Array.from(
            { length: 6 },
            () =>
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
                    Math.floor(Math.random() * 52)
                ]
        ).join("");

        // Return the DS
        return `${t},${r},${createHash("md5")
            .update(`salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=${t}&r=${r}`)
            .digest("hex")}`;
    }

    /**
     * Send a request
     * @param url
     * @param searchParams
     * @returns {string} The URL
     */
    protected buildURL(url: string, searchParams?: Record<string, string | number | boolean>) {
        // If there are no searchParams, return the URL
        if (!searchParams) return url;

        // Add the searchParams to the URL
        for (const key in searchParams) {
            url += `${url.includes("?") ? "&" : "?"}${key}=${searchParams[key]}`;
        }

        // Return the URL
        return url;
    }

    /**
     * Send a request
     * @param url
     * @param options
     * @returns {Promise<HTTPResponse | null>} The response
     */
    async fetch<T = object>(
        url: string,
        options?: HTTPRequestInit
    ): Promise<HTTPResponse<T> | null> {
        // Create a new URL with the searchParams
        const URL = this.buildURL(url, options?.searchParams);
        delete options?.searchParams;

        // Create a new headers object with the default headers and the DS
        const headers = {
            ...this.headers,
        };

        // Add the DS to the headers
        if (options?.security) {
            headers["DS"] = this.getDs();

            delete options?.security;
        }

        // If the body is an object, stringify it
        if (options?.body) {
            (<RequestInit>options).body = JSON.stringify(options.body);
        }

        // Send the request
        const response = await fetch(URL, {
            ...(<RequestInit>options),
            headers: headers,
        });

        try {
            return response.json();
        } catch (error) {
            console.error("\0x1b[31m[ERROR]\0x1b[0m", error);
            return null;
        }
    }
}
