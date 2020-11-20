import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ToasterService} from "../../general/toaster.service";
import {IJsonResponse} from "../../../interfaces/_helpers/JsonResponse";
import {IPaginate} from "../../../interfaces/_base/Paginate";
import {IHttpService, RetrieveOptions} from "../../../interfaces/_base/HttpService";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {Translate} from "../../general/translate.service";
import {JsonResponse} from "../../general/response.service";

@Injectable({
    providedIn: "root",
})
export class HttpService<T = any> implements IHttpService<T> {
    public set baseUrl(url: string) {
        this._baseUrl = url;
        this.setSelect();
    }
    public get baseUrl() {
        return this._baseUrl;
    }
    private _baseUrl: string;
    public limit: number = 25;
    public page: number = 0;
    public select$: Observable<T[]>;

    constructor(public http: HttpClient, public toaster: ToasterService) {
    }

    public all(options: RetrieveOptions<T> = {}): Observable<IJsonResponse<T[]>> {
        return this.http.get(`${this.baseUrl}`, { params: options as HttpParams })
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public paginate(limit: any = this.limit, page: any = this.page, options: RetrieveOptions<T> = {}): Observable<IJsonResponse<IPaginate<T>>> {
        return this.http
            .get(`${this.baseUrl}/paginate`, { params: { limit, page, ...options as HttpParams } })
            .pipe(
                JsonResponse.map<IPaginate<T>>(),
                this.check()
            );
    }

    public get(id: string, options: RetrieveOptions<T>): Observable<IJsonResponse<T>> {
        return this.http.get(`${this.baseUrl}/${id}`, {params: options as HttpParams})
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public search(options: RetrieveOptions<T> = {}): Observable<IJsonResponse<T>> {
        return this.http.get(`${this.baseUrl}/search`, {params: options as HttpParams})
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public create(data: Partial<T>): Observable<IJsonResponse<T>> {
        return this.http.post(`${this.baseUrl}`, data)
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public update(id: string, data: Partial<T>): Observable<IJsonResponse<T>> {
        return this.http.put(`${this.baseUrl}/${id}`, data)
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public delete(id: string): Observable<{ success: boolean }> {
        return this.http.delete(`${this.baseUrl}/${id}`)
            .pipe(
                JsonResponse.map<{ success: boolean }>(),
                this.check()
            );
    }

    public deleteMany(ids: string[]): Observable<{ success: boolean }> {
        return this.http.request("delete", `${this.baseUrl}/many`, {body: ids})
            .pipe(
                JsonResponse.map<{ success: boolean }>(),
                this.check()
            );
    }

    public count(options: RetrieveOptions<T> = {}): Observable<IJsonResponse<number>> {
        return this.http.get(`${this.baseUrl}/count`, {params: options as HttpParams})
            .pipe(
                JsonResponse.map<T>(),
                this.check()
            );
    }

    public select(options: RetrieveOptions<T> = {}): Observable<T[]> {
        return this.all(options).pipe(
            JsonResponse.select<T>()
        );
    }

    public check() {
        return map((response: IJsonResponse) => {
            if (!response.success) {
                this.toaster.warning(response.reason(), Translate.this(marker("Warning")));
            }
            return response;
        });
    }

    public setSelect() {
        this.select$ = this.select();
    }
}
