export interface HTTPRequestInit extends Omit<RequestInit, "body"> {
    body?: object;
    searchParams?: any;
    security?: boolean;
    cookie?: boolean;
}

export interface HTTPResponse<T = object> {
    retcode: number;
    message: string;
    data: T | null;
}
