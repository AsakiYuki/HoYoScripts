export interface WebhookSearchParams {
    wait?: boolean;
}

export type WebhookEmbedType =
    | "rich"
    | "image"
    | "video"
    | "gifv"
    | "article"
    | "link"
    | "poll_result";

export type WebhookEmbedFooter = {
    text?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export interface WebhookEmbedMedia {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface WebhookEmbedProvider {
    name?: string;
    url?: string;
}

export interface WebhookEmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface WebhookEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface WebhookEmbed {
    title?: string;
    type?: WebhookEmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: WebhookEmbedFooter;
    image?: WebhookEmbedMedia;
    thumbnail?: WebhookEmbedMedia;
    video?: WebhookEmbedMedia;
    provider?: WebhookEmbedProvider;
    author?: WebhookEmbedAuthor;
    fields?: WebhookEmbedField[];
}

export type WebhookAllowedMentionTypes = "roles" | "users" | "everyone";

export interface WebhookAllowedMention {
    parse?: WebhookAllowedMentionTypes[];
    roles?: number[];
    users?: number[];
    replied_user?: boolean;
}

export enum WEBHOOK_COMPOMENT {
    ACTION_ROW = 1,
    BUTTON,
    STRING_SELECT,
    TEXT_INPUT,
    USER_SELECT,
    ROLE_SELECT,
    MENTIONABLE_SELECT,
    CHANNEL_SELECT,
}

export interface WebhookExecute {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: WebhookEmbed[];
    allowed_mentions?: WebhookAllowedMention;
    components?: WEBHOOK_COMPOMENT[];
    files?: any[];
}
