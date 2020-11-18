
import { Observable, OperatorFunction } from "rxjs";
import {IJsonResponse} from "../_helpers/JsonResponse";
import {IPaginate} from "./Paginate";

export interface IHttpService<T> {
    baseUrl: string;
    http: any;
    toaster: any;
    limit: number;
    page: number;

    get(id: string): Observable<IJsonResponse<T>>;

    create(data: Partial<T>): Observable<IJsonResponse<T>>;

    all(options?: any): Observable<IJsonResponse<T[]>>;

    paginate(limit: number, page: number): Observable<IJsonResponse<IPaginate<T>>>;

    update(id: string, data: Partial<T>): Observable<IJsonResponse<T>>;

    delete(id: string): Observable<{ success: boolean }>;

    deleteMany(ids: string[]): Observable<{ success: boolean }>;

    count(id: string): Observable<IJsonResponse<number>>;

    search(options?: any): Observable<IJsonResponse<T>>;

    check(): OperatorFunction<IJsonResponse<any>, IJsonResponse<any>>;
}
