import { Injectable } from "@angular/core";
import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import {IError, IJsonResponse} from "../../interfaces/JsonResponse";

@Injectable({
    providedIn: "root",
})
export class JsonResponse<T = any> implements IJsonResponse {
    public success: boolean;
    public data: T;
    public error: IError;
    public message: string;

    public static map<T = any>(): OperatorFunction<any, any> {
        return map((res: IJsonResponse<T>) => {
            return new JsonResponse<T>().assign(res);
        });
    }

    public static get responseError(): IError {
        return { name: "ResponseError", message: "Your request resulted in an error." };
    }

    constructor() {}

    public assign(response?: IJsonResponse<T>) {
        if (response !== undefined) {
            Object.assign(this, response);
        }
        if (this.success === undefined) {
            this.success = !this.error;
        }
        return this;
    }

    public get(): T {
        return this.data;
    }

    /**
     * Returns the reason for failing
     */
    public reason(): string {
        if (this.success) {
            return "";
        }
        return (this.error || this.message || JsonResponse.responseError).toString();
    }

    /**
     * Same as {@link toJson} method
     */
    public toString(): string {
        return this.toJson();
    }

    /**
     * Method to stringify the response object
     */
    public toJson(): string {
        return JSON.stringify(this);
    }
}
