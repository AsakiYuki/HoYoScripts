export interface HTTPRequestInit extends Omit<RequestInit, "body"> {
    body?: object;
    searchParams?: Record<string, string | number | boolean>;
    security?: boolean;
}

export interface HTTPResponse<T = object> {
    retcode: number;
    message: string;
    data: T | null;
}
