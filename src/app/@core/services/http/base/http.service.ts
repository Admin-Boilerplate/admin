import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {ToasterService} from "../../general/toaster.service";
import {IJsonResponse} from "../../../interfaces/_helpers/JsonResponse";
import {JsonResponse} from "../../general/json-response.service";
import {IPaginate} from "../../../interfaces/_base/Paginate";
import {IHttpService} from "../../../interfaces/_base/HttpService";

@Injectable({
    providedIn: "root",
})
export class HttpService<T = any> implements IHttpService<T> {
    public baseUrl: string = "";
    public limit: number = 25;
    public page: number = 0;

    constructor(public http: HttpClient, public toaster: ToasterService) {}

    public all(options: any = { limit: this.limit, skip: 0, search: [] }): Observable<IJsonResponse<T[]>> {
        return this.http.get(`${this.baseUrl}`, { params: options }).pipe(JsonResponse.map<T>(), this.check());
    }

    public paginate(limit: any = this.limit, page: any = this.page): Observable<IJsonResponse<IPaginate<T>>> {
        return this.http
            .get(`${this.baseUrl}/paginate`, { params: { limit, page } })
            .pipe(JsonResponse.map<IPaginate<T>>(), this.check());
    }

    public get(id: string): Observable<IJsonResponse<T>> {
        return this.http.get(`${this.baseUrl}/${id}`)
            .pipe(
                JsonResponse.map<T>(), this.check()
            );
    }

    public search(options: any = {}): Observable<IJsonResponse<T>> {
        return this.http.get(`${this.baseUrl}/search`, {params: options}).pipe(JsonResponse.map<T>(), this.check());
    }

    public create(data: Partial<T>): Observable<IJsonResponse<T>> {
        return this.http.post(`${this.baseUrl}`, data).pipe(JsonResponse.map<T>(), this.check());
    }

    public update(id: string, data: Partial<T>): Observable<IJsonResponse<T>> {
        return this.http.put(`${this.baseUrl}/${id}`, data).pipe(JsonResponse.map<T>(), this.check());
    }

    public delete(id: string): Observable<{ success: boolean }> {
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(JsonResponse.map<{ success: boolean }>(), this.check());
    }

    public deleteMany(ids: string[]): Observable<{ success: boolean }> {
        return this.http.request("delete", `${this.baseUrl}/many`, {body: ids}).pipe(JsonResponse.map<{ success: boolean }>(), this.check());
    }

    public count(): Observable<IJsonResponse<number>> {
        return this.http.get(`${this.baseUrl}/count`).pipe(JsonResponse.map<T>(), this.check());
    }

    public check() {
        return map((response: IJsonResponse) => {
            if (!response.success) {
                this.toaster.warning(response.reason(), "Warning");
            }
            return response;
        });
    }
}
