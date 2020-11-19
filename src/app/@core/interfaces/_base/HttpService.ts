
import { Observable, OperatorFunction } from "rxjs";
import {IJsonResponse} from "../_helpers/JsonResponse";
import {IPaginate} from "./Paginate";
import {IRetrieveOptions} from "./Retrieve";

export interface IHttpService<T> {
    baseUrl: string;
    http: any;
    toaster: any;
    limit: number;
    page: number;

    get(id: string, options?: RetrieveOptions<T>): Observable<IJsonResponse<T>>;

    create(data: Partial<T>): Observable<IJsonResponse<T>>;

    all(options?: RetrieveOptions<T>): Observable<IJsonResponse<T[]>>;

    paginate(limit: number, page: number, options?: RetrieveOptions<T>): Observable<IJsonResponse<IPaginate<T>>>;

    update(id: string, data: Partial<T>): Observable<IJsonResponse<T>>;

    delete(id: string): Observable<{ success: boolean }>;

    deleteMany(ids: string[]): Observable<{ success: boolean }>;

    count(options?: RetrieveOptions<T>): Observable<IJsonResponse<number>>;

    search(options?: RetrieveOptions<T>): Observable<IJsonResponse<T>>;

    check(): OperatorFunction<IJsonResponse<any>, IJsonResponse<any>>;
}

export type RetrieveOptions<T> = Partial<T> | Partial<IRetrieveOptions> | {[key: string]: any};
