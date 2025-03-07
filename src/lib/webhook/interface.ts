// Webhook Query Params Executions
export interface WebhookExecuteQueryParams {
    wait?: boolean;
}

export interface WebhookExecuteCompatibleQueryParams {
    thread_id?: string | number;
    wait?: boolean;
}

export interface WebhookGetMessage {
    thread_id: string | number;
}

export interface WebhookEditMessage {
    thread_id: string | number;
    with_components: boolean;
}

// Webhook Object Execution
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
    roles?: (string | number)[];
    users?: (string | number)[];
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

export interface WebhookPoolObject {
    text?: string;
    emoji?: string | number;
}

export interface WebhookPoolAnswer {
    answer_id?: number;
    poll_media?: WebhookPoolObject;
}

export interface WebhookPoolAnswerCount {
    id?: number;
    count?: number;
    me_voted?: boolean;
}

export interface WebhookPoolResults {
    is_finalized?: boolean;
    answer_counts?: WebhookPoolAnswerCount;
}

export interface WebhookPool {
    question: WebhookPoolObject;
    answers: WebhookPoolAnswer[];
    expiry?: string;
    allow_multiselect?: boolean;
    layout_type?: number;
    results?: WebhookPoolResults;
}

export interface WebhookAvatarDecorationData {
    asset: string;
    sku_id: string | number;
}

export interface WebhookUser {
    id: string | number;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration_data?: WebhookAvatarDecorationData;
}

// Execute Interface
export interface WebhookExecute {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: WebhookEmbed[];
    allowed_mentions?: WebhookAllowedMention;
    components?: WEBHOOK_COMPOMENT[];
    files?: any[];
    payload_json?: string;
    flags?: number;
    thread_name?: string;
    applied_tags?: (string | number)[];
    poll?: WebhookPool;
}

// Response Message

export interface WebhookMessage {
    id: string | number;
    channel_id: string | number;
    author: WebhookUser;
    content: string;
    timestamp: number;
    edited_timestamp?: number;
    tts: boolean;
    mention_everyone: boolean;
    mentions?: WebhookUser[];
    mention_roles?: any[];
    mention_channels?: any[];
    attachments?: any[];
    embeds?: WebhookEmbed[];
    reactions?: any[];
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: string | number;
    type: number;
    activity?: any;
    application?: any;
    application_id?: string | number;
    flags?: number;
    message_reference?: any;
    interaction_metadata?: any;
    interaction?: any;
    thread?: any;
    components?: any[];
    sticker_items?: any[];
    stickers?: any[];
    position?: number;
    role_subscription_data?: any;
    resolved?: any;
    poll?: WebhookPool;
    call?: any;
}
