export interface IJsonResponse<T = any> {
    success: boolean;
    data?: T;
    error: any;
    message?: string;

    assign(response: IJsonResponse): IJsonResponse;

    get(): T;

    reason(): string;

    toString(): string;

    toJson(): string;
}

export interface IError {
    name: string;
    message: string;
}
